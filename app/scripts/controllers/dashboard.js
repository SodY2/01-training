'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
app.controller('dashboardController', function ($scope, $http, charachteristikaValue, Data, auth) {

  $scope.user = auth.user;
});
