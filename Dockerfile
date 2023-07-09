FROM node:14 AS client-build

WORKDIR /app

COPY package*.json ./

COPY ./public ./public
COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]