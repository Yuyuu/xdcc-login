"use strict";

module.exports = SessionService;

/* @ngInject */
function SessionService(locker) {
  var self = this;

  self.create = create;

  function create(token, user) {
    locker.put("token", token);
    locker.put(
      "user",
      {
        id: user.id,
        login: user.login,
        role: user.role
      }
    );
  }
}