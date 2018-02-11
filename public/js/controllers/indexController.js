angular.module("iconic").controller("indexCtrl", indexCtrl);

indexCtrl.$inject = ["loginFactory"];

function indexCtrl(loginFactory) {
    var vm = this;
    vm.loginFactory = loginFactory;

    vm.logout = function() {
        loginFactory.logout();
    }
}