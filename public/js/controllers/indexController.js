angular.module("iconic").controller("indexCtrl", indexCtrl);

indexCtrl.$inject = ["$rootScope","loginFactory"];

function indexCtrl($rootScope,loginFactory) {
    var vm = this;
    vm.loginFactory = loginFactory;
    if ($rootScope.urlReady == true) {
		cargarPermiso();
	} else {
		$rootScope.$on("UrlReady", function () {
			cargarPermiso();
		});
    }
    function cargarPermiso(){
        vm.pageName = $rootScope.page;
    }
    

    vm.logout = function() {
        loginFactory.logout();
    }
}