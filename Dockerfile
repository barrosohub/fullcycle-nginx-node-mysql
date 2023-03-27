# Define the base image
FROM node:14-alpine

# Define the working directory
WORKDIR /app

# Copy the necessary files into the container
COPY package*.json ./
COPY app.js ./

# Install the curl utility to download wait-for-it.sh
RUN apk add --no-cache curl

# Download wait-for-it.sh from GitHub and make it executable
RUN curl -sSLo /app/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x /app/wait-for-it.sh

# Install the application dependencies
RUN npm install

# Expose port 3000, which is the port that the Node.js application is listening on
EXPOSE 3000

# Start the Node.js application when the container is started
CMD ["/bin/ash", "-c", "/app/wait-for-it.sh db:3306 ; npm start"]