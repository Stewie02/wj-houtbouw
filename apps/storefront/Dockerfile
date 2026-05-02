FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app

# Copy workspace manifest files (maximises layer cache)
COPY package.json yarn.lock .yarnrc.yml ./
COPY apps/storefront/package.json ./apps/storefront/

# Install only storefront workspace deps
RUN yarn workspaces focus @dtc/storefront

# Build args — NEXT_PUBLIC_* vars must be present at build time
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_BASE_URL

# Copy source and build
COPY apps/storefront ./apps/storefront
WORKDIR /app/apps/storefront
RUN yarn build

# Runtime — Next.js standalone output
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/storefront/.next/standalone ./
COPY --from=builder /app/apps/storefront/.next/static ./.next/static
COPY --from=builder /app/apps/storefront/public ./public
EXPOSE 8000
ENV PORT=8000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
