// const http = require('http')
const express = require('express')

const app = express()
app.use(express.json());

app.get('/items', (req, res) => {
  const id = parseInt(req.query.id);
  if (id) {
    const item = items.find(rec => rec.id === id);
    if (item) {
      res.json([item]);
    } else {
      res.status(404).send("not found");
    }
  } else {
    res.json(items);
  }
});

app.post('/items', (req, res) => {
  items.push({id:3, value:"exam prep", important:true})
  res.status(200).json(items);
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
  },
  {
    id: 2,
    value: "finish homework",
    important: true
  }
]
let maxId = 2;