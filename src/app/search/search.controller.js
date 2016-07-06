(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($scope, $routeParams, $window, $location) {
    var vm = this;
    vm.searchString = $routeParams.param1;

    vm.searchPressed = function() {
      $location.path('/search/' + vm.searchString);
    }

}
})();
