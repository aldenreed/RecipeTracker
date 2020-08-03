import React, { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda';
import logo from './logo.svg';
import './App.css';

const initialFormState = { name: '', price: '' }
function App() {

  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  async function createIngredient() {
    if(!formData.name || !formData.price) return null;
    const axios = require('axios');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIAQ5QYMB7NZZPS7XEF/20200803/us-east-2/execute-api/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=977d4a0e6f8ab1f6929ce21cc0a0b772f441839f50437333fed9a0072cc05b4e',
      'Access-Control-Allow-Origin': '*'
    };
    const data = {
      'name': formData.name,
      'price': formData.price
    };
    axios.post('https://cors-anywhere.herokuapp.com/https://a1v5ympyjl.execute-api.us-east-2.amazonaws.com/test/ingredient', data, {
      headers: headers
    })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
    /*var mysql = require('mysql');
    console.log(mysql);
  var connection = mysql.createConnection({
        host     : 'recipetracker.c3dpc2qyrg2n.us-east-2.rds.amazonaws.com',
        user     : 'admin',
        password : 'password',
        database : 'recipetracker'
  });
  connection.connect(function(err){
        if(!err) {
              console.log("Database is connected ... nn");
        }
        else {
              console.log("Error connecting database ... nn");
        }
  });

  connection.query("INSERT INTO ingredients (name,price) VALUES ('" + formData.name + "', " + formData.price + ")");
  connection.end();*/
  }

  return (
    <div className="App">
      <header className="App-header">
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Ingredient name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'price': e.target.value})}
        placeholder="Ingredient Price"
        value={formData.price}
      />
      <button onClick={createIngredient}>Create Ingredient</button>
      </header>
    </div>
  );
}

export default App;
