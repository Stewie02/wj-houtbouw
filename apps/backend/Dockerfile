FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app

# Copy workspace manifest files (maximises layer cache)
COPY package.json yarn.lock .yarnrc.yml ./
COPY apps/backend/package.json ./apps/backend/

# Install all deps (devDeps needed for medusa build / TypeScript compilation)
RUN yarn workspaces focus @dtc/backend

# Copy source and build
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN yarn build

# Re-install production-only deps at monorepo root using the locked yarn.lock.
# This gives us a clean node_modules to ship — no devDeps, no npm hoisting surprises.
WORKDIR /app
RUN yarn workspaces focus @dtc/backend --production

# Runtime — medusa server output + pre-resolved production node_modules
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/backend/.medusa/server ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 9000
CMD ["npm", "run", "start"]
