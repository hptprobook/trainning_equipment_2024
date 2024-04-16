# Use an official Node runtime as a parent image
FROM node:18 as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN yarn install

# Copy the rest of your client app's source code
COPY . .

# Build your app
RUN yarn run build

# Serve the app using a simple server
# Using nginx to serve the static content
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
