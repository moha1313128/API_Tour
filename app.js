const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/usersRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// Middleware
// app.use((req, res, next) => {
//   console.log('Middleware !!!!');
//   next(); // request will stuck without next()
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });
//////////////////////////////////////////////////////////
// Route
/////////////////////////////////////////////////////////
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
