var $ = require('jquery');
var _ = require('lodash');

module.exports = function($scope, $http) {
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

        var fd = new FormData();
        fd.append('image', file);

        _.forOwn(formData, function(value, key) {
            fd.append(key, value);
        });

        $scope.main.loading = true;

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function(data) {
            $scope.main.loading = false;
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

        console.dir(strArr);

        var total;

        strArr.forEach(function(item) {
            var reg = /^(TOTAL)/g;

            if (reg.test(item)) {
                total = item.split(' ')[1];
            }
        });

        $scope.main.vendor = strArr[0].split(' ')[0];
        $scope.main.date = strArr.pop().split(' ')[0];
        $scope.main.total = total;
        $scope.main.type = 'Groceries';
    };
};
