FROM node:13.13.0-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-progress --ignore-optional
RUN npm rebuild node-sass --force
COPY . .
EXPOSE [4000, 8080]
CMD ["npm", "start"]
