FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD DATABASE_URL=$DATABASE_URL npm run migrate up && npm run start
