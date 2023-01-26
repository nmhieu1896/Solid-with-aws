FROM node:16-alpine AS Builder
WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx 
COPY --from=Builder /app/dist /usr/share/nginx/html