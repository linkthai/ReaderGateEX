(function() {
  'use strict';

  angular
    .module('readerGate')
    .directive('navBar', navBar);

  /** @ngInject */
  function navBar() {
    var directive = {
      restrict: 'AEC',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      var vm = this;
      vm.navItems = [];

      vm.navItems = [{
          name: 'Home',
          icon: 'new_releases',
          href: '#/'
        }, {
          name: 'Archive',
          icon: 'grade',
          href: '#archive'
        }, {
          name: 'Contact',
          icon: 'grade',
          href: '#contact'
        }

      ];
    }
  }

})();
