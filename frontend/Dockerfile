FROM node:alpine

WORKDIR /react-app

COPY ./package*.json /react-app

RUN npm install

COPY . .

CMD ["npm","start"]
