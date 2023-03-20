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
  user: 'postgres',
  password: 'root',
  database: 'postgres'
});

client.connect();

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];

  console.log(`Data requested from ${req.hostname} for user ID ${id}`);

  client.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: 'Error on the server fetching data'});
    } else if (result.rows.length === 0) {
      res.status(404).json({message: `No user found with ID ${id}`});
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});


app.post('/insert-data', (req, res) => {
  const { id, first_Name, last_Name, email_, password_ } = req.body;

  const query = 'INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)';
  const values = [id, first_Name, last_Name, email_, password_];

  console.log(`Data sent from ${req.hostname}`);

  client.query(query, values, (err) => {
    if(err){
      console.log(err);
      if(err.code = '23505'){
        console.log('Same key');
        res.status(501).json({message : 'KEY already Exists'});
      }
      else{
      res.status(500).json({message : "Error on the server inserting data"})
      }
    }
    else{
      res.status(200).json({message : "Insertion was a success"})
    }
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
