(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $location, $window) {
    var vm = this;
    var user = firebase.auth().currentUser;

    vm.message = '';
    vm.email = "";
    vm.password = "";

    $scope.$on('$viewContentLoaded', function() {
      window.scrollTo(0, 0);
    });

    vm.handleLogin = function() {
      firebase.auth().signInWithEmailAndPassword(vm.email, vm.password)
        .then(function() {
          $scope.signIn = true;
          $location.path('/');
        })
        .then(function() {
          $scope.apply();
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode == 'auth/wrong-password')
            vm.message = 'Wrong password';
          else if (errorCode == 'auth/invalid-email') {
            vm.message = 'Invalid email';
          } else if (errorCode == 'auth/user-not-found') {
            vm.message = 'Email wasn\'t registered yet';
          } else if (errorCode == 'auth/user-disabled') {
            vm.message = 'User disabled';
          }
          // ...
        });
    };
  }
})();
