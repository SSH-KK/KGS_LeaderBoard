FROM node:14.4.0-alpine3.10 as build

WORKDIR /src/app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=build /src/app/build /var/www/gokgs/html

COPY nginx.conf /etc/nginx/conf.d/default.conf