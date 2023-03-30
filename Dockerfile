# Define the base image
FROM node:16-alpine

# Define the working directory
WORKDIR /app

# Copy the necessary files into the container
COPY package*.json ./
COPY app.js ./
COPY wait-for-it.sh ./

# Install the curl and bash utilities
RUN apk add --no-cache curl bash

# Change permissions of the wait-for-it.sh file
RUN chmod +x wait-for-it.sh

# Install the application dependencies
RUN npm install

# Expose port 3000, which is the port that the Node.js application is listening on
EXPOSE 3000

# Start the Node.js application when the container is started
CMD ["/bin/bash", "-c", "/app/wait-for-it.sh db:3306 -- npm start"]
