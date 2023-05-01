const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./model/users');
const Expenses = require('./model/expense');
const Order = require('./model/orders');

const signupRoutes = require('./route/signup');
const loginRoutes = require('./route/login');
const purchaseRoutes = require('./route/purchase');

const dailyexpenseRoutes = require('./route/dailyexpense');

const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(signupRoutes);
app.use(loginRoutes);
app.use(purchaseRoutes);

app.use('/expense',dailyexpenseRoutes);

User.hasMany(Expenses);
Expenses.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync()
  .then(result => {
    app.listen(7000);
  })
  .catch(err => {
    console.log(err);
  });
