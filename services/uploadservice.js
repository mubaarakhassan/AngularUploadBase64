(function () {
    var uploadservice = function ($resource) {
        return $resource('http://base64uploadwebapi.azurewebsites.net/api/files/:id', null,
            {
               
            });
    };
    var module = angular.module("AngularUpload")
    module.factory("uploadservice", uploadservice);
}());