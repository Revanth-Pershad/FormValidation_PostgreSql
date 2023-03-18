const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

client.connect();

app.post('/insert-data', (req, res) => {
  const { first_Name, last_Name, email_, password_ } = req.body;

  const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
  const values = [first_Name, last_Name, email_, password_];

  console.log(`Data sent from ${req.hostname}`)
  console.log(values);

  client.query(query, values, (err) => {
    if(err){
      res.status(500).json({message : "Error on the server inserting data"})
    }
    else{
      res.status(200).json({message : "Insertion was a success"})
    }
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));