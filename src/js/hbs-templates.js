define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["gameControls"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"game-controls\">\n    <div class=\"start-stop-controls\">\n        <button type=\"button\" class=\"newgame\">New Game</button>\n        <button type=\"button\" class=\"play-pause pause\">Pause</button>\n    </div>\n    <div class=\"play-controls\">\n        <p class=\"game-label\">Controls</p>\n        <button type=\"button\" class=\"left\">Left</button>\n        <button type=\"button\" class=\"down\">Down</button>\n        <button type=\"button\" class=\"right\">Right</button>\n        <button type=\"button\" class=\"rotate-left\">Rotate Left</button>\n        <button type=\"button\" class=\"rotate-right\">Rotate Right</button>\n    </div>\n</div>";
  });

this["JST"]["gameMetrics"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"game-metrics\">\n    <p class=\"game-label\">Next Piece</p>\n    <div class=\"next-piece\"></div>\n    <div class=\"level-container\">\n        <div class=\"lvl-label-container\"><p class=\"game-label\">Level:</p></div>\n        <div class=\"level\">";
  if (helper = helpers.level) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.level); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n    </div>\n    <div class=\"lines-container\">\n        <div class=\"lns-label-container\"><p class=\"game-label\">Lines:</p></div>\n        <div class=\"lines\">";
  if (helper = helpers.lines) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.lines); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n    </div>\n</div>";
  return buffer;
  });

this["JST"]["gamePlayArea"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"gameplay-container\">\n    <p class=\"game-label\">Game Play</p>\n    <div class=\"game-canvas\"></div>\n</div>";
  });

return this["JST"];

});