var app = '///localhost:3000/webapporigin/';
require.config({
  shim: {
    $: {
      exports: 'jquery'
    },
    _: {
      exports: '_'
    },
    B: {
      deps: [
        '_',
        '$'
      ],
      exports: 'Backbone'
    },
    F:{
      deps: [
        '$'
      ],
      exports: 'Fastclick'
    },
    libs: {
      deps: [
        '_',
        '$',
        'B'
      ],
      exports: 'libs'
    },
    common: {
      deps: [
        'libs'
      ]
    }
  },
  paths: {
    '$': app+'3rdlibs/jquery',
    '_': app+'3rdlibs/underscore',
    'B': app+'3rdlibs/backbone',
    'F': app+'3rdlibs/fastclick',
    'libs':app+'3rdlibs/libs',
    'common': app+'common'
  }
});
// require(['$', '_', 'B','F'], function () {

// });