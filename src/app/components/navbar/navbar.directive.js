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
    function NavbarController() {
      var vm = this;
      vm.navItems = [];
      vm.signIn = true;
      vm.userEmail = '';

      vm.navItems = [{
        name: 'Home',
        icon: 'new_releases',
        href: '#/'
      }, {
        name: 'Archive',
        icon: 'grade',
        href: '#archive'
      }, {
        name: 'Contact',
        icon: 'grade',
        href: '#contact'
      }];

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          vm.signIn = true;
          vm.userEmail = user.email;
        } else {
          // No user is signed in.
          vm.signIn = false;
        }
      });

      vm.logOut = function() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }, function(error) {
          // An error happened.
        });
      };
    }
  }

})();
