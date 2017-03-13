(function () {
    var uploadservice = function ($resource) {
        var urlBase = $resource('http://localhost:4444/APM.WebAPI/api/files/:id', { id: '@id' },
            {
                update: { method: 'PUT' },
                remove: { method: 'DELETE' }
            });


        var getAllFiles = function () {
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