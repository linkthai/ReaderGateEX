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
      vm.increaseViews();
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

    vm.increaseViews = function() {
      var auth = firebase.auth();
      var database = firebase.database();

      database.ref('series/' + vm.titleId).once('value', function(snapshot) {
          var postData = snapshot.val();
          postData._views = postData._views + 1;
          var updates = {};
          updates['/series/' + vm.titleId] = postData;
          database.ref().update(updates);
      });
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
          vm.views = $scope.bookData._views;
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

    $scope.checkAdminPermission = function(uid) {
      var database = firebase.database();

      database.ref('users/' + uid).on('value', function(snapshot) {
        vm.adminPermission = snapshot.val().admin;
      });
      (function myLoop(i) {
        setTimeout(function() {
           $scope.$apply();//  your code here
          if (--i) myLoop(i) //  decrement i and call myLoop again if i > 0
        }, 50)
      })(100);
    }

    vm.adminPermission = false;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $scope.checkAdminPermission(user.uid);

      } else {
        // No user is signed in.
        vm.adminPermission = false;

        $scope.$apply();
      }
    });
  }
})();
