FROM node:20.17.0-alpine

WORKDIR /app

RUN apk add --no-cache \
    docker \
    docker-cli \
    docker-compose

RUN mkdir -p /app/docker/code-runner && \
    chown -R node:node /app && \
    chmod 666 /var/run/docker.sock || true

COPY package*.json .
RUN npm install

COPY . .
RUN chmod +x scripts/build-runners.sh

CMD ["npm", "run", "start:dev"]