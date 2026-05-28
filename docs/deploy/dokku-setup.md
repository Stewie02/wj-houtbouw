# Dokku Server Setup

Fill in every `<placeholder>` before running. Run all commands on the Dokku server unless noted otherwise.

## 1. Install required Dokku plugins

```bash
dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
dokku plugin:install https://github.com/dokku/dokku-redis.git redis
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:cron-job --add
```

## 2. Create apps

```bash
dokku apps:create medusa-backend
dokku apps:create medusa-storefront
```

## 3. Point each app to its Dockerfile

```bash
dokku builder-dockerfile:set medusa-backend   dockerfile-path apps/backend/Dockerfile
dokku builder-dockerfile:set medusa-storefront dockerfile-path apps/storefront/Dockerfile
```

## 4. Provision databases and link

```bash
dokku postgres:create medusa-db
dokku postgres:link medusa-db medusa-backend

dokku redis:create medusa-redis
dokku redis:link medusa-redis medusa-backend
```

> `DATABASE_URL` and `REDIS_URL` are injected automatically by the link commands.

## 5. Set backend environment variables

```bash
dokku config:set medusa-backend \
  NODE_ENV=production \
  MEDUSA_WORKER_MODE=server \
  DISABLE_MEDUSA_ADMIN=false \
  JWT_SECRET=$(openssl rand -hex 32) \
  COOKIE_SECRET=$(openssl rand -hex 32) \
  STORE_CORS=https://<storefront-domain> \
  ADMIN_CORS=https://<backend-domain> \
  AUTH_CORS=https://<backend-domain>,https://<storefront-domain> \
  MEDUSA_BACKEND_URL=https://<backend-domain> \
  STOREFRONT_URL=https://<storefront-domain> \
  STRIPE_API_KEY=sk_live_<secret-key> \
  STRIPE_WEBHOOK_SECRET=whsec_<signing-secret> \
  RESEND_API_KEY=re_<api-key> \
  RESEND_FROM_EMAIL=<from-address>
```

If using Contabo Object Storage for file uploads, also set (all optional — omit to keep local disk storage):

```bash
dokku config:set medusa-backend \
  S3_BUCKET=<bucket-name> \
  S3_REGION=<region> \
  S3_ENDPOINT=https://<region>.contabostorage.com \
  S3_ACCESS_KEY_ID=<access-key> \
  S3_SECRET_ACCESS_KEY=<secret-key> \
  S3_FILE_URL=https://<bucket-name>.<region>.contabostorage.com
```

> **Stripe keys:** find them in the [Stripe Dashboard](https://dashboard.stripe.com) → Developers → API keys.
> The webhook secret is generated in step 5a below.

## 5a. Register the Stripe webhook

In the [Stripe Dashboard](https://dashboard.stripe.com) → Developers → Webhooks → **Add endpoint**:

| Field        | Value                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| Endpoint URL | `https://<backend-domain>/hooks/payment/stripe_stripe`                                                  |
| Events       | `payment_intent.amount_capturable_updated`, `payment_intent.succeeded`, `payment_intent.payment_failed` |

Copy the **Signing secret** (`whsec_...`) and set it:

```bash
dokku config:set medusa-backend STRIPE_WEBHOOK_SECRET=whsec_<signing-secret>
```

## 6. Configure domains and SSL

```bash
dokku domains:set medusa-backend   <backend-domain>
dokku domains:set medusa-storefront <storefront-domain>

dokku letsencrypt:enable medusa-backend
dokku letsencrypt:enable medusa-storefront
```

## 6b. Set port mappings

```bash
dokku ports:set medusa-backend   http:80:9000 https:443:9000
dokku ports:set medusa-storefront http:80:8000 https:443:8000
```

## 7. Add git remotes and deploy the backend first

Run from your local machine in the monorepo root:

```bash
git remote add dokku-backend    dokku@<server-ip>:medusa-backend
git remote add dokku-storefront dokku@<server-ip>:medusa-storefront

git push dokku-backend main
```

## 8. Scale the worker process

After the backend is running, enable the worker process type:

```bash
dokku ps:scale medusa-backend worker=1
```

## 9. Create the first admin user

```bash
dokku run medusa-backend npx medusa user -e <admin-email> -p <admin-password>
```

## 10. Get the publishable API key and deploy the storefront

Log in to `https://<backend-domain>/app` → Settings → Publishable API Keys → copy the key.

Set the storefront build-time variables (Next.js bakes `NEXT_PUBLIC_*` at build time):

```bash
dokku docker-options:add medusa-storefront build \
  "--build-arg NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://<backend-domain>" \
  "--build-arg NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<publishable-api-key>" \
  "--build-arg NEXT_PUBLIC_DEFAULT_REGION=nl" \
  "--build-arg NEXT_PUBLIC_BASE_URL=https://<storefront-domain>" \
  "--build-arg NEXT_PUBLIC_STRIPE_KEY=pk_live_<publishable-key>"
```

Then deploy the storefront from your local machine:

```bash
git push dokku-storefront main
```

## Verification

| Check                              | Expected                             |
| ---------------------------------- | ------------------------------------ |
| `https://<backend-domain>/health`  | `OK`                                 |
| `https://<backend-domain>/app`     | Admin login page                     |
| `https://<storefront-domain>`      | Storefront loads                     |
| `dokku ps:report medusa-backend`   | `web.1` and `worker.1` both running  |
| `dokku logs medusa-backend --tail` | No errors; migrations ran on startup |

## Re-deploying

```bash
# Backend
git push dokku-backend main

# Storefront (if NEXT_PUBLIC_* vars haven't changed)
git push dokku-storefront main

# Storefront after changing a build-time var — update docker-options first, then push
dokku docker-options:remove medusa-storefront build "--build-arg NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<old>"
dokku docker-options:add    medusa-storefront build "--build-arg NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<new>"
git push dokku-storefront main
```
