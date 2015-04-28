window.PATH = {
  DEFAULTINDEX: 'index',  //默认页面
  VIEWS_PATH:   'car/views/', //页面view目录,car为部署的虚拟目录
  TPL_PATH: 'car/templates/', //html模板目录
  BASEURL:      '/webapp/'  //根虚拟目录
}

function getViewsPath() {
    return window.PATH.VIEWS_PATH; 
}

function buildViewPath(htmlpath) {
    return getViewsPath() + htmlpath;
}

function buildViewTemplatesPath(htmlpath) {
    return 'text!' + window.PATH.TPL_PATH + htmlpath;
}

require.config({
  //baseUrl
  baseUrl: window.PATH.BASEURL,
  //paths
  paths: {
    'CarModel':       'car/models/carmodel',
    'CarStore':       'car/models/carstore',
    'TaxiModel':      'car/models/taximodel',
    'TaxiStore':      'car/models/taxistore',
    'TaxiRadio':      'car/widget/c.taxi.radio',
    'CPageStore':     '../webapp/cpage/models/cpagestore',
    'TaxiCommon':     'car/common/taxi.common'
  }
});

require(['libs', 'App'], function (libs, App) {
  //实例化App
  var app = new App({
    'defaultView':  window.PATH.DEFAULTINDEX,
    'viewRootPath': window.PATH.VIEWS_PATH
  });
});
