const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index')

const {PORT = 3000} = process.env;
const app = express();



mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6467a6cf5a655cb09b534d4d' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);

app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
