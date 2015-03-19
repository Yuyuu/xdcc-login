"use strict";
var angular = require("angular");

angular.module("login", [
  require("angular-bootstrap"),
  require("angular-route")
])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/templates/index"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);