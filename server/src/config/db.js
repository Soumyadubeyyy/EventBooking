const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    if (env.NODE_ENV !== 'test') {
      process.stdout.write(`MongoDB connected: ${conn.connection.host}\n`);
    }
  } catch (error) {
    process.stderr.write(`MongoDB connection error: ${error.message}\n`);
    process.exit(1);
  }
};

module.exports = connectDB;
