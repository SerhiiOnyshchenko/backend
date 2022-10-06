const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./helpers/apiHelpes');

const herosRouter = require('./routes/api/heros');
const swaggerRouter = require('./routes/swagger/index.js');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/heros', herosRouter);
app.use('/api/', swaggerRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/heros',
    data: 'Not found',
  });
});

app.use(errorHandler);

module.exports = app;
