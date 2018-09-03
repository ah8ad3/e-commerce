FROM node:10.8-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "node", "patty.js", "-d" ]

# fast development use docker, production mode with docker-compose added in `docker-compose` directory