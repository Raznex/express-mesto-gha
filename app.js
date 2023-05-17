const express = require('express');
const {PORT = 3000} = process.env;
const mongoose = require('mongoose');
const app = express();

console.log(__dirname)
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
