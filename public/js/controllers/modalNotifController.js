angular.module("iconic").controller("modalNotifCtrl", function ($scope, $modalInstance){
    //modalNotifCtrl.$inject = ["modalNotifService"]; SE DEBE INYECTAR EL SERVICE EN TODOS LOS CONTROLLERS DONDE UTILICE EL MODAL
    $scope.aceptar = function(modalNotifService){
        $modalInstance.close();
    };
    $scope.cancelar = function(modalNotifService){
        $modalInstance.dismiss('cancel');
    };
});
