'use strict';
app.service('auth', function (api, $state, Data, $cookies, $http, $q) {

  var user = undefined;

  return {
    getCredentials: function (user) {
      console.info(user)
      return {
        username: user.username,
        password: user.password1,
        email: user.email,
        first_name: user.first_name || "",
        last_name: user.last_name || ""
      };
    },
    setHeaders: function () {
      if ($cookies.token) {
        $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
      }
    },
    login: function (user) {
      console.info(user)
      Data.post("auth/login/", user).then(function (response) {
        if (response.key) {
          $cookies.token = response.key;
          $state.go('dashboard');
        }
      });
    },

    logout: function () {
      this.setHeaders();
      Data.post("auth/logout/").then(function (response) {
        delete $cookies.token;
        user = undefined;
        $state.go('login');
      });
    },

    getAuthObject: function () {
      var deferred = $q.defer();
      if (user) {
        return $q.when(user);
      }

      this.setHeaders();
      Data.get("auth/user/").catch(function () {
        deferred.resolve()
      }).then(function (response) {
        if (response) {
          user = response;
          deferred.resolve(user)
        }
      });
      return deferred.promise;
    },

    isAuthenticated: function () {
      return user !== undefined
        && user;
    },

    register: function (passedUser) {
      // prevent login form from firing
      // create user and immediatly login on success
      Data.post("auth/registration/", passedUser).then(this.login(this.getCredentials(passedUser))).catch(function (data) {
        console.info(data);
      });
    },
    getProfile: function () {
     return user;
    }

  }
});

