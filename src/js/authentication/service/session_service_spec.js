"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Session", function () {

  var locker, fakeStorage, service, token, user;

  beforeEach(function () {
    locker = {
      put: function (key, value) { fakeStorage[key] = value; }
    };
    fakeStorage = {};
    token = "_%token123%_";
    user = {
      id: "id",
      login: "login",
      role: "member"
    };
    var SessionService = require("./session_service");
    service = new SessionService(locker);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must properly create the session", function () {
    service.create(token, user);

    expect(fakeStorage.token).to.equal(token);
    expect(fakeStorage.user.id).to.equal(user.id);
    expect(fakeStorage.user.login).to.equal(user.login);
    expect(fakeStorage.user.role).to.equal(user.role);
  });
});