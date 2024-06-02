FROM node:18-alpine AS DEV_IMAGE

# set working directory
WORKDIR /front/oxygenbnb

# add `/app/node_modules/.bin` to $PATH
ENV PATH /front/oxygenbnb/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY vite.config.ts .

RUN npm install

# add app
COPY . ./

# start app
# CMD ["yarn", "start"]
CMD ["npm", "run", "dev"]


FROM node:18-alpine as PROD_IMAGE

WORKDIR /front/oxygenbnb

COPY --from=DEV_IMAGE /front/oxygenbnb/dist/ /front/oxygenbnb/dist/

COPY package.json .

RUN npm install

COPY vite.config.ts .

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]