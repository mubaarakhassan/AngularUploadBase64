// Code goes here
(function () {
  var app = angular.module("AngularUpload");

  var MainController = function ($scope, $base64, $resource, uploadservice, cfpLoadingBar) {

    $scope.files = uploadservice.getAllFiles();
    var fileForUpload;
    $scope.selectedFilesarray = [];
    console.log($scope.array);
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

    $scope.downloadFile = function (name, contentType, base64) {
      var byteCharacters = $base64.decode(base64);

      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      var blob = new Blob([byteArray], { type: contentType });
      var downloadLink = angular.element('<a></a>');
      downloadLink.attr('href', window.URL.createObjectURL(blob));
      downloadLink.attr('download', name);
      downloadLink[0].click();
    };

    $scope.upload = function () {
      cfpLoadingBar.start();
      uploadservice.addFile(fileForUpload, base64EncodedFile)

        .$promise.then(
        //success
        function (value) {
          $scope.files = uploadservice.getAllFiles();
        }
        );
    }

    $scope.deleteFile = function (id) {
      cfpLoadingBar.start();
      uploadservice.removeFile(id).$promise.then(
        //success 
        function (value) {

          $scope.files = uploadservice.getAllFiles();
          $scope.errors = false;
        },
        function (err) {
          $scope.errors = true;
          $scope.message = err;
        })
    }

    $scope.deleteSelectedFiles = function (files) {
     var data =  uploadservice.getAllFiles();
     for (i = 0; i < files.length; i++) { 
       if(files[i].isChecked == true){
          $scope.deleteFile(files[i].id);
       } 
    }
    
    }
      
    


    // $animate.on('enter', document.body,
    //   function callback(element, phase) {
    //     // cool we detected an enter animation within the container
    //     console.log("loading ...");
    //   });


  };
  app.controller("MainController", MainController)

}());