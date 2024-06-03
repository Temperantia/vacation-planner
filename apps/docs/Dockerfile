# TODO: optimize this Dockerfile to only copy the necessary files https://turbo.build/repo/docs/handbook/deploying-with-docker
# TODO: use more recent node
# TODO: use shared Dockerfile for web and docs
# TODO: add tags to the image

FROM node:16

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the docs package.json
COPY apps/docs/package.json ./apps/docs/package.json

RUN npm install

# Copy app source
COPY . .

EXPOSE 8080

CMD [ "node", "apps/docs/server.js" ]