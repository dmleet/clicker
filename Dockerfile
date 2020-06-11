FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build --production

FROM nginx:alpine
COPY --from=node /app/dist/my-app /usr/share/nginx/html
