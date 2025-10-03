FROM node:lts-alpine

RUN mkdir -p /janus/node_modules
RUN mkdir -p /opt/janus

WORKDIR /janus

COPY package*.json ./

RUN npm ci --only=production

COPY dist/src .

COPY dist/migration ./migration

EXPOSE 80

CMD [ "node", "index.js" ]
