// const http = require('http')
const express = require('express')

const app = express()

app.get('/all', (request, response) => {
  response.json(items);
})

app.get('/id/:id', (req, res) => {
  res.json(items[0]);
});

const PORT = 3001
const server = app.listen(PORT);
console.log(`Server running on port ${PORT}`);

module.exports = server;

let items = [
  {
    id: 1,
    value: "do the laundry",
    important: false
  }
]