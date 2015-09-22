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
      $routeProvider.
        when("/login", {
          title: "Login",
          templateUrl: "views/login.html",
          controller: "authCtrl"
        })
        .when("/logout", {
          title: "Logout",
          templateUrl: "views/login.html",
          controller: "logoutCtrl"
        })
        .when("/signup", {
          title: "Signup",
          templateUrl: "views/signup.html",
          controller: "authCtrl"
        })
        .when("/dashboard", {
          title: "Dashboard",
          templateUrl: "views/dashboard.html",
          controller: "authCtrl"
        })
        .when("/", {
          title: "Login",
          templateUrl: "views/login.html",
          controller: "authCtrl",
          role: "0"
        })
        .when('/charachter', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .otherwise({
          redirectTo: "/login"
        });
    }])
  .run(function ($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      $rootScope.authenticated = false;
      Data.get("session").then(function (results) {
        if (results.uid) {
          $rootScope.authenticated = true;
          $rootScope.uid = results.uid;
          $rootScope.name = results.name;
          $rootScope.email = results.email;
        } else {
          var nextUrl = next.$$route.originalPath;
          if (nextUrl == "/signup" || nextUrl == "/login") {

          } else {
            $location.path("/login");
          }
        }
      });
    });
  });

