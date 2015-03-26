module.exports = {
  deploy: {
    files: [
      {
        expand: true,
        dot: true,
        dest: "<%= deployDir %>",
        src: [
          "public/**/*",
          "revision/**/*",
          "routes/**/*",
          "views/**/*",
          "app.js",
          "!**/bower_components/**",
          "!**/node_modules/**"
        ]
      }
    ]
  }
};