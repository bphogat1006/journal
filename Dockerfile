FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY . .
# required at build time so it is passed as a build arg
ARG URL_PREFIX
ENV URL_PREFIX=${URL_PREFIX}
RUN npm run build

FROM node:20-alpine
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build build/
COPY --from=builder --chown=node:node /app/node_modules node_modules/
COPY --chown=node:node package.json .
CMD [ "node", "build" ]
