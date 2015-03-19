"use strict";

module.exports = AuthenticationService;

/* @ngInject */
function AuthenticationService($http, Session) {
  var self = this;

  self.connect = connect;

  function connect(credentials) {
    return $http.post("/sessions", credentials).
      then(function (response) {
        Session.create(response.data.token, response.data.user);
        return response;
      });
  }
}