FROM node:14.16.0-buster-slim

RUN apt-get update

ENV APP_ROOT /app

WORKDIR ${APP_ROOT}

COPY ./package*.json ./

RUN npm install

RUN npm install pm2@latest -g

COPY . .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3001

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3001