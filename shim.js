module.exports = {
  "angular": {
    "exports": "angular",
    "depends": {
      jquery: "jQuery"
    }
  },
  "angular-route": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngRoute').name"
  },
  "angular-locker": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('angular-locker').name"
  }
};