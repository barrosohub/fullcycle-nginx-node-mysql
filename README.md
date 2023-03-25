## Desafio Fullcycle Nginx + Node.js + MySQL

This project sets up three containers using Docker Compose:

- A Node.js container running a Node.js application using the `Dockerfile`.
- An Nginx container serving as a reverse proxy to the Node.js application.
- A MySQL 5.7 database container using the `mysql:5.7` image.

### Requirements

- Docker and Docker Compose must be installed on the host machine.

### Usage

1. Clone the repository to your local machine.
2. Navigate to the project directory in a terminal.
3. Run the command `docker-compose up -d` to start the containers in the background.
4. Access the Node.js application at `http://localhost:3000`.
5. Access the Nginx server at `http://localhost:8080`.

### Configuration

#### Node.js

The Node.js container is configured to:

- Build the image using the `Dockerfile` in the project directory.
- Name the container `node`.
- Restart the container automatically with the host machine.
- Depend on the `db` container.
- Set the environment variable `DB_HOST` to `db`.
- Publish port `3000` of the container to port `3000` of the host machine.
- Create a volume between the project directory and the `/app` directory inside the container  to allow live code changes during development.

#### Nginx

The Nginx container:

- Uses the official Nginx image.
- Name the container `nginx`.
- Restart the container automatically with the host machine.
- Publish port `80` of the container to port `8080` of the host machine.
- Create a volume between the `nginx.conf` file in the project directory and the `/etc/nginx/nginx.conf` in the container.

#### MySQL

The MySQL database container:

- Uses the official MySQL 5.7 image.
- Name the container `db`.
- Restart the container automatically with the host machine.
- Set the environment variable `MYSQL_ROOT_PASSWORD` to `my-secret-password`.
- Create a volume between the `db_data` directory in the host machine and `/var/lib/mysql` directory in the container, to persist data when containers are destroyed.