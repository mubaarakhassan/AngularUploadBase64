(function () {
    var uploadservice = function ($resource,cfpLoadingBar) {
        var urlBase = $resource('http://base64uploadwebapi.azurewebsites.net/api/files/:id', { id: '@id' },
            {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' }
            });


        var getAllFiles = function () {
            cfpLoadingBar.complete()
            return urlBase.query();
        }

        var addFile = function (file, base64EncodedFile) {
           return urlBase.save({
                "filename": file.name,
                "fileType": file.type,
                "fileSize": file.size,
                "base64": base64EncodedFile,
                "releaseDate": new Date()
            });
        }

        var removeFile = function (id) {
            cfpLoadingBar.complete()
            return urlBase.remove({ id: id });
        }
        return {
            getAllFiles: getAllFiles,
            addFile: addFile,
            removeFile: removeFile,
        };
    };
    var module = angular.module("AngularUpload")
    module.factory("uploadservice", uploadservice);
}());