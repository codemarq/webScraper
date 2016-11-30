// main node server stuff
// ==========================================================================
// package dependencies
// ==========================================================================

// express
var express = require('express');

// method-override
var methodOverride = require('method-override');

// body-parser
var bodyParser = require('body-parser');

// Sets up the Express App
// ==========================================================================
var app = express();
var PORT = 3010;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() || __dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

var routes = require('./controllers/controller.js');

var models = require('./models');

// models.sequelize.sync({force:true})

app.use('/', routes);

// Starts the server to begin listening
// ===========================================================================
app.listen(process.env.PORT || PORT, function () {
	console.log('App listening on PORT ' + PORT);
});
