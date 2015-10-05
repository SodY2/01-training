'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
app.controller('loginController', function ($scope, $http, charachteristikaValue, Data, auth, djangoAuth) {

  //Data.get("auth/user/").then(function (resp) {
  //  console.info(resp)
  //})

  djangoAuth.profile();
  $scope.login = function(){
    djangoAuth.login($scope.user);
  };

});
