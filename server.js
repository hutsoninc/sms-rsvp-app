const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Configure application routes
var routes = require('./controllers/router');
var webhookRouter = express.Router();

routes.webhookRoutes(webhookRouter);

app.use(webhookRouter);

var server = http.createServer(app);
server.listen(1337, () => {
  console.log('Express server listening on port 1337');
});