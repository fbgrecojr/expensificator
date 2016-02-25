var $ = require('jquery');
var _ = require('lodash');

module.exports = function($scope, fileUpload) {
    // var formData = new FormData();
    // $scope.getTheFiles = function($files) {
    //     _.forOwn($files, function(value, key) {
    //         formData.append(value, key);
    //     });
    // };

    var formData = {
        language: 'en',
        apikey: 'QUHM253S2x'
    };

    $scope.processForm = function() {
        var file = $scope.file;
        console.log('file is ');
        console.dir(file);

        var uploadUrl = 'http://api.ocrapiservice.com/1.0/rest/ocr';

        fileUpload.uploadFileToUrl(file, uploadUrl, formData);
        // _.forOwn($scope.formData, function(value, key) {
        //     formData.append(value, key);
        // });

        // var request = {
        //     method: 'POST',
        //     url: 'http://api.ocrapiservice.com/1.0/rest/ocr',
        //     data: formData,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // };

        // $http(request).success(function(data){
        //     console.log(data);
        // });
    };
};
