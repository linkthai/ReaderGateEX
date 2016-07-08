(function() {
  'use strict';

  angular
    .module('readerGate')
    .directive('footerBar', footerBar);

  /** @ngInject */
  function footerBar() {
    var directive = {
      restrict: 'AEC',
      templateUrl: 'app/components/footer/footer.html',
      controller: FooterBarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterBarController($rootScope, $scope, $location, $window) {
      var vm = this;

      vm.go = function(path) {
        $location.path('/' + path);
      }

      vm.goToSortArchive = function(index, path) {
        $rootScope.selectedSortIndex = index;
        $location.path(path);
        $window.scrollTo(0, 0);
      }
    }
  }

})();
