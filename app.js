const express = require("express");
const mysql = require("mysql2/promise");

class Database {
  constructor(config) {
    this.config = config;
  }

  async connect() {
    return await mysql.createConnection(this.config);
  }

  async createTableIfNotExists() {
    const connection = await this.connect();
    const [rows] = await connection.execute(`
      SELECT COUNT(*)
      FROM information_schema.tables
      WHERE table_schema = '${this.config.database}' AND table_name = 'people'
    `);

    if (rows[0]["COUNT(*)"] === 0) {
      await connection.execute(`
        CREATE TABLE people (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `);
    }

    await connection.end();
  }
}

class PeopleRepository {
  constructor(database) {
    this.database = database;
  }

  async insertPerson(name) {
    const connection = await this.database.connect();
    await connection.execute("INSERT INTO people (name) VALUES (?)", [name]);
    await connection.end();
  }

  async getPeople() {
    const connection = await this.database.connect();
    const [rows] = await connection.execute("SELECT name FROM people");
    await connection.end();
    return rows;
  }

  async checkIfpeopleExists(name) {
    const connection = await this.database.connect();
    const [rows] = await connection.execute(
      "SELECT COUNT(*) FROM people WHERE name = ?",
      [name]
    );
    await connection.end();
    return rows[0]["COUNT(*)"] > 0;
  }
}

class App {
  constructor(peopleRepository) {
    this.app = express();
    this.peopleRepository = peopleRepository;
    this.app.get("/", (req, res) => this.handleRequest(req, res));
  }

  async handleRequest(req, res) {
    const name = req.query.name || "Barroso Filho";
    const exists = await this.peopleRepository.checkIfpeopleExists(name);
    if (!exists) {
      await this.peopleRepository.insertPerson(name);
    }
    const people = await this.peopleRepository.getPeople();
    let response = "<h1>Full Cycle Rocks!</h1>";
    response += `<p>Você pode facilmente adicionar novos users via GET Params. Exemplo: <em><code>/?name=Wesley</code></em></p>`;
    response += "<ul>";
    people.forEach((person) => {
      response += `<li>${person.name}</li>`;
    });
    response += "</ul>";
    res.send(response);
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}

const dbConfig = {
  host: "db",
  user: "root",
  password: "my-secret-password",
  database: "desafio_nginx_node",
};

const database = new Database(dbConfig);
const peopleRepository = new PeopleRepository(database);
const app = new App(peopleRepository);
const PORT = 3000;

(async () => {
  try {
    await database.createTableIfNotExists();
    app.start(PORT);
  } catch (err) {
    console.error("Error creating database or table:", err);
  }
})();
