FROM node:22

WORKDIR /app

COPY . .

CMD ["npm", "start"]