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
    'toaster',
    'ui.router'
  ]);

app.run(function ($rootScope, $state, $stateParams, auth) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    if (!toState.isPublic) {

      auth.getAuthObject().then(function (user) {
        var isAuthenticated = auth.isAuthenticated();

        if (isAuthenticated) {
          event.preventDefault();
          // let's continue, use is allowed
          $state.go(toState, toParams)
          return;
        }
        else {
          // log on / sign in...
          event.preventDefault();
          $state.go("login");
        }
      })

    }
  });
});


app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: 'views/login.html',
      controller: 'loginController',
      isPublic: true
    })
    .state('logout', {
      url: "/logout",
      templateUrl: 'views/login.html',
      controller: 'loginController',
      isPublic: true
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'loginController',
      isPublic: true
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController'
    })
    .state('/', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController',
    })
    .state('charachter', {
      url: "/character",
      templateUrl: 'views/character.html',
      controller: 'CharacterController'
    });

});

app.config(['$httpProvider', function ($httpProvider, $cookies) {
  //$httpProvider.defaults.xsrfCookieName = 'csrftoken';
  //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //$httpProvider.defaults.withCredentials = true;
  //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "https://mighty-shore-7827.herokuapp.com";

}]);


