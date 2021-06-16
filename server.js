const express = require('express'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json'),
  cloudinary = require('cloudinary'),
  expressFileUpload = require('express-fileupload'),
  router = require('./routers'),
  isProduction = process.env.NODE_ENV === 'production';

require('dotenv').config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(expressFileUpload({
  useTempFiles: true,
}));


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
