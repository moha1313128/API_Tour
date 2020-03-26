const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
dotenv.config({ path: './config.env' });
// const DB = process.env.DATABASE_LOCAL;
mongoose.connect('mongodb://localhost:27017/api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>
    // console.log(con.connection);
    console.log('DB Connected')
);
// Read JSON File
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
// Import Data Into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Import was success');
        process.exit();
    } catch (error) {
        console.log(error);
    }
};
//Delete All Data From DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Delete was success');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if (process.argv[2] == '--import') {
    importData();
} else if (process.argv[2] == '--delete') {
    deleteData();
}

console.log(process.argv);