(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($location) {
    var vm = this;
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      $location.path('/');
    }

    vm.message = '';
    vm.email = "";
    vm.password = "";

    vm.handleLogin = function() {
      firebase.auth().signInWithEmailAndPassword(vm.email, vm.password)
        .then(function() {
          $location.path('/');
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
