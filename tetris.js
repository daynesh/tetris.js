var express = require('express'),
	exphbs	= require('express-handlebars'),
	sass	= require('node-sass');

var app = express();

// Set up the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Tell Express where to find static files
app.use(express.static(__dirname + '/public'));

	sass.renderFile({
		file: __dirname + '/scss/tetris.scss',
		outFile: __dirname + '/public/css/tetris.css',
		outputStyle: 'compressed',
		success: function() {
			console.log('CSS generation complete...');
		}
	});

// Routes
app.get('/', function(req, res) {
	res.render('gameView');
});

// Start listening
app.listen(3000, function() {
	console.log('Listening on port 3000...');
});