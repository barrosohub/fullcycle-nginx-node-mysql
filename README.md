# FullCycle Nginx-Node-MySQL

This project is a Node.js application with Nginx and MySQL using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Instructions to run the project

1. Clone the repository:

   ``` git clone https://github.com/barrosohub/fullcycle-nginx-node-mysql.git ```
    
   ``` cd fullcycle-nginx-node-mysql ```
    
2. Build and start the containers:

    ```
    docker-compose down 
    docker-compose build
    docker-compose up -d
    ```

3. Access the application in your browser:

    http://localhost:8080

Nginx is configured to serve the application on port 8080, and the Node.js application is running on port 3000.

## Project Structure

- `app.js`: main file of the Node.js application.
- `Dockerfile`: defines the Node.js container configuration.
- `docker-compose.yml`: defines the configuration of all project services (Node.js, Nginx and MySQL).
- `nginx.conf`: Nginx configuration file.

## Database

The MySQL database is configured to use the `db_data` volume to store its data. To connect to the database, use the following information:

```
Host: db
Port: 3306
User: root
Password: my-secret-password
```