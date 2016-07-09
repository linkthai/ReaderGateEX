(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($scope, $location, $window) {

    var vm = this;
    vm.firstname = '';
    vm.lastname = '';
    vm.email = '';
    vm.password = '';
    vm.uid = '';
    var auth = firebase.auth();
    var database = firebase.database();
    var newUser;

    $scope.$on('$viewContentLoaded', function() {
      window.scrollTo(0, 0);
    });

    vm.handleSignUp = function() {
      if (vm.email.length < 4) {
        vm.message = 'Please enter a valid email address.';
        return;
      }
      if (vm.password.length < 4) {
        vm.message = 'Please enter a password that is longer than 4 characters.';
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(vm.email, vm.password)
        .then(function() {

          $location.path('/register-success');
          $scope.$apply();

          firebase.auth().signInWithEmailAndPassword(vm.email, vm.password)
            .then(function() {
              newUser = firebase.auth().currentUser;
              newUser.updateProfile({
                displayName: vm.firstname
              });
              vm.uid = newUser.uid;

              var postData = {
                "admin": false,
                "firstName": vm.firstname,
                "lastName": vm.lastname
              };

              database.ref('users/' + vm.uid).set(postData);
            });

            $window.setTimeout(function(){ $window.location = '/'; }, 3000);
            $scope.$apply();
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            vm.message = 'The password is too weak.';
          } else if (errorCode == 'auth/email-already-in-use') {
            vm.message = 'Email has already been used.';
          } else if (errorCode == 'auth/invalid-email') {
            vm.message = 'The email is invalid.';
          } else {
            vm.message = errorMessage;
          }
          $scope.$apply();
          // [END_EXCLUDE]
        });
      // [END createwithemail]
    }

  }
})();
