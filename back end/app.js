const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const signupRoutes = require('./route/signup');
const loginRoutes = require('./route/login');

const dailyexpenseRoutes = require('./route/dailyexpense');

const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoutes);
app.use(loginRoutes);

app.use('/expense',dailyexpenseRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(7000);
  })
  .catch(err => {
    console.log(err);
  });
