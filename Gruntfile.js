"use strict";


module.exports = function (grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  var config = {
    pkg: grunt.file.readJSON("package.json"),
    prod: grunt.option("prod") || false,
    deploy: grunt.option("deploy") || false,
    buildDir: "public/genere",
    deployDir: "../xdcc-webapp/subapp/xdcc-login"
  };

  grunt.util._.extend(config, loadConfig("./tasks/options/"));
  grunt.initConfig(config);


  grunt.loadTasks("tasks");

  grunt.registerTask("test", ["jshint", "mochaTest:console"]);

  grunt.registerTask("ci", ["jshint", "mochaTest:ci", "build"]);

  grunt.registerTask("default", ["clean", "dev"]);

  grunt.registerTask("build", ["clean", "assets"]);

  grunt.registerTask("deploy", ["build", "copy:deploy"]);

  function loadConfig(path) {
    var glob = require("glob");
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }
};