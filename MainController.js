// Code goes here
(function () {
  var app = angular.module("AngularUpload");

  var MainController = function ($scope, $base64, $resource, uploadservice) {

    $scope.files = uploadservice.getAllFiles();
    var fileForUpload;
    var base64EncodedFile;
    $scope.errors = false;
    $scope.test = true;

    $scope.encodeFile = function () {
      $scope.file = document.querySelector('input[type=file]').files[0];
      $scope.reader = new FileReader();
      fileForUpload = $scope.file;

      $scope.reader.onload = function () {
        $scope.encodedFile = $scope.reader.result.substr($scope.reader.result.indexOf(",") + 1)
        base64EncodedFile = $scope.encodedFile;
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
      uploadservice.addFile(fileForUpload, base64EncodedFile)
        
        .$promise.then(
        //success
        function (value) {
          $scope.files = uploadservice.getAllFiles();
        }
        );
    }

    $scope.deleteFile = function (id) {
      $scope.test = false;
      uploadservice.removeFile(id).$promise.then(
        //success 
        function (value) {
          $scope.test = true;
          $scope.files = uploadservice.getAllFiles();
          $scope.errors = false;
        },
        function(err){
          $scope.errors = true;
          $scope.message = err;
        })
    }
  };
   app.directive('pageLoader', [
    '$animate',
    function($animate) {
      var loader = angular.element(
        '<div class="loader"/>'
      );

      var link = function(s, body) {
        s.add = function() {
          $animate.enter(
            loader, body, null,
            function() {
              loader.addClass('loader-waiting');
            }
          );
        };

        s.remove = function() {
          $animate.leave(loader, function() {
            loader.removeClass('loader-waiting');
          });
        };
      };

      return {
        link: link
      };
    }
  ]);
  app.controller("MainController", MainController)

}());