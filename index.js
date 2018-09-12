/* eslint-disable no-console */

console.log('Starting Server');
const apiRouter = require('./routes/api');
try {
  var express = require('express');
  var cors = require('cors');
  var bodyParser = require('body-parser');
  var clipboardy = require('clipboardy');

} catch (e) {
  console.log('Error loading dependencies');
  console.log('Did you run npm install?');
}

process.on('SIGINT', () => {
  server.close(function() {
    console.log('Closed Server');
  });
});

var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Configure app to use bodyParser()
// This will let us get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

clipboardy.writeSync("TESTING A WRITE");

app.use('/api', apiRouter);

var server = app.listen(port, () => {
  console.log('Server is Listening on port ' + port);
}).on('error', () => {
  console.log('Server through an exception when trying to listen on port %d', port);
  console.log('Is there anything running on port %d ?', port);
});
