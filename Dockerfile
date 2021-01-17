FROM node

COPY package*.json /app/
COPY .env /app/
COPY index.js /app/

RUN npm install

WORKDIR /app

CMD ["node", "index.js"]
