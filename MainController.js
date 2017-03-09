// Code goes here
(function() {
  var app = angular.module("AngularUpload");
  
  var MainController = function($scope, $base64, $resource, uploadservice) {
    
    $scope.files = uploadservice.query();
    $scope.fileForUpload
    $scope.base64EncodedFile

    $scope.encodeFile = function () {
      $scope.file = document.querySelector('input[type=file]').files[0];
      $scope.reader = new FileReader();
      $scope.fileForUpload = $scope.file;

      $scope.reader.onload = function () {
        $scope.encodedFile = $scope.reader.result;
        $scope.base64EncodedFile = $scope.encodedFile;
        $scope.$apply();
      }

      if ($scope.file) {
        $scope.reader.readAsDataURL($scope.file);
      }
    }

    $scope.encodeTextFile = function (text) {
      $scope.encodedText = $base64.encode(text);
    };

    $scope.upload = function () {
      var newFile = uploadservice.save({
        "filename": $scope.fileForUpload.name,
        "fileType": $scope.fileForUpload.type,
        "fileSize": $scope.fileForUpload.size,
        "base64": $scope.base64EncodedFile,
        "releaseDate": new Date()
      }).$promise.then(function(value){
        $scope.files = uploadservice.query();
      })
    }

     $scope.deleteFile = function (id) {
      uploadservice.remove({id: id}).$promise.then(
        function(value){
          $scope.files = uploadservice.query();
        }
      );
      
    }    
  };

  app.controller("MainController", MainController)

}());