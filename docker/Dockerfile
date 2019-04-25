FROM node:11.1.0-alpine

RUN apk add yarn git

WORKDIR /plugin
COPY . .

RUN yarn

RUN touch /mnt/config.local.json && \
    ls -s /mnt/config.local.json ./data/config.local.json

EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
