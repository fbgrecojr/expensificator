var _ = require('lodash');

module.exports = function($http) {
    this.uploadFileToUrl = function(file, uploadUrl, obj) {
        var fd = new FormData();
        fd.append('image', file);

        if (obj) {
            _.forOwn(obj, function(value, key) {
                fd.append(key, value);
            });
        }

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function(data) {
            console.log(data);
        })
        .error(function(err) {
            console.log(err);
        });
    };
};
