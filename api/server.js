const http = require('http');

const envPath = './config/env/.env';
require('dotenv').config({ path: envPath });

const mongoose = require('mongoose');
const app = require('./src/bootstrap/app');

let port = +process.env.API_PORT;
if (!port) {
  port = 3001;
}

app.set('port', port);
const server = http.createServer(app);
const mongoConfig = {
  connection: {
    url: process.env.MONGO_API,
  },
};
mongoose.connect(mongoConfig.connection.url)
  .then(() => {
    server.listen(port, process.env.API_HOST);
    console.log(`-------------------- API is running on http://${process.env.API_HOST}:${port} --------------------`);
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

function onError(error) {
  console.log('-------------------- App unexpectedly stopped --------------------');
  throw error;
}

function onListening() {
  app.isRunning.resolve();
}

server.on('error', onError);
server.on('listening', onListening);

module.exports = app;
