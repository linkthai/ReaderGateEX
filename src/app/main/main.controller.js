(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr) {
    var vm = this;

    vm.text = '';
    vm.title = '';
    vm.selectItem = selectItem;
    vm.classAnimation = '';
    vm.showToastr = showToastr;

    function showToastr(text) {
      toastr.info(text);
      vm.classAnimation = '';
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function() {
        $mdSidenav('left').toggle();
      });
    }

    function selectItem(item) {
      vm.title = item.name;
      //vm.toggleItemsList();
    }

    vm.menuItems = [{
      name: 'NEW RELEASE',
      icon: 'new_releases',
      sref: '.new'
    }, {
      name: 'MOST POPULAR',
      icon: 'grade',
      sref: '.popular'
    }];

    vm.latestUpdate = [{
      name: 'Naruto',
      vol: 10,
      chap: 20
    }, {
      name: 'DragonBall',
      vol: 32,
      chap: 49
    }, {
      name: 'One Piece',
      vol: 98,
      chap: 24
    }, {
      name: 'Detective Conan',
      vol: 20,
      chap: 13
    }];
  }
})();
