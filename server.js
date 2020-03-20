// dotenv.config({ path: './config.env' });
// const dotenv = require ('dotenv');
const app = require('./app');

// console.log(process.env);
// Start Server
const port = process.env.PORT || 3000;
// const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
