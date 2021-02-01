const express = require('express'),
cors = require('cors'),
errorhandler = require('errorhandler'),
router = require('./routers'),
isProduction = process.env.NODE_ENV === 'production';
swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (!isProduction) {
  app.use(errorhandler());
}

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

const APP_PORT = process.env.PORT || 3000;

const server = app.listen(APP_PORT, () => {
  process.stdout.write(`listening on port ${APP_PORT}\n`);
});

module.exports = server;
