"use strict";

module.exports = LoginController;

/* @ngInject */
function LoginController($window, AuthenticationService, $location) {
  var it = this;
  it.redirectReason = $location.search().r;
  it.credentials = {
    login: undefined,
    password: undefined
  };

  it.connect = connect;

  function connect(credentials) {
    delete it.redirectReason;
    delete it.errors;
    AuthenticationService.connect(credentials).then(
      function () {
        resetCredentials();
        $window.location = "/";
      },
      function (response) {
        it.errors = response.data.errors;
      }
    );
  }

  function resetCredentials() {
    it.credentials.login = undefined;
    it.credentials.password = undefined;
  }
}