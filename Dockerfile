FROM node:16.14.0 as builder
WORKDIR /opt/chattermatter
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.21.6
WORKDIR /var/www/html/chattermatter
COPY --from=builder /opt/chattermatter/build .
COPY ./nginx/default.conf /etc/nginx/conf.d
