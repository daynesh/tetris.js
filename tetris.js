var express = require('express');

var app = express();

// Tell Express where to find static files
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

// Start listening
app.listen(3000, function() {
    console.log('Listening on port 3000...');
});