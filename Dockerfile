FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY . .
ARG URL_PREFIX
ENV URL_PREFIX=${URL_PREFIX}
ARG DATABASE
ENV DATABASE=${DATABASE}
ARG MARIADB_HOST
ENV MARIADB_HOST=${MARIADB_HOST}
ARG MARIADB_USER
ENV MARIADB_USER=${MARIADB_USER}
ARG MARIADB_PASSWORD
ENV MARIADB_PASSWORD=${MARIADB_PASSWORD}
RUN npm run build

FROM node:20-alpine
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build build/
COPY --from=builder --chown=node:node /app/node_modules node_modules/
COPY --chown=node:node package.json .
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD [ "node", "build" ]