const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);
exports.getAllUsers = (req, res) => {
  res.status(500).json({ status: 'error', message: 'NOT DEFINED' });
};

exports.getUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'NOT DEFINED' });
};

exports.createUsers = (req, res) => {
  res.status(500).json({ status: 'error', message: 'NOT DEFINED' });
};

exports.updateUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'NOT DEFINED' });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'NOT DEFINED' });
};
