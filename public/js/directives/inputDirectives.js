angular.module("iconic").directive("ngFileOnChange", ngFileOnChange);

function ngFileOnChange(){
    return{
        restrict: 'A',
        link: function(scope, element, attrs){
            var onChangeHandler = scope.$eval(attrs.ngFileOnChange);
            element.bind('change', onChangeHandler);
        }
    };
};