function d(str) {
  console.log(str);
}
requirejs([
  'libs'
], function(libs) {
  function nodeModules(path) {
    return './node_modules/' + path + '/' + path;
  }

  function testModule(path) {
    return '../test/testcases/' + path;
  }

  requirejs.config({
    baseUrl: '.',
    shim: {
      mocha: {
        exports: 'mocha'
      } 
    },
    paths: {
      'mocha': nodeModules('mocha'),
      'chai': nodeModules('chai'),
      'sinon': './node_modules/sinon/pkg/sinon'
    }
  });
  
  requirejs([
    'mocha',
    'chai',
    'sinon'
  ], function(mocha, chai, sinon) {
    mocha.setup('bdd');

    //导出全局expect
    window.expect = chai.expect;

    //加载测试模块
    requirejs([
      testModule('core/c.core.inherit'),
      testModule('common/c.ajax'),
      testModule('model/c.model'),
      testModule('ui/c.ui.abstract.view'),
      testModule('util/c.utility.hybrid'),
      testModule('util/c.utility.date'),
      testModule('lizard')
    ], function() {
      if (window.mochaPhantomJS) { 
        mochaPhantomJS.run(); 
      } else {
        mocha.run();
      }
    });
  });
});