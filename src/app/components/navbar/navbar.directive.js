(function() {
  'use strict';

  angular
    .module('readerGate')
    .directive('navBar', navBar);

  /** @ngInject */
  function navBar() {
    var directive = {
      restrict: 'AEC',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($route, $scope, $rootScope, $location, $window) {
      var vm = this;
      vm.navItems = [];
      $scope.signIn = false;
      $scope.user;
      $scope.userInfo = [];
      vm.displayName = '';
      vm.selectedTab = "";

      vm.checkRoute = function() {
        if ($window.location.href.indexOf('archive') > -1) {
          vm.selectedTab = "Archive";
        } else if ($window.location.href.indexOf('about') > -1) {
          vm.selectedTab = "About";
        } else if ($window.location.href.indexOf('login') > -1) {
          vm.selectedTab = "Login";
        } else if ($window.location.href.indexOf('register') > -1) {
          vm.selectedTab = "Register";
        } else {
          vm.selectedTab = "";
        }
      }

      vm.checkRoute();

      vm.navItems = [{
        name: 'Home',
        icon: 'new_releases',
        href: ''
      }, {
        name: 'Archive',
        icon: 'grade',
        href: 'archive'
      }, {
        name: 'About',
        icon: 'grade',
        href: 'about'
      }];

      $scope.getInfo = function(uid) {
        var database = firebase.database();

        database.ref('users/' + uid).on('value', function(snapshot) {
          vm.info = snapshot.val();
        });
        $scope.apply();
      }

      vm.go = function(path) {
        $location.path('/' + path);
      }

      $scope.checkPermission = function() {
        if ($scope.signIn &&
          ($location.path() == '/register' ||
            $location.path() == '/login'))
          $window.location = '/';
      }

      $scope.checkPermissionNonUser = function() {
        if (!$scope.signIn &&
          ($location.path() == '/profile'))
          $window.location = '/';
      }

      vm.logOut = function() {
        $window.location.reload();
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }, function(error) {
          // An error happened.
        });
      };

      vm.goSearchQuery = function() {
        $lo
      }

      vm.goSearch = function() {
        $location.path('/search');
      }

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          $scope.signIn = true;
          $scope.user = user;
          vm.displayName = user.displayName;
          $scope.$apply();

          $scope.checkPermission();

        } else {
          // No user is signed in.
          $scope.signIn = false;
          vm.displayName = '';
          $scope.$apply();

          $scope.checkPermissionNonUser();
        }
      });
    }
  }

})();
