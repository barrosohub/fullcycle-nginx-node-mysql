const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'my-secret-password',
  database: 'desafio_nginx_node'
};

const insertPerson = async (name) => {
  const connection = await mysql.createConnection(dbConfig);
  await connection.execute('INSERT INTO people (name) VALUES (?)', [name]);
  await connection.end();
};

const getPeople = async () => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute('SELECT name FROM people');
  await connection.end();
  return rows;
};

app.get('/', async (req, res) => {
  const name = req.query.name;
  if (name) {
    await insertPerson(name);
  }
  const people = await getPeople();
  let response = '<h1>Full Cycle Rocks!</h1>';
  response += '<ul>';
  people.forEach(person => {
    response += `<li>${person.name}</li>`;
  });
  response += '</ul>';
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
