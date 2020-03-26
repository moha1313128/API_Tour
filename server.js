const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
// console.log(process.env);
// Start Server
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  // .connect(DB, {
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(() =>
    // console.log(con.connection);
    console.log('DB Connected')
  );
const port = process.env.PORT || 3000;
// const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
