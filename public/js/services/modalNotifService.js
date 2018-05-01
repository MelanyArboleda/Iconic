angular.module('iconic').service('modalNotifService', function($modal){
//var items = ['item 1', 'item 2', 'item 3'];
    this.openModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/modalNotificaciones.html',
        //anchorElement: $event ? angular.element($event.target) : undefined,
        controller: 'modalNotifController'
      });
      return modalInstance.result;
    };
});