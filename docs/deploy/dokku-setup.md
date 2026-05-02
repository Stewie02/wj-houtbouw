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
  MEDUSA_BACKEND_URL=https://<backend-domain>
```

## 6. Configure domains and SSL

```bash
dokku domains:set medusa-backend   <backend-domain>
dokku domains:set medusa-storefront <storefront-domain>

dokku letsencrypt:enable medusa-backend
dokku letsencrypt:enable medusa-storefront
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
  "--build-arg NEXT_PUBLIC_BASE_URL=https://<storefront-domain>"
```

Then deploy the storefront from your local machine:

```bash
git push dokku-storefront main
```

## Verification

| Check | Expected |
|---|---|
| `https://<backend-domain>/health` | `OK` |
| `https://<backend-domain>/app` | Admin login page |
| `https://<storefront-domain>` | Storefront loads |
| `dokku ps:report medusa-backend` | `web.1` and `worker.1` both running |
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
