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
    function FooterBarController($scope, $location, $window) {
      var vm = this;

      vm.go = function(path) {
        $location.path('/' + path);
      }

      vm.a = 'sfsf';
    }
  }

})();
