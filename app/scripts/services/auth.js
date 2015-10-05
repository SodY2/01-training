'use strict';
app.service('auth', function (api, $state, Data, $cookies, $http) {

  var self = this;
  //Data.get("auth/").then(function(result){
  //  console.info(result)
  //});

  self.getCredentials = function (user) {
    return {
      username: user.username || $scope.user.email,
      password: user.password,
      email: user.email,
      first_name: user.first_name || "",
      last_name: user.last_name || ""
    };
  };

  self.login = function (user) {
    Data.post("auth/login/", user).then(function(response){
      if(response.key){
        $http.defaults.headers.common.Authorization = 'Token ' + response.key;
        $cookies.token = response.key;
        $state.go('dashboard');
      }
    });
  };

  self.logout = function () {
    Data.post("auth/login/", user).then(function(response){
      if(response.key){
        $state.go('login');
      }
    });
  };

  self.isLoggedIn = function(){
    return self.user ? true:false;
  };

  this.register = function ($event) {
    // prevent login form from firing
    $event.preventDefault();
    // create user and immediatly login on success
    api.users.create(self.getCredentials()).$promise.then(self.login()).catch(function (data) {
      alert(data.data.username);
    });
  };
});
