"use strict";

var angular = require("angular");

var authenticationModule = angular.module("authentication", [require("angular-locker")]);

authenticationModule
  .controller("LoginController", require("./controller/login_controller"))
  .service("AuthenticationService", require("./service/authentication_service"))
  .service("Session", require("./service/session_service"));

module.exports = authenticationModule.name;