Tetris.js
=========

A browser-based Tetris application served via Node.  Among the technologies used for this application are:

<img height="50" src="http://gruntjs.com/img/grunt-logo-no-wordmark.svg">
<img height="50" src="http://gruntjs.com/img/logo-handlebars.jpg">
<img height="50" src="http://upload.wikimedia.org/wikipedia/commons/1/1f/Html5_canvas_logo.png">
<img height="50" src="http://gruntjs.com/img/logo-requirejs.jpg">
<img height="50" src="http://gruntjs.com/img/logo-sass.jpg">
<img height="50" src="http://upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg">
<img height="50" src="http://underscorejs.org/docs/images/underscore.png">
<img height="50" src="http://creator.cotapon.org/wp-content/uploads/2012/07/nodejs_express.jpg">
<img height="50" src="http://gruntjs.com/img/logo-jshint.jpg">


## Getting Started
After executing `npm install` from the root directory, to serve the Tetris.js application, simply run:
```
node tetris.js
```
From there, you can navigate to the URL: `http://localhost:3000`

## Development
The following tasks are incredibly useful when developing the Tetris.js application:

- `grunt build` To build & generate the minified JS and CSS files
- `grunt watch` Remains running, watching for file updates so that the app can be re-built as needed
- `grunt handlebars` Parses through all handlebars template files, generating precompiled templates
