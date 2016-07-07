(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $location) {
    var vm = this;

    vm.text = '';
    vm.title = '';
    vm.selectItem = selectItem;
    vm.newRelease = [];

    function selectItem(item) {
      vm.title = item.name;
    }

    vm.go = function(path) {
      $location.path(path);
    }
    vm.goToTitle = function(num) {
      $location.path('/archive/' + vm.newRelease[num].bookId);
    }

    $scope.getNewRelease = function() {
      vm.newRelease.length = 0;
      var database = firebase.database();

      database.ref('series/').limitToLast(4).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.newRelease.push({
            bookId: childData._bookId,
            title: childData._title,
            genres: childData._genres,
            author: childData._author,
            cover: childData._cover
          });
        });
      });
    }
    $scope.getNewRelease();

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
