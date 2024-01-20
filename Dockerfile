FROM node:18-alpine
WORKDIR /app-ui 


COPY public/ /app-ui/public
COPY src/ /app-ui/src
COPY package.json /app-ui/

RUN npm install

EXPOSE 3000

CMD [ "npm", "run","dev" ]




