'use strict';

/**
 * @ngdoc function
 * @name rpTrainingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rpTrainingApp
 */
angular.module('rpTrainingApp')
  .controller('MainCtrl', function ($scope, $http, charachteristikaValue) {
    $scope.charAttributes = charachteristikaValue;
    $scope.selectWording = "";

    $scope.generateRandomPair = function(){
      $scope.randomPair = [];
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
      $scope.randomPair.push($scope.charAttributes[Math.floor(Math.random() * $scope.charAttributes.length)]);
    };
    //
    //$http.get("views/char.html").then(function(reports){
    //    var allParagraphs = $("p", reports.data);
    //    angular.forEach(allParagraphs, function(p){
    //      $scope.charAttributes.push({
    //        "name" : $(p).text(),
    //        "description": $(p).attr("title")
    //      });
    //    });
    //});
  });
