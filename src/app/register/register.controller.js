(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope, $location) {

    var vm = this;
    vm.firstname = '';
    vm.lastname = '';
    vm.email = '';
    vm.password = '';
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      $location.path('/');
    }

    vm.handleSignUp = function () {
      if (vm.email.length < 4) {
        alert('Please enter a valid email address.');
        return;
      }
      if (vm.password.length < 4) {
        alert('Please enter a password that is longer than 4 characters.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      vm.result = firebase.auth().createUserWithEmailAndPassword(vm.email, vm.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if (errorCode == 'auth/email-already-in-use') {
          alert('Email has already been used.');
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      })
      .then(function() {
        $location.path('/register-success');
      });
      // [END createwithemail]
    }

  }
})();
