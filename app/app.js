var $ = require('jquery');
require('angular');
var MainController = require('./controllers/MainController');

var app = angular.module('app', []);
app.controller('MainController', ['$scope', MainController]);

$(document).ready(function() {
    $('form').submit(function($e) {
        $e.preventDefault();

        var img = $('input[type=file]');

        var form = new FormData();

        form.append('image', $('input[type=file]')[0].files[0]);
        form.append('language', 'en');
        form.append('apikey', 'QUHM253S2x');
        // var formData = {
        //     language: $('[name=language]').val(),
        //     apikey: $('[name=apikey]').val(),
        //     image: fileInputElement.files[0]
        // };

        $.ajax({
            type: 'POST',
            url: 'http://api.ocrapiservice.com/1.0/rest/ocr',
            data: form,
            contentType: false,
            processData: false,
            success: function(data) { console.log(data); },
            error: function(err) { console.log(err); }
        });

        console.dir(form);
        console.log('submit was pressed.');
    });
});
