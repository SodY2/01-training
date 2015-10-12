'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
app.controller('CharacterController', function ($scope, $http, charachteristikaValue, auth) {
    $scope.charAttributes = charachteristikaValue;
    $scope.selectWording = "";
  console.info("FGHJ", auth.getProfile())

    $scope.generateRandomPair = function () {
      $scope.randomPair = [];
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
    };

  });
