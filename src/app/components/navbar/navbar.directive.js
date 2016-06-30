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
    function NavbarController($scope, $location, $window) {
      var vm = this;
      vm.navItems = [];
      $scope.signIn = false;
      $scope.user;
      vm.displayName = '';

      vm.navItems = [{
        name: 'Home',
        icon: 'new_releases',
        href: ''
      }, {
        name: 'Archive',
        icon: 'grade',
        href: 'archive'
      }, {
        name: 'Contact',
        icon: 'grade',
        href: 'contact'
      }];

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

      vm.logOut = function() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          $window.location.reload();
        }, function(error) {
          // An error happened.
        });
      };
    }
  }

})();
