global.jQuery = require('jquery');
var bootstrap = require('bootstrap');
var angular = require('angular');
var attachFastClick = require('fastclick');
attachFastClick(document.body);

var MainController = require('./controllers/MainController');
var FormController = require('./controllers/FormController');
var ngFiles = require('./directives/ngFiles');
// var fileUpload = require('./services/fileUpload');

var app = angular.module('app', []);
app.controller('MainController', ['$scope', MainController]);

app.directive('ngFiles', ['$parse', ngFiles]);
// app.service('fileUpload', ['$scope', '$http', fileUpload]);
app.controller('FormController', ['$scope', '$http', FormController]);
