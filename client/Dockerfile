# Step 1

FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY production.js ./index.js
COPY build ./build

RUN npm init -y
RUN npm install --save express nodemon

CMD ["node", "node_modules/nodemon/bin/nodemon.js"]