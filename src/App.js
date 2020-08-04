import React, { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda';
import logo from './logo.svg';
import './App.css';

const initialFormState = { name: '', price: '' }
function App() {

  const [formData, setFormData] = useState(initialFormState);

  async function createTimeEntry() {
    if(!formData.date || !formData.time || !formData.percentWorked) return null;
    const axios = require('axios');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIAQ5QYMB7NZZPS7XEF/20200803/us-east-2/execute-api/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=977d4a0e6f8ab1f6929ce21cc0a0b772f441839f50437333fed9a0072cc05b4e',
      'Access-Control-Allow-Origin': '*'
    };
    const data = {
      'date': formData.date,
      'time': formData.time,
      'percentWorked': formData.percentWorked
    };
    axios.post('https://cors-anywhere.herokuapp.com/https://74929qlwh3.execute-api.us-east-2.amazonaws.com/test/entry', data, {
      headers: headers
    })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
      <input
        onChange={e => setFormData({ ...formData, 'date': e.target.value})}
        placeholder="Date"
        value={formData.date}
      />
      <input
        onChange={e => setFormData({ ...formData, 'time': e.target.value})}
        placeholder="Time"
        value={formData.time}
      />
      <input
        onChange={e => setFormData({ ...formData, 'percentWorked': e.target.value})}
        placeholder="Percent Worked"
        value={formData.percentWorked}
      />
      <button onClick={createTimeEntry}>Create Time Entry</button>
      <table id="tableData" class="table table-fixed">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody class="tbody" >
        </tbody>
      </table>
      </header>
    </div>
  );
}

export default App;
