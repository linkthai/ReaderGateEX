(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('TitleController', TitleController);

  /** @ngInject */
  function TitleController($location, $routeParams, $window, $timeout, $scope, bookService) {
    var vm = this;

    vm.titleId = $routeParams.param1;
    vm.nextEnabled = true;
    vm.previousEnabled = true;

    vm.go = function(chap, name) {
      $location.path('/archive/' + vm.titleId + '/' + chap + '/' + name);
    };

    vm.changeVol = function() {
      vm.go(vm.selectedChapter.vol, vm.selectedChapter.chap);
    }

    vm.editSeries = function() {
      $location.path('/edit-series/' + vm.titleId);
    }

    vm.addChapter = function() {
      bookService.addValue($scope.bookData);
      $location.path('/add-chapter/' + vm.titleId);
    }

    $scope.bookData;

    vm.title;
    vm.genres;
    vm.author;
    vm.cover;
    vm.description;
    vm.status;
    vm.views;

    function getSeriesById(seriesId) {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref('series/' + seriesId).on('value', function(snapshot) {
        $scope.bookData = snapshot.val();
          $timeout(function () {
              $scope.$apply();
          }, 1);

          vm.title = $scope.bookData._title;
          vm.genres = $scope.bookData._genres;
          vm.author = $scope.bookData._author;
          vm.cover = $scope.bookData._cover;
          vm.description = $scope.bookData._description;
          vm.status = $scope.bookData._status;
          vm.views = $scope.bookData._view;
        });
    }
    getSeriesById(vm.titleId);

    $scope.chapList = [];
    function getChaptersBySeries(seriesId) {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref('chapters/' + seriesId).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          $scope.chapList.push({
            data: childData,
            chapterId: childData._chapterId,
            name: childData._name
          })
          $timeout(function () {
              $scope.$apply();
          }, 10);
        });
      });
    }
    getChaptersBySeries(vm.titleId);
  }
})();
