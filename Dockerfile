# Stage 1: Build the Angular app
FROM node:18-alpine as build

# Configure the main working directory inside the docker image.
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . ./

# Arguments (you can still pass `configuration` to build)
ARG configuration=production

# Build the application (no need to specify outputPath, as it's defined in angular.json)
RUN npm run build -- --configuration $configuration

#### Stage 2: Use the compiled app, ready for production with Nginx
FROM nginx:alpine

# Copy the Angular build output from Stage 1 to Nginx's serving directory
COPY --from=build /app/dist/forms/browser  /usr/share/nginx/html

# Copy custom Nginx config if needed
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
