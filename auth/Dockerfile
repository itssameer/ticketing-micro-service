FROM node:alpine

# Add the following lines
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev


COPY . .

CMD [ "npm", "start"]