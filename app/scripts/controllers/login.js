'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
app.controller('loginController', function ($scope, $http, charachteristikaValue, Data, auth) {

  $scope.login = function(){
    auth.login($scope.user);
  };

  $scope.logout = function(){
    auth.logout();
  };

  $scope.register = function(user){
    auth.register(user);
  };

});
