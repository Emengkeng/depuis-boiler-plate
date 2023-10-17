const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./utils/errors/notfound.error");
import { func } from 'joi';
import db from './models';
require("dotenv/config");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


(async () => {
  await db.sequelize.sync().then(function(){
    console.log('db is up')
  });
})();
// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

app.use(routes);

// return a NotFoundError for any unknown api request
app.use((req, res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

//const app = require("./app");


const PORT = process.env.PORT || "3000";
// let server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});

module.exports = app;
