(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $scope, $location) {
    var vm = this;

    vm.text = '';
    vm.title = '';
    vm.newRelease = [];
    vm.mostPopular = [];
    vm.latestUpdate = [];

    function selectItem(item) {
      vm.title = item.name;
    }

    vm.goToSortArchive = function(index, path) {
      $rootScope.selectedSortIndex = index;
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

    $scope.getLatestUpdate = function() {
      vm.latestUpdate.length = 0;
      var database = firebase.database();

      database.ref("latest_update/").limitToLast(30).on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.latestUpdate.push(childData);
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
    $scope.getLatestUpdate();
  }
})();
