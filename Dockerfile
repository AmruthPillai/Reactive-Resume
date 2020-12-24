FROM node as builder

WORKDIR /app
COPY ./ /app/

RUN npm install
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html
COPY --from=builder /app/public/ /usr/share/nginx/html
COPY server.conf /etc/nginx/conf.d/default.conf