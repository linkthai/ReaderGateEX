(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ManagementController', ManagementController);

  /** @ngInject */
  function ManagementController($location) {
    var vm = this;

    vm.menuItems = [
      {
        name: "Infomation",
        icon: "people"
      },
      {
        name: "Bookmark",
        icon: "people"
      },
      {
        name: "Message",
        icon: "people"
      },
      {
        name: "Management",
        icon: "people"
      }
    ];

  }
})();
