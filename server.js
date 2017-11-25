var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var apiRoutes = require('./app/routing/apiRoutes');
var htmlRoutes = require('./app/routing/htmlRoutes');

// Sets up the Express App
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// make resources available for frontend
app.use(express.static(path.join(__dirname + '/app/public')));

// routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);
app.get('*',function (req, res) {
  res.sendFile(path.join(__dirname, '/app/public/home.html'));
});
app.set('port', (process.env.PORT || 3000));

// Starts the server to begin listening
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});