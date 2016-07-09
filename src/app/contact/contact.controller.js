(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController($scope) {

  $scope.$on('$viewContentLoaded', function() {
    window.scrollTo(0, 0);
  });

  }
})();
