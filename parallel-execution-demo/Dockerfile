FROM node:14-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . ./

CMD [ "node", "index.js" ]