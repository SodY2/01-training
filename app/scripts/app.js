'use strict';

/**
 * @ngdoc overview
 * @name rpTrainingApp
 * @description
 * # rpTrainingApp
 *
 * Main module of the application.
 */

var app = angular
  .module('rpTrainingApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'toaster'
  ]).config(["$routeProvider",
    function ($routeProvider) {
      $routeProvider
        .when('/login', {
        title: 'Login',
        templateUrl: 'views/login.html',
        controller: 'authCtrl'
      })
        .when('/logout', {
          title: 'Logout',
          templateUrl: 'views/login.html',
          controller: 'logoutCtrl'
        })
        .when('/signup', {
          title: 'Signup',
          templateUrl: 'views/signup.html',
          controller: 'authCtrl'
        })
        .when('/dashboard', {
          title: 'Dashboard',
          templateUrl: 'views/dashboard.html',
          controller: 'authCtrl'
        })
        .when('/', {
          title: 'Login',
          templateUrl: 'views/login.html',
          controller: 'authCtrl',
          role: '0'
        })
        .when('/charachter', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .otherwise({
          redirectTo: '/login'
        });

    }]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

