var angular = require('angular');
var ngAnimate = require('angular-animate');

var ngFiles = require('./directives/ngFiles');

var MainController = require('./controllers/MainController');
var FormController = require('./controllers/FormController');

var app = angular.module('app', [ngAnimate]);
app.directive('ngFiles', ['$parse', ngFiles]);
app.controller('MainController', ['$scope', MainController]);
app.controller('FormController', ['$scope', '$http', FormController]);
