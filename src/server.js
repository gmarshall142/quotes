const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');

const app = express();
const router = express.Router();

// setup body parser; will add any json to req.body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/apps', () => {
  console.log('Connection has been made');
})
  .catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// controllers
fs.readdirSync('controllers').forEach((file) => {
  if (file.substr(-3) === '.js') {
    const route = require(`./controllers/${file}`);
    route.controller(app);
  }
});

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized!'});
});
const port = process.env.PORT || 3000;
app.use('/', router);
app.listen(port, () => {
  console.log(`api running on port ${port}`);
});

