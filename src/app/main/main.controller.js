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
    vm.mostPopular = [];

    function selectItem(item) {
      vm.title = item.name;
    }

    vm.go = function(path) {
      $location.path(path);
    }

    vm.goToTitleNewRelease = function(num) {
      $location.path('/archive/' + vm.newRelease[num].bookId);
    }
    vm.goToTitleMostPopular = function(num) {
      $location.path('/archive/' + vm.mostPopular[num].bookId);
    }

    $scope.getNewRelease = function() {
      vm.newRelease.length = 0;
      var database = firebase.database();

      database.ref('series/').limitToLast(4).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.newRelease.push({
            genres: childData._genres,
            author: childData._author,
            bookId: childData._bookId,
            title: childData._title,
            cover: childData._cover
          });
        });
      });

      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();
          if (--i) myLoop(i)
        }, 50)
      })(100);
    }

    $scope.getMostPopular = function() {
      vm.mostPopular.length = 0;
      var database = firebase.database();

      database.ref('series/').limitToLast(4).orderByChild('_views').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.mostPopular.push({
            genres: childData._genres,
            author: childData._author,
            bookId: childData._bookId,
            title: childData._title,
            cover: childData._cover
          });
        });
      });

      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();
          if (--i) myLoop(i)
        }, 50)
      })(100);
    }

    $scope.getNewRelease();
    $scope.getMostPopular();

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
