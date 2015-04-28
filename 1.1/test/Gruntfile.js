'use strict';
module.exports = function(grunt) {
  var gruntConfig = {
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
    bdd: {
      options: {
        reporter: 'spec',
      },
      src: ['<%= pkg.name%>/core/*.js']
    } 
    }   
  };
  grunt.initConfig(gruntConfig);
  
  //用例头文件 加载
  var _compile = module.__proto__._compile;
  module.__proto__._compile = function (content, filename)
  {
    if (filename.indexOf('testcases') > -1 )
    {
      content = grunt.file.read('case_header.js') + content;    
    }
    _compile.call(this, content, filename);
  };
    
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('default', 'mochaTest');
};