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

    var isAuthenticated = auth.isAuthenticated();
    var isPublicAction = angular.isObject(toState.data)
      && toState.data.isPublic === true;

    if (isPublicAction || isAuthenticated) {
      return;
    }
    event.preventDefault();
    auth.getAuthObject().then(function (user) {

        var isAuthenticated = user;

      console.info(isAuthenticated)
        if (isAuthenticated) {
          // let's continue, use is allowed
          $state.go(toState, toParams)
          return;
        }
        // log on / sign in...
        $state.go("login");
      })

  });
});


app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: 'views/login.html',
      controller: 'loginController',
      data: { isPublic: true }
    })
    .state('logout', {
      url: "/logout",
      templateUrl: 'views/login.html',
      controller: 'loginController',
      data: { isPublic: true }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'loginController',
      data: { isPublic: true }
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
      data: { isPublic: true }
    })
    .state('charachter', {
      url: "/character",
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
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


