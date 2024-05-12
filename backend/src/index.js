// const http = require('http')
const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.json(items);
})

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