(function() {
  var app = angular.module("AngularUpload", ['ngRoute']);

  app.config(function($routeProvider){
     $routeProvider.when("/main", {
                                  templateUrl: "index.html",
                                  controller: "MainController"
    }).otherwise({redirectTo:"/main"});
  });

}());