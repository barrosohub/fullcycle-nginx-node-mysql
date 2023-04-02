const express = require('express');
const mysql = require('mysql2/promise');
class Database {
  constructor(config) {
    this.pool = mysql.createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    this.database = config.database;
  }

  async createDatabaseIfNotExists() {
    const [rows] = await this.pool.query(`
      SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name = '${this.database}'
    `);
    if (rows[0]["COUNT(*)"] === 0) {
      await this.pool.query(`CREATE DATABASE ${this.database}`);
    }
    await this.pool.query(`USE ${this.database}`);
  }  

  async createTableIfNotExists() {
    const [rows] = await this.pool.execute(`
  SELECT COUNT(*)
  FROM information_schema.tables
  WHERE table_schema = '${this.database}' AND table_name = 'people'
`);

if (rows[0]["COUNT(*)"] === 0) {
  await this.pool.execute(`
    CREATE TABLE people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `);
}
  }
}

class PeopleRepository {
  constructor(database) {
    this.pool = database.pool;
  }

  async insertPeople(name) {
    await this.pool.execute("INSERT INTO people (name) VALUES (?)", [name]);
  }

  async getPeople() {
    const [rows] = await this.pool.execute('SELECT name FROM people');
    return rows;
  }

  async checkIfPersonExists(name) {
    const [rows] = await this.pool.execute('SELECT COUNT(*) FROM people WHERE name = ?', [name]);
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
    const exists = await this.peopleRepository.checkIfPersonExists(name);
    if (!exists) {
      await this.peopleRepository.insertPeople(name);
    }
    const people = await this.peopleRepository.getPeople();
    let response = "<h1>Full Cycle Rocks!</h1>";
    response += `<p>Você pode facilmente adicionar novos usuários via GET Params. Exemplo: <em><code>/?name=Wesley</code></em></p>`;
    response += "<ul>";
    for (const person of people) {
      response += `<li>${person.name}</li>`;
    }
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

(async () => {
  try {
    const database = new Database(dbConfig);
    await database.createDatabaseIfNotExists();
    await database.createTableIfNotExists();
    const peopleRepository = new PeopleRepository(database);
    const app = new App(peopleRepository);
    app.start(3000);
  } catch (error) {
    console.error(error);
  }
})();
