(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController($scope, $location) {
    var vm = this;
    vm.email = '';
    vm.uid = '';
    vm.photoUrl = '';
    vm.uid = '';
    vm.info = [];

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
          vm.email = user.email;
          vm.uid = user.uid;
          vm.photoUrl = user.photoURL;
          vm.uid = user.uid;

          vm.getInfo(user.uid);
      } else {
        // No user is signed in.
      }
    });

    vm.getInfo = function(uid) {
      var database = firebase.database();

      database.ref('users/' + uid).on('value', function(snapshot) {
        vm.info = snapshot.val();
      });
      $scope.apply();
    }

  }
})();
