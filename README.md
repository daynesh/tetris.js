[![Build Status](https://travis-ci.org/Daynesh/tetris.js.svg?branch=master)](https://travis-ci.org/Daynesh/tetris.js)

Tetris.js
=========

A browser-based Tetris application served via Node.  Among the technologies used for this application are:

<a href="http://gruntjs.com/" target="_blank" title="Grunt">
  <img height="50" src="http://gruntjs.com/img/grunt-logo-no-wordmark.svg"/>
</a>
<a href="http://handlebarsjs.com/" target="_blank" title="Handlebars.js">
  <img height="50" src="http://gruntjs.com/img/logo-handlebars.jpg">
</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank" title="HTML5 Canvas">
  <img height="50" src="http://upload.wikimedia.org/wikipedia/commons/1/1f/Html5_canvas_logo.png">
</a>
<a href="http://requirejs.org/" target="_blank" title="RequireJS">
  <img height="50" src="http://gruntjs.com/img/logo-requirejs.jpg">
</a>
<a href="http://sass-lang.com/" target="_blank" title="Sass">
  <img height="50" src="http://gruntjs.com/img/logo-sass.jpg">
</a>
<a href="http://expressjs.com/" target="_blank" title="Express">
  <img height="50" src="http://creator.cotapon.org/wp-content/uploads/2012/07/nodejs_express.jpg">
</a>
<a href="http://www.jshint.com/" target="_blank" title="JSHint">
  <img height="50" src="http://gruntjs.com/img/logo-jshint.jpg">
</a>
<a href="http://jquery.com/" target="_blank" title="jQuery">
  <img height="50" src="http://upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg">
</a>
<a href="http://underscorejs.org/" target="_blank" title="Underscore.js">
  <img height="50" src="http://underscorejs.org/docs/images/underscore.png">
</a>


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
