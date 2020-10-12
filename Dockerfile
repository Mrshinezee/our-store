FROM node:14.0-alpine3.11

WORKDIR /usr/app

COPY package.json .

RUN yarn install

CMD [ "yarn", "start"]

COPY . .

EXPOSE 3880

