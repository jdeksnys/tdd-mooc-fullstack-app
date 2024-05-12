// const http = require('http')
const express = require('express')
const cors = require('cors');
const app = express()
app.use(express.json());
app.use(cors());

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
  const newItem = req.body;
  if (!newItem || !newItem.value) {
    res.status(200).json(items);
    return;
  }
  maxId += 1;
  newItem.id = this.maxId;
  items.push(newItem);
  newItem.id = maxId;
  res.status(200).end();
});

app.post('/delete', (req, res) => {
  const id = parseInt(req.body.id);
    if (!id || !items.find(rec => rec.id === id)) {
    res.status(200).json({message: `id=${id} not found`});
    return;
  }
  items = items.filter(rec => rec.id != id);
  res.status(200).json({message: `id=${id} deleted`});
});

app.post('/important', (req, res) => {
  const id = parseInt(req.body.id);
    if (!id || !items.find(rec => rec.id === id)) {
      res.status(200).json({message: `id=${id} not found`});
    return;
  }
  const item = items.find(rec => rec.id === id);
  item.important = !item.important;
  items = items.filter(rec => rec.id != id);
  items.push(item);
  res.status(200).end();
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