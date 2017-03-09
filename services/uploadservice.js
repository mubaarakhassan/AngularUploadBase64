(function () {
    var uploadservice = function ($resource) {
        return $resource('http://localhost:4444/APM.WebAPI/api/files/:id', {
            id: '@id'
        },
            {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' }
            });
    };
    var module = angular.module("AngularUpload")
    module.factory("uploadservice", uploadservice);
}());