FROM node:16.13.0-alpine AS DEV_IMAGE

WORKDIR /front/oxygenbnb

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]


FROM node:16.13.0-alpine AS PROD_IMAGE

WORKDIR /front/oxygenbnb

COPY --from=DEV_IMAGE /front/oxygenbnb/dist/ /front/oxygenbnb/dist/

EXPOSE 3000

COPY package.json .

COPY vite.config.ts .

RUN npm install typescript

CMD [ "npm", "run", "preview" ]