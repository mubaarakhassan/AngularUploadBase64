'use strict';

angular.module('AngularUpload')
.factory('uploadservice', function($resource){
    return $resource('http://localhost:60802/api/products/:id', null, 
    {
        'update' : {method: 'PUT'}
    });
})