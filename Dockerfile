FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
COPY .env /app/
COPY index.js /app/

RUN npm install

EXPOSE 6001

CMD ["node", "index.js"]
