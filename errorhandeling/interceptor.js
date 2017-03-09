// (function () {
//     var injector = function ($provide, $httpProvider) {
//         $provide.factory('ErrorInterceptor', function ($q) {
//             return {
//                 responseError: function (rejection) {
//                     alert('You cannot add multiple files that are the same');
//                     console.log(rejection);
//                     return $q.reject(rejection);
//                 }
//             };
//         })
//     };

//     var module = angular.module("AngularUpload")
//     module.factory('interceptor',injector);
// }());