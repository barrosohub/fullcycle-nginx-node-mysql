const express = require('express');
const mysql = require('mysql2/promise');

class Database {
  constructor(config) {
    this.config = config;
  }

  async connect() {
    return await mysql.createConnection(this.config);
  }
}

class PeopleRepository {
  constructor(database) {
    this.database = database;
  }

  async insertPerson(name) {
    const connection = await this.database.connect();
    await connection.execute('INSERT INTO people (name) VALUES (?)', [name]);
    await connection.end();
  }

  async getPeople() {
    const connection = await this.database.connect();
    const [rows] = await connection.execute('SELECT name FROM people');
    await connection.end();
    return rows;
  }
}

class App {
  constructor(peopleRepository) {
    this.app = express();
    this.peopleRepository = peopleRepository;
  }

  async handleRequest(req, res) {
    const name = req.query.name;
    if (name) {
      await this.peopleRepository.insertPerson(name);
    }
    const people = await this.peopleRepository.getPeople();
    let response = '<h1>Full Cycle Rocks!</h1>';
    response += '<ul>';
    people.forEach(person => {
      response += `<li>${person.name}</li>`;
    });
    response += '</ul>';
    res.send(response);
  }

  start(port) {
    this.app.get('/', (req, res) => this.handleRequest(req, res));
    this.app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'my-secret-password',
  database: 'desafio_nginx_node'
};

const database = new Database(dbConfig);
const peopleRepository = new PeopleRepository(database);
const app = new App(peopleRepository);
const PORT = 3000;

app.start(PORT);
