require('dotenv').config();             

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./swagger.json');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const filtersRouter = require('./routes/filters');
const drinksRouter = require('./routes/drinks');
const ingredientsRouter = require('./routes/ingredients');

const app = express();   // створюємо сервер

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  // корневий маршрут для Swagger-документації
app.use('/auth', authRouter);                                             // корневий маршрут для регістрації, авторизації, розавторизації
app.use('/users', usersRouter);                                           // корневий маршрут для роботи з залогіненим юзером
app.use('/filters', filtersRouter);                                       // корневий маршрут для роботи з колекцією Recipes (фільтрація)
app.use('/drinks', drinksRouter);                                         // корневий маршрут для роботи з колекцією Recipes 
app.use('/ingredients', ingredientsRouter);                               // корневий маршрут для роботи з колекцією Ingredients

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})

app.use((err, req, res, next) => {
  console.log("err = ",err);
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, });
})

module.exports = app;
