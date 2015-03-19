"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("LoginController", function () {

  var $scope, $window, AuthenticationService, controller;

  beforeEach(function () {
    $scope = {};
    $window = {
      location: ""
    };
    AuthenticationService = {
      connect: sinon.stub()
    };
    var LoginController = require("./login_controller");
    controller = new LoginController($scope, $window, AuthenticationService);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must not have any errors at start", function () {
    expect($scope.errors).to.not.be.defined;
  });

  it("must handle the connection success of a user", function () {
    var credentials = {
      login: "login",
      password: "password"
    };

    var user = {
      id: "id",
      login: "login"
    };

    AuthenticationService.connect.returns({
      then: function (successCallback, errorCallback) {
        successCallback.call(null, user);
      }
    });

    $scope.connect(credentials);

    expect(AuthenticationService.connect).to.have.been.calledWith(credentials);

    expect($scope.credentials.login).to.not.be.defined;
    expect($scope.credentials.password).to.not.be.defined;
    expect($window.location).to.equal("/");
  });

  it("must must handle errors happening at connection", function () {
    var credentials = $scope.credentials = {
      login: "login",
      password: "password"
    };

    var response = {
      data: {
        errors: [
          { message: "AN_ERROR" }
        ]
      }
    };

    AuthenticationService.connect.returns({
      then: function (successCallback, errorCallback) {
        errorCallback.call(null, response);
      }
    });

    $scope.connect(credentials);

    expect(AuthenticationService.connect).to.have.been.calledWith(credentials);

    expect($scope.errors.length).to.equal(1);
    expect($scope.errors[0].message).to.equal("AN_ERROR");
    expect($scope.credentials.login).to.equal(credentials.login);
    expect($scope.credentials.password).to.equal(credentials.password);
  });
});