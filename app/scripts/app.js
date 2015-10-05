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

app.run(function ($rootScope, $state, $stateParams, auth, $cookies, $http){
  //if($cookies.token){
  //  $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
  //}
});


app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .state('logout', {
      url: "/logout",
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'loginController'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'views/dashboard.html',
      controller: 'dashboardController'
    })
    .state('/', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController'
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


