(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController($scope, $firebase) {
    var vm = this;
    var auth = $firebase.auth();
    var storageRef = $firebase.storage().ref();

    $scope.upload = function() {
      document.getElementById('test').innerHTML = 'Hello JavaScript!';
    };

  }
})();
