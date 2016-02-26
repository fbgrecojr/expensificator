var $ = require('jquery');
var _ = require('lodash');

module.exports = function($scope, $http) {
    $scope.upload = function () {
        $('#upload-menu').toggle(function () {
            $('#loading-overlay').toggleClass('anim');
            $('.happy').toggleClass('anim');
        });
    };

    $scope.processForm = function() {
        var file = $scope.file;
        console.log('file is ');
        console.dir(file);

        var uploadUrl = 'http://api.ocrapiservice.com/1.0/rest/ocr';

        var fd = new FormData();
        fd.append('image', file);

        var formData = {
            language: 'en',
            apikey: 'M7ke6uW4mh'
        };

        _.forOwn(formData, function(value, key) {
            fd.append(key, value);
        });

        $scope.main.loading = true;

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function(data) {
            console.log(data);
            $scope.populateForm(data);
        })
        .error(function(err) {
            console.log(err);
        });
    };

    $scope.populateForm = function(data) {
        var str = data.toString();

        var strArr = str.split('\n');

        var uploadUrl = 'http://52.90.38.61:3004/jsonify';

        var fd = {
            data: str
        };

        $.post('http://52.90.38.61:3004/jsonify', fd)
        .success(function(data) {
            $scope.upload();
            console.log(data);
        })
        .error(function(err) {
            $scope.upload();
            $scope.main.loading = false;
            console.log(err);
        });
    };
};
