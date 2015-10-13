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
  var amountOfPairs = 3;

  $scope.generateRandomPair = function () {
    $scope.randomPair = [];
    for (var x = 0; x < amountOfPairs; x++) {
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
    }
  };

});
