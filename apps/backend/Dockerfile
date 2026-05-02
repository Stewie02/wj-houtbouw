FROM node:20-alpine AS builder
RUN corepack enable
WORKDIR /app

# Copy workspace manifest files (maximises layer cache)
COPY package.json yarn.lock .yarnrc.yml ./
COPY apps/backend/package.json ./apps/backend/

# Install only backend workspace deps
RUN yarn workspaces focus @dtc/backend

# Copy source and build
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN yarn build

# Runtime — only the self-contained .medusa/server output
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/backend/.medusa/server ./
COPY --from=builder /app/apps/backend/Procfile ./Procfile
RUN npm install --omit=dev
EXPOSE 9000
CMD ["npm", "run", "start"]
