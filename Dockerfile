FROM nodesource/nsolid:boron-latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN ["npm", "install", "nsolid-graphite"]

ENTRYPOINT ["node_modules/.bin/nsolid-graphite"]
