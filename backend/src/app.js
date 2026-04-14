require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// -- Documentação -- //
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// -- Rotas -- //
app.use('/', routes);

// -- Error handling -- //
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };
  if (err.details) response.errors = err.details;
  return res.status(status).json(response);
});

module.exports = app;