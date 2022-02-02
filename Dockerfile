FROM node:16.5.0-alpine

WORKDIR /app

COPY . .
COPY package*.json .

RUN yarn global add typescript pm2 && yarn

EXPOSE 5000

CMD ["yarn", "run", "dev"]