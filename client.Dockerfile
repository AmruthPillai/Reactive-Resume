# Install dependencies only when needed
FROM node:16-alpine AS dependencies

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN yarn set version berry
RUN yarn plugin import workspace-tools

COPY package.json .yarnrc.yml yarn.lock ./
COPY schema/package.json ./schema/package.json
COPY client/package.json ./client/package.json

RUN yarn install

FROM node:16-alpine AS builder

WORKDIR /app

RUN yarn set version berry
RUN yarn plugin import workspace-tools

COPY --from=dependencies /app/package.json .
COPY --from=dependencies /app/node_modules ./node_modules

COPY ./schema ./schema
COPY ./client ./client

RUN yarn workspace @reactive-resume/schema run build
RUN yarn workspace @reactive-resume/client run build

FROM node:16-alpine AS production

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/client/next.config.js ./
COPY --from=builder /app/client/next-i18next.config.js ./
COPY --from=builder /app/client/public ./public
COPY --from=builder /app/client/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/client/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]