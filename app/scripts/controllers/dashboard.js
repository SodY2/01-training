'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
app.controller('dashboardController', function ($scope, $http, charachteristikaValue, Data, auth, groups) {

  $scope.user = auth.getProfile();
  console.info($scope.user)
  $scope.groups = groups;
  $scope.logout = function(){
    auth.logout();
  };
});
