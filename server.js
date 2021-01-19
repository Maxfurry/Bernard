const express = require('express'),
  cors = require('cors'),
  router = require('./routers'),
  isProduction = process.env.NODE_ENV === 'production';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

const PORT = process.env.APP_PORT || 3000;

const server = app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`)
})

module.exports = server;
