angular.module("iconic").controller("indexCtrl", indexCtrl);

indexCtrl.$inject = ["loginFactory"];

function indexCtrl(loginFactory) {
    var vm = this;
    vm.logout = logout;
    vm.loginFactory = loginFactory;

    function logout() {
        loginFactory.logout();
    }
}