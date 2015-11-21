"use strict";
app.factory("Data", ['$http', '$location',
  function ($http, $q, $location, toaster, $cookies) {

    var serviceBase = 'https://mighty-shore-7827.herokuapp.com/v1/api/';

    var obj = {};

    obj.get = function (q) {
      return $http.get(serviceBase + q).then(function (results) {
        return results.data;
      });
    };
    obj.post = function (q, object) {
      return $http.post(serviceBase + q, object).then(function (results) {
        return results.data;
      });
    };
    obj.put = function (q, object) {
      return $http.put(serviceBase + q, object).then(function (results) {
        return results.data;
      });
    };
    obj.delete = function (q) {
      return $http.delete(serviceBase + q).then(function (results) {
        return results.data;
      });
    };
    return obj;
  }]);
