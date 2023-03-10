FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN  npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
# Read environment variables from secrets, should be set when running build
RUN --mount=type=secret,id=secret  \
    --mount=type=secret,id=database_url \
    --mount=type=secret,id=public_base_url  \
    --mount=type=secret,id=public_graphql_api_url \ 
    --mount=type=secret,id=next_auth_url \
    --mount=type=secret,id=is_https \
    SECRET=$(cat /run/secrets/secret) \
    DATABASE_URL=$(cat /run/secrets/database_url) \
    NEXT_PUBLIC_BASE_URL=$(cat /run/secrets/public_base_url) \
    NEXT_PUBLIC_GRAPHQL_API_URL=$(cat /run/secrets/public_graphql_api_url) \
    NEXTAUTH_URL=$(cat /run/secrets/next_auth_url) \
    IS_HTTPS=$(cat /run/secrets/is_https) \
    npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.well-known ./public/.well-known

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
