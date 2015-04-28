(function() {
  var baseUrl = "" + "webresource/";
  var isDebug = typeof location != 'undefined' && location.search.indexOf('debug=1') != -1;
  var config = {
    paths: {
      'demoModel': baseUrl + 'model/demoModel',
      'demoStore': baseUrl + 'model/demoStore',
      'indexHtml': baseUrl + 'templates/index.html'
    }
  };

  if (isDebug) {
    config.urlArgs = Date.now();
  }

  require.config(config);
})();
define("demoConfig", function(){});

/**
 * @fileoverview demo模型文件
 * @author wliao <wliao@Ctrip.com> 
 */
 define('demoModel',[
  'cBase',
  'cModel'
], function(
  Base,
  Model
) {
  var ListModel = Base.Class(Model, {
    buildurl: function() {
      return Lizard.restfullApi + 'list';
    },
    __propertys__: function () {
      this.param = {
        cityid: ''
      };
    }
  });

  var DetailModel = Base.Class(Model, {
    buildurl: function() {
      return Lizard.restfullApi + 'detail';
    },
    __propertys__: function () {
      this.param = {
        hotelId: '',
        date: ''
      };
    }
  });

  return {
    list: new ListModel(),
    detail: new DetailModel()
  };
});
/**
 * @fileoverview 
 * @author wliao <wliao@Ctrip.com> 
 */
 define('demoStore',[
  'cBase',
  'cStore'
], function(
  Base,
  Store
) {
  // 单个值存储
  var Position = Base.Class(Store, {
    __propertys__: function () {
      this.lifeTime = '30M';
      this.key = 'demo_position'; // 注意不要和其他频道冲突，最好用频道名字为前缀
    }
  });

  // 存对象
  var CityHistroy = Base.Class(Store, {
    __propertys__: function () {
      this.key = 'demo_city';
      this.length = 5;
    },
    get: function($super) {
      var city = $super() || {
        list: [],
        time: new Date()
      };
      return city;
    },
    push: function(item) {
      var result = this.get().list;

      result.unshift(item);
      if (result.length > this.length) {
        result.pop();
      }

      this.setAttr('list', result);
    }
  });

  return {
    position: new Position(),
    cityHistroy: new CityHistroy()
  };
});
;

define('text!indexHtml',[],function () { return '<h2>index1 html template</h2>';});

