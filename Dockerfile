FROM node:10.19.0-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY . .

EXPOSE 3000
