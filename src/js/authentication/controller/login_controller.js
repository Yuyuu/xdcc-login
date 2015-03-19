"use strict";

module.exports = LoginController;

/* @ngInject */
function LoginController($scope, $window, AuthenticationService) {
  $scope.credentials = {
    login: undefined,
    password: undefined
  };

  $scope.connect = connect;

  function connect(credentials) {
    delete $scope.errors;
    AuthenticationService.connect(credentials).then(
      function () {
        resetCredentials();
        $window.location = "/";
      },
      function (response) {
        $scope.errors = response.data.errors;
      }
    );
  }

  function resetCredentials() {
    $scope.credentials.login = undefined;
    $scope.credentials.password = undefined;
  }
}