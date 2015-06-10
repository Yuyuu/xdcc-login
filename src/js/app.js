"use strict";

var angular = require("angular");

angular.module("login", [
  require("angular-sanitize"),
  require("angular-route"),
  require("./translation"),
  require("./authentication")
])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/"
      })
      .otherwise({
        redirectTo: "/"
      });
  }])

  .config(["lockerProvider", function config(lockerProvider) {
    lockerProvider
      .setDefaultDriver("local")
      .setDefaultNamespace(false)
      .setSeparator(".")
      .setEventsEnabled(false);
  }]);