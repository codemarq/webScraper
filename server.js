// ==========================================================================
// package dependencies
// ==========================================================================
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

// mongoose mpromise is deprecated, using bluebird promises
var Promise = require('bluebird');
mongoose.Promise = Promise;

// ==========================================================================
// Sets up the Express App
// ==========================================================================
var app = express();
var PORT = 3010;

// Use morgan for logging and body-parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() || __dirname + '/public'));

// handlebars for view engine using default layout "main"
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// ===========================================================================
// MONGOOSE
// ===========================================================================
// config mongoDB with mongoose
mongoose.connect("mongodb://localhost/onion");
var db = mongoose.connection;

// log mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});
// log successful connection
db.once("open", function(){
	console.log("Mongoose connection successful.");
});

// ===========================================================================
// Routes
// ===========================================================================
var routes = require('./controllers/controller.js');
app.use('/', routes);

// Starts the server to begin listening
// ===========================================================================
app.listen(process.env.PORT || PORT, function () {
	console.log('App listening on PORT ' + PORT);
});
