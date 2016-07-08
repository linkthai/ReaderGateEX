(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($scope, $routeParams, $window, $location) {
    var vm = this;
    vm.searchString = '';
    vm.searchString = $routeParams.param1;
    vm.comicList = [];
    vm.comicListResult = [];

    vm.searchPressed = function() {

      $location.path('/search/' + vm.searchString);

      vm.search();
    }

    vm.filterResult = function() {

      vm.comicListResult.length = 0;
      while (vm.comicListResult.length > 0) {
        vm.comicListResult.pop();
      }

      var subString = vm.searchString.toLowerCase();
      for (var i = 0; i < vm.comicList.length; i++) {
        var title = vm.comicList[i].title.toLowerCase();
        if (title.indexOf(subString) > -1) {
          vm.comicListResult.push(vm.comicList[i]);
        }
      }
    }

    vm.search = function() {

      if (vm.searchString == null || vm.searchString == '')
        return;

      $scope.getAllSeries();
      vm.filterResult();

      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();//  your code here
          if (--i) myLoop(i) //  decrement i and call myLoop again if i > 0
        }, 50)
      })(100);
    }

    vm.goToTitle = function(bookId) {
      $location.path('/archive/' + bookId);
    }

    $scope.getAllSeries = function() {
      var database = firebase.database();
      vm.comicList.length = 0;

      database.ref('series/').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.comicList.push({
            data: childData,
            title: childData._title,
            author: childData._author,
            status: 'Incomplete'
          });
        });
      });
    }

    vm.search();
  }
})();
