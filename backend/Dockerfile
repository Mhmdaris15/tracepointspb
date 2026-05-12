# ─── Stage 1: Install deps & build ───────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# ─── Stage 2: Production runner ──────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install production deps only
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy compiled JS
COPY --from=builder /app/dist ./dist

# Copy SQL schemas (useful for migrations)
COPY --from=builder /app/sql ./sql

EXPOSE 4000

CMD ["node", "dist/server.js"]
