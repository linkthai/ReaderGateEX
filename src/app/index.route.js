(function() {
  'use strict';

  angular
    .module('readerGate')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/archive', {
        templateUrl: 'app/archive/archive.html',
        controller: 'ArchiveController',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'main'
      })
      .when('/register', {
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
