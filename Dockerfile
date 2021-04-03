FROM node:14.4.0-alpine3.10 as build

WORKDIR /src/app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

FROM node:14-alpine

WORKDIR /srv/app

COPY package.prod.json package.json

RUN npm install

COPY --from=build /src/app/build ./build

EXPOSE 5000

CMD ["npm", "run", "start"]