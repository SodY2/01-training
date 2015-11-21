'use strict';
app.controller('ConceptsController', function ($scope, Data, $http, auth) {

  $scope.newConcept = {
    concept_text : ""
  };
  Data.get("concept/").then(function(result){
    $scope.concepts = result;
  });

  $scope.saveConcept = function(){
    var user = auth.getProfile();
    $scope.newConcept.updated_by = user.id;
    Data.post("concept/", $scope.newConcept)
  };
});
