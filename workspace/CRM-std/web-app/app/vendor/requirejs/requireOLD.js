requirejs: {
  js: {
      options: {
          uglify2: {
              mangle: false
          },
          baseUrl: "public/js",
          mainConfigFile: "public/js/main.js",
          name: 'main',
          out: "public/build/main.js",
          optimize: 'uglify2'
      }
  }
},