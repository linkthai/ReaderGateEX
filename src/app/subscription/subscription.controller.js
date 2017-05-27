(function() {
    'use strict';

    angular
      .module('readerGate')
      .controller('SubscriptionController', SubscriptionController);

    /** @ngInject */
    function SubscriptionController($rootScope, $location, $scope, $timeout, bookService) {
      var vm = this;
      vm.comicList = [];

      $scope.$on('$viewContentLoaded', function() {
        window.scrollTo(0, 0);
      });

      if ($rootScope.selectedSortIndex == null)
        $rootScope.selectedSortIndex = 0;

      vm.sortType = [{
        type: 'Sort By Name'
      }, {
        type: 'Sort By Popularity'
      }, {
        type: 'Sort By Newest'
      }];

      vm.changeType = function(index) {
        $rootScope.selectedSortIndex = index;
      }

      vm.changeAlphabet = function(char) {
        vm.selectedAlphabet = char;
      }
      vm.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
      vm.alphabet.splice(0, 0, "All");
      vm.selectedAlphabet = "All";
      vm.isLetter = function(c) {
        return c.toLowerCase() != c.toUpperCase();
      }
      vm.filterAlphabet = function(item) {

        if (vm.selectedAlphabet === "All")
          return true;

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

      vm.newestCategory = [{
        name: 'Latest to Oldest'
      }, {
        name: 'Oldest to Latest'
      }];
      vm.selectedNewestCategory = 'Latest to Oldest';
      vm.reverse = '-';

      vm.changeNewestCategory = function(name) {
        vm.selectedNewestCategory = name;
        if (name === 'Latest to Oldest')
        {
          vm.reverse = '-';
        } else {
          vm.reverse = '+';
        }
      }

      vm.popularCategory = [{
        name: 'Most to least popular'
      }, {
        name: 'Least to most popular'
      }];
      vm.selectedPopularCategory = 'Most to least popular';
      vm.popularReverse = '-views';

      vm.changePopularCategory = function(name) {
        vm.selectedPopularCategory = name;
        if (name === 'Most to least popular')
        {
          vm.popularReverse = '-views';
        } else {
          vm.popularReverse = 'views';
        }
      }

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

          (function myLoop(i) {
            setTimeout(function() {
               $scope.$apply();//  your code here
               if (vm.info.length != 0)
                return;
              if (--i) myLoop(i) //  decrement i and call myLoop again if i > 0
            }, 50)
          })(100);

        });
      });
    }
    $scope.getAllSeries();

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
