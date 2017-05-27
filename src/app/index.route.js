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
        controllerAs: 'vm'
      })
      .when('/archive', {
        templateUrl: 'app/archive/archive.html',
        controller: 'ArchiveController',
        controllerAs: 'vm'
      })
      .when('/archive/:param1', {
        templateUrl: 'app/title/title.html',
        controller: 'TitleController',
        controllerAs: 'vm'
      })
      .when('/archive/:param1/:param2/:param3', {
        templateUrl: 'app/chapter/chapter.html',
        controller: 'ChapterController',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/register-success', {
        templateUrl: 'app/register/register-success.html',
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm'
      })
      .when('/add-new-series', {
        templateUrl: 'app/management/add-new-series.html',
        controller: 'ManagementController',
        controllerAs: 'vm'
      })
      .when('/edit-series/:param1', {
        templateUrl: 'app/management/edit-series.html',
        controller: 'ManagementController',
        controllerAs: 'vm'
      })
      .when('/add-chapter/:param1', {
        templateUrl: 'app/management/add-chapter.html',
        controller: 'ManagementController',
        controllerAs: 'vm'
      })
      .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'vm'
      })
      .when('/search/:param1', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'vm'
      })
      .when('/main_sub', {
        templateUrl: 'app/main_sub/main_sub.html',
        controller: 'MainSubController',
        controllerAs: 'vm'
      })
      .when('/subscription', {
        templateUrl: 'app/subscription/subscription.html',
        controller: 'SubscriptionController',
        controllerAs: 'vm'
      })
      .when('/payment', {
        templateUrl: 'app/payment/payment.html',
        controller: 'PaymentController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
