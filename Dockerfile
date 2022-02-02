FROM node:16.5.0-alpine

WORKDIR /app

COPY . .
COPY package*.json .

RUN yarn global add typescript pm2 && yarn

EXPOSE 3000

CMD ["yarn", "run", "start"]