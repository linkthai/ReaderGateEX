(function() {
  'use strict';

  angular
    .module('readerGate')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController($scope, $window, $location) {
    var vm = this;
    vm.email = '';
    vm.uid = '';
    vm.photoUrl = '';
    vm.uid = '';
    vm.firstName = '';
    vm.lastName = '';
    vm.info = [];
    vm.count = '';

    $scope.$on('$viewContentLoaded', function() {
      window.scrollTo(0, 0);
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        vm.email = user.email;
        vm.uid = user.uid;
        vm.photoUrl = user.photoURL;
        vm.uid = user.uid;
        vm.getInfo(user.uid);

        (function myLoop(i) {
          setTimeout(function() {
             $scope.$apply();//  your code here
             if (vm.info.length != 0)
              return;
            if (--i) myLoop(i) //  decrement i and call myLoop again if i > 0
          }, 50)
        })(100);

        $scope.$apply();

      } else {
        // No user is signed in.
      }
    });

    vm.getInfo = function(uid) {
      var database = firebase.database();

      database.ref('users/' + uid).on('value', function(snapshot) {
        vm.info = snapshot.val();
      });
    }

  }
})();
