FROM node:16-alpine as base

FROM base as build
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM base as prod
WORKDIR /usr/app
COPY package*.json .
RUN npm ci --production
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "npm", "start" ]