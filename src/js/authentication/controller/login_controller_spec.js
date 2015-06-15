"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("LoginController", function () {

  var $window, AuthenticationService, $location, controller;

  beforeEach(function () {
    $window = {
      location: ""
    };
    AuthenticationService = {
      connect: sinon.stub()
    };
    $location = {search: sinon.stub().returns({})};
    var LoginController = require("./login_controller");
    controller = new LoginController($window, AuthenticationService, $location);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must not have any errors at start", function () {
    expect(controller.errors).to.not.be.defined;
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

    controller.connect(credentials);

    expect(AuthenticationService.connect).to.have.been.calledWith(credentials);

    expect(controller.credentials.login).to.not.be.defined;
    expect(controller.credentials.password).to.not.be.defined;
    expect($window.location).to.equal("/");
  });

  it("must must handle errors happening at connection", function () {
    var credentials = controller.credentials = {
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

    controller.connect(credentials);

    expect(AuthenticationService.connect).to.have.been.calledWith(credentials);

    expect(controller.errors.length).to.equal(1);
    expect(controller.errors[0].message).to.equal("AN_ERROR");
    expect(controller.credentials.login).to.equal(credentials.login);
    expect(controller.credentials.password).to.equal(credentials.password);
  });
});