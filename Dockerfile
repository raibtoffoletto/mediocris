FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN mv .env.example .env
RUN yarn --ignore-engines && yarn build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
ENV PORT=3000
EXPOSE $PORT
ENTRYPOINT ["node", "server.js"]
