FROM node:18-alpine
WORKDIR /app-ui 


COPY public/ /app-ui/public
COPY src/ /app-ui/src
COPY package.json /app-ui/
COPY vite.config.ts /app-ui/
COPY tsconfig.json /app-ui/
COPY tsconfig.node.json /app-ui/

RUN npm install  --legacy-peer-deps

CMD [ "npm", "run","dev" ]




