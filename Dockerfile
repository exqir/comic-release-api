FROM node:8.8

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT npm run $MODE
