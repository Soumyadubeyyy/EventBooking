const app = require('./src/app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');

const start = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    process.stdout.write(
      `Server running in ${env.NODE_ENV} mode on port ${env.PORT}\n`
    );
  });
};

start();
