var $ = require('jquery');
var _ = require('lodash');

module.exports = function($scope, $http) {
    $scope.upload = function () {
        if ($('#upload-menu').is(':hidden')) {
            $('#upload-menu').show(function () {
                $('#loading-overlay').addClass('anim');
                $('.happy').addClass('anim');
            });
        } else {
            $('#loading-overlay').removeClass('anim');
            $('.happy').removeClass('anim');
            setTimeout(function(){
                $('#upload-menu').hide('slow');
            }, 100);
        }
    };

    $scope.loading = function () {
        $('#loading').toggle();
    };

    $scope.processForm = function() {
        $scope.loading();
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
            $scope.loading();
            $scope.upload();
            console.log(data);
            _.forOwn(data, function (value, key) {
                key = '.' + key;
                $(key).text(value);
            });
        })
        .error(function(err) {
            $scope.loading();
            $scope.upload();
            console.log(err);
        });
    };
};
