angular.module("iconic").controller("modalNotifCtrl", function ($scope, $modalInstance, msn){
    //modalNotifCtrl.$inject = ["modalNotifService"]; SE DEBE INYECTAR EL SERVICE EN TODOS LOS CONTROLLERS DONDE UTILICE EL MODAL
    $scope.msn = msn;
    $scope.aceptar = function(modalNotifService){
        $modalInstance.close(true);
    };
    $scope.cancelar = function(modalNotifService){
        $modalInstance.dismiss('cancel');
    };
});
