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

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, $sessionStorage) {

    if(!auth.isAuthenticated || !toState.isPublic)
      auth.getAuthObject().then(function (user) {
        if (auth.isAuthenticated()) {
          return;
        }
        $state.go("login");

      });

  });
});


app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise(function ($injector) {
    var $state = $injector.get("$state");
    $state.go("login");
  });

  $stateProvider
    .state('login', {
      url: "/login",
      //templateUrl: 'views/login.html',
      templateUrl: 'views/wartung.html',
      controller: 'loginController',
      isPublic: true
    })
    .state('logout', {
      url: "/logout",
      //templateUrl: 'views/login.html',
      templateUrl: 'views/wartung.html',
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
      //templateUrl: 'views/dashboard.html',
      templateUrl: 'views/wartung.html',
      controller: 'dashboardController'
    })
    .state('/', {
      url: '/dashboard',
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController'
    })
    .state('charachter', {
      url: "/character",
      templateUrl: 'views/character.html',
      controller: 'CharacterController',
      isPublic: true
    })
    .state('concepts', {
      url: "/concepts",
      //templateUrl: 'views/concepts.html',
      templateUrl: 'views/wartung.html',
      controller: 'ConceptsController'
    });

});

