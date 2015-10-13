'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
app.controller('dashboardController', function ($scope, $http, charachteristikaValue, Data, auth, groups) {

  auth.getAuthObject().then(function(user){
    $scope.user = user;
  });



  $scope.logout = function(){
    auth.logout();
  };
});
