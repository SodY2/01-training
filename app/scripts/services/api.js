app.factory('api', function ($resource) {
    function add_auth_header(data, headersGetter) {
      // as per HTTP authentication spec [1], credentials must be
      // encoded in base64. Lets use window.btoa [2]
      var headers = headersGetter();
      console.info(data)
      headers['Authorization'] = ('Basic ' + btoa(data.username +
        ':' + data.password));
    }

    // defining the endpoints. Note we escape url trailing dashes: Angular
    // strips unescaped trailing slashes. Problem as Django redirects urls
    // not ending in slashes to url that ends in slash for SEO reasons, unless
    // we tell Django not to [3]. This is a problem as the POST data cannot
    // be sent with the redirect. So we want Angular to not strip the slashes!
    return {
      auth: $resource('https://mighty-shore-7827.herokuapp.com/v1/api/auth/login\\/', {}, {
        login: {method: 'POST', transformRequest: add_auth_header},
        logout: {method: 'DELETE'}
      }),
      users: $resource('https://mighty-shore-7827.herokuapp.com/v1/api/accounts\\/', {}, {
        create: {method: 'POST'}
      })
    };
  });
