angular.module('iconic').service('modalNotifService', function($modal){
//var items = ['item 1', 'item 2', 'item 3'];
    this.openModal = function (msn) {
      var modalInstance = $modal.open({
        templateUrl: 'views/users/modalNotificaciones.html',
        //anchorElement: $event ? angular.element($event.target) : undefined,
        controller: 'modalNotifCtrl',
        resolve: {
          msn: function () {
            return msn;
          }
        }
      });
      return modalInstance.result;
    };
});