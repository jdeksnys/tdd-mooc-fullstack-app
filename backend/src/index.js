// const http = require('http')
const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('<h1>hahaha</h1>')
})

const PORT = 3001
const server = app.listen(PORT);
console.log(`Server running on port ${PORT}`);

module.exports = server;