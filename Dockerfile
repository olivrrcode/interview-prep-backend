FROM node:20.17.0-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]

