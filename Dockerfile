FROM node:12
#create app dir
WORKDIR /usr/server/app
COPY package*.json ./
RUN npm install
#Bundle Source Code
COPY . .
EXPOSE 5000
CMD [ "npm", "run",  "dev"]
