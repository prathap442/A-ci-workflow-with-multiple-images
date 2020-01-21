# from the node:alpine the image is considered as fe-builder
FROM node:alpine as fe-builder
WORKDIR "/app"
COPY ./package.json /
RUN npm install
COPY . .
CMD ["npm","run","build"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /nginx/etc/conf.d/default.conf
COPY --from=fe-builder /app/build /usr/share/nginx/html 