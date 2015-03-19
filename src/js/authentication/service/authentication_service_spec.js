"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("AuthenticationService", function () {

  var $http, Session, service;

  beforeEach(function () {
    $http = {
      post: sinon.stub()
    };
    Session = {
      create: sinon.spy()
    };
    var AuthenticationService = require("./authentication_service");
    service = new AuthenticationService($http, Session);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must send a post request and create the session", function () {
    var credentials = {};

    var response = {
      data: {
        token: "token123",
        user: { id: "id" }
      }
    };

    Session.user = response.data.user;
    Session.user.token = response.data.token;

    $http.post.returns({
      then: function (callback) {
        return callback.call(null, response);
      }
    });

    var callbackResult = service.connect(credentials);

    expect($http.post).to.have.been.calledWith("/sessions", credentials);
    expect(Session.create).to.have.been.calledWith(response.data.token, response.data.user);
    expect(callbackResult).to.deep.equal(response);
  });
});