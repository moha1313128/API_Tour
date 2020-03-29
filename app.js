const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/usersRoute');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Middleware
app.use((req, res, next) => {
  console.log('Middleware !!!!');
  next(); // request will stuck without next()
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'Fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = 'fail';
  // err.statusCode = 400;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
