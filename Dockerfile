FROM node:14.0-alpine3.11

WORKDIR /Users/shine/Documents/html/our-store

COPY package.json /Users/shine/Documents/html/our-store

RUN yarn install

CMD [ "yarn", "start"]

EXPOSE 7800

