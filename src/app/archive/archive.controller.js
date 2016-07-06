(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ArchiveController', ArchiveController);

  /** @ngInject */
  function ArchiveController($location, $scope, $timeout, bookService) {
    var vm = this;
    vm.comicList = [];

    vm.selectedSortIndex = 0;
    vm.sortType = [{
      type: 'Sort By Name'
    }, {
      type: 'Sort By Genres'
    }, {
      type: 'Sort By Popularity'
    }, {
      type: 'Sort By Date'
    }, {
      type: 'Sort By Rating'
    }];

    vm.changeType = function(index) {
      vm.selectedSortIndex = index;
    }

    vm.changeAlphabet = function(char) {
      vm.selectedAlphabet = char;
    }
    vm.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
    vm.selectedAlphabet = 'A';
    vm.isLetter = function(c) {
      return c.toLowerCase() != c.toUpperCase();
    }
    vm.filterAlphabet = function(item) {
      var char = item.title.charAt(0).toUpperCase();
      if (vm.selectedAlphabet == '#' && !vm.isLetter(char))
        return true;
      return char == vm.selectedAlphabet;
    }

    vm.go = function(data) {
      bookService.addValue(data);
      $location.path('/archive/' + data._bookId);
    };

    vm.addSeries = function(path) {
      $location.path('/add-new-series');
    };

    $scope.getAllSeries = function() {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref('series/').on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          vm.comicList.push({
            data: childData,
            title: childData._title,
            author: childData._author,
            status: childData._status,
            views: childData._views
          });
          $timeout(function () {
              $scope.$apply();
          }, 1);
        });
      });
    }
    $scope.getAllSeries();

  }
})();
