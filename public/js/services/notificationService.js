'use strict';

/**
* @ngdoc service
* @name iconic.service.notification
* @description
* # service.notification
* Service in the iconic.
*/
angular.module('iconic')
.service('serviceNotification', [
  function () {

    var base = function (configuration) {
      return Materialize.toast(configuration.message, configuration.time, configuration.className, configuration.callback);
    };

    this.success = function (message, time, className, callback) {
      var config = {
        message: message,
        time: time ? time : undefined,
        className: 'light-blue ' + className
      };

      if (callback) {
        config.callback = callback;
      }

      return base(config);
    };

    this.warning = function (message, time, className, callback) {
      var config = {
        message: message,
        time: time ? time : undefined,
        className: 'orange accent-3 ' + className
      };

      if (callback) {
        config.callback = callback;
      }

      return base(config);
    };

    this.error = function (message, time, className, callback) {
      var config = {
        message: message,
        time: time ? time : undefined,
        className: 'red ' + className
      };

      if (callback) {
        config.callback = callback;
      }

      return base(config);
    };

    this.info = function (message, time, className, callback) {
      var config = {
        message: message,
        time: time ? time : undefined,
        className: 'green ' + className
      };

      if (callback) {
        config.callback = callback;
      }

      return base(config);
    };

    this.errorHttp = function () {
      return this.error('ERROR_CONEXION', 10000);
    };

    this.fadeOut = function (className) {
      $('.' + className).fadeOut();
    };
  }
]);