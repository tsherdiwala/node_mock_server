const express = require('express');
const axios = require('axios');
const https = require('https');
const file = require("fs")

const app = express();

const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });

app.get('/payment/:id', (req, res) => {
    const invoiceId = req.params['id'];

    doApiCall(invoiceId)
    .then(response => {
        //res.status(200).json(response.data);
        res.status(400).json({...response.data, message: 'hello World'});
    })
    .catch(error =>  {
        console.log("error", error);
        res.status(500).json({error: "Something bad happened"})
    });
});

app.get("/file/:id", (req, res) => {

    file.readFile('response.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        return res.end();
      });
});

app.listen(8000, () => {
    console.log("started");
})



