(function () {
    var pageuploader = function () {
        return function ($animate) {
              var loader = angular.element(
                '<div class="loader"/>'
            );
            
            var link = function (s, body) {
                s.add = function () {
                    $animate.enter(
                        loader, body, null, function() {
                            loader.addClass('loader-waiting');
                        }
                    );
                };
                
                s.remove = function () {
                    $animate.leave(loader, function() {
                        loader.removeClass('loader-waiting');
                    });
                };
            };
            
            return {
                link: link
            };
        };
    };

    var module = angular.module("AngularUpload")
    module.directive("pageuploader", [$animate],pageuploader);
}());