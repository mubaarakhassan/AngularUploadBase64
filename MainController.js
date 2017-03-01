angular.module('AngularUpload', ['base64','ngResource','filters'])
  .controller('MainController', function($scope,$base64,$resource,$http,$window, $rootScope, uploadservice) {

  $scope.files = uploadservice.query();
  $scope.test
 $scope.testencode

  $scope.uploadFile = function(){
    $scope.file = document.querySelector('input[type=file]').files[0];
    $scope.reader = new FileReader();
   $scope.test = $scope.file;
   
    $scope.reader.onload = function(){
      $scope.encodedFile = $base64.encode($scope.reader.result);
      $scope.testencode = $scope.encodedFile;
      $scope.$apply();
    }

    if($scope.file){
      $scope.reader.readAsBinaryString($scope.file);
    }
  }  

  $scope.decodeFile = function(){
    window.alert($base64.decode($scope.myfile.base64));
   };

  $scope.uploadTextFile = function(textfile1) {  
         $scope.encodedText = $base64.encode(textfile1); 
  };

  $scope.upload = function(){
    uploadservice.save({
    "filename": $scope.test.name,
    "fileType": $scope.test.type,
    "fileSize": $scope.test.size,
    "base64": $scope.testencode,
    "releaseDate": new Date()
  });
  }

})

angular.module('AngularUpload')
.factory('uploadservice', function($resource){
    return $resource('http://localhost:4444/APM.WebAPI/api/files/:id', null, 
    {
        'update' : {method: 'PUT'}
    });
})

angular.module('filters', [])
	.filter('Filesize', function () {
		return function (size) {
			if (isNaN(size))
				size = 0;

			if (size < 1024)
				return size + ' Bytes';

			size /= 1024;

			if (size < 1024)
				return size.toFixed(2) + ' Kb';

			size /= 1024;

			if (size < 1024)
				return size.toFixed(2) + ' Mb';

			size /= 1024;

			if (size < 1024)
				return size.toFixed(2) + ' Gb';

			size /= 1024;

			return size.toFixed(2) + ' Tb';
		};
	});