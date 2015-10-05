'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
angular.module('rpTrainingApp')
  .controller('MainCtrl', function ($scope, $http, charachteristikaValue, Data, auth, djangoAuth) {
    $scope.charAttributes = charachteristikaValue;
    $scope.selectWording = "";

    $scope.generateRandomPair = function () {
      $scope.randomPair = [];
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
    };

    //Data.get("accounts/").then(function (resp) {
    //  console.info(resp)
    //})

  });
