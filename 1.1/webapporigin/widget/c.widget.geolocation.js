/**********************************
 * @author:   cmli@Ctrip.com
 * @description:  组件Geolocation
 *
 * 从cUtility中分离出来的定位组件
 */
define(['cBase', 'cUtility', 'cWidgetFactory', 'cStore', 'cHybridFacade'], function(cBase, Util, WidgetFactory, cStore, Facade) {
  "use strict";

  var WIDGET_NAME = 'Geolocation';

  var KEY = '0b895f63ca21c9e82eb158f46fe7f502';

  // 如果WidgetFactory已经注册了HeaderView，就无需重复注册
  if (WidgetFactory.hasWidget(WIDGET_NAME)) {
    return;
  }

  var Geolocation = Geolocation || {};

  /**
   * 获得设备经纬度
   * @param callback {Function} 获得经纬度的回调
   * @param error {Function} 发生错误时的回调
   *
   * update caofu 更新提示语 2013-09-06
   */
  Geolocation.requestGeographic = function(callback, error) {

    var successCallback = function(position) {
      if (callback) {
        callback(position);
      }
    };

    var errorCallback = function(err) {
      var err_msg = '未能获取到您当前位置，请重试或选择城市'; // '获取经纬度失败!';
      switch (err.code) {
        case err.TIMEOUT:
          err_msg = "获取您当前位置超时，请重试或选择城市！";
          break;
        case err.PERMISSION_DENIED:
          err_msg = "您拒绝了使用位置共享服务，查询已取消，请开启位置共享或选择城市！";
          break;
        case err.POSITION_UNAVAILABLE:
          err_msg = "获取您当前位置信息失败，请重试或选择城市！";
          break;
      }

      if (error) {
        error(err, err_msg);
      }
    };

    window.navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 20000
    });
  };

  /**
   * 高德api经纬度获得详细地址信息
   * @param lng {Number} 经度
   * @param lat {Number} 纬度
   * @param callback {Function} 完成时回调,回传参数为高德下发城市数据
   * @param error {Function} 超时回调
   * @param timeout {Number} 超时的时间长度，默认为8秒
   * @author ouxingzhi
   */
  Geolocation.requestAMapAddress = function(lng, lat, callback, error, timeout) {
    var region = '121.473704,31.230393';
    if (lng && lat) {
      region = lng + ',' + lat;
    }
    var param = $.param({
      'location': region,
      'key': KEY,
      'radius': 0,
      'extensions': 'all'
    });

    timeout = timeout || 8000;

    $.ajax({
      url: "http://restapi.amap.com/v3/geocode/regeo?" + param,
      dataType: 'jsonp',
      success: function(data) {
        var addrs = (data && data.regeocode) || '',
          citys = addrs.addressComponent.city,
          province = addrs.addressComponent.province,
          city = '';
        if (_.isString(citys)) {
          city = citys;
        } else if (_.isString(province)) {
          city = province;
        }
        var info = {
          'address': _.isString(addrs.formatted_address) ? addrs.formatted_address : '',
          'location': region,
          'info': addrs && addrs.addressComponent,
          'city': city,
          'lng': lng,
          'lat': lat
        };
        callback && callback(info);
      },
      error: function(e) {
        error && error(e);
      },
      timeout: timeout
    });
  };

  /**
   * 高德api经纬度获得周边信息
   * @param lng {Number} 经度
   * @param lat {Number} 纬度
   * @param callback {Function} 完成时回调,回传参数为高德下发城市数据
   * @param error {Function} 超时回调
   * @param timeout {Number} 超时的时间长度，默认为8秒
   */
  Geolocation.requestAMapAround = function(lng, lat, callback, error, timeout) {
    var region = '121.473704,31.230393';
    if (lng && lat) {
      region = lng + ',' + lat;
    }
    var param = $.param({
      'location': region,
      'key': KEY,
      'radius': 500,
      'offset': 4,
      'page': 1
    });

    timeout = timeout || 8000;

    $.ajax({
      url: "http://restapi.amap.com/v3/place/around?" + param,
      dataType: 'jsonp',
      success: function(data) {
        var pois = (data && data.pois) || [];
        callback && callback(pois);
      },
      error: function(e) {
        error && error(e);
      },
      timeout: timeout
    });
  };

  /**
   * 高德api关键字查询
   * @param lng {Number} 经度
   * @param lat {Number} 纬度
   * @param callback {Function} 完成时回调,回传参数为高德下发城市数据
   * @param error {Function} 超时回调
   * @param timeout {Number} 超时的时间长度，默认为8秒
   */
  Geolocation.requestAMapKeyword = function(keywords, city, callback, error, timeout) {
    //var region = '121.473704,31.230393';
    //if (lng && lat) {
    //    //region = lng + ',' + lat;
    //}
    var param = $.param({
      'keywords': keywords,
      'city': city,
      'key': KEY,
      'offset': 10,
      'page': 1,
      'extensions': 'all'
    });

    timeout = timeout || 8000;

    $.ajax({
      url: "http://restapi.amap.com/v3/place/text?" + param,
      dataType: 'jsonp',
      success: function(data) {
        var pois = (data && data.pois) || [];
        callback && callback(pois);
      },
      error: function(e) {
        error && error(e);
      },
      timeout: timeout
    });
  };

  /**
   * @description: 获取转换过的经纬度
   * @param lng {Number} 经度
   * @param lat {Number} 维度
   * @param callback {Function} 成功回调
   * @param error {Function} 错误回调
   * @author: ouxz
   */
  Geolocation.tansformLongitude = function(lng, lat, callback, error, timeout) {
    var param = $.param({
      locations: lng + ',' + lat,
      key: KEY,
      coordsys: 'gps'
    });

    timeout = timeout || 8000;

    $.ajax({
      url: "http://restapi.amap.com/v3/assistant/coordinate/convert?" + param,
      dataType: 'jsonp',
      success: function(data) {
        if (data && data.status === '1') {
          var l = data.locations.split(',');
          callback && callback(l[0], l[1]);
        } else {
          error && error();
        }
      },
      error: function(e) {
        error && error(e);
      },
      timeout: timeout
    });
  }

  /*******************************************
   * 获得城市信息
   * @param callback {Function} 成功时的回调
   * @param erro {Function} 失败时的回调
   * @param posCallback {Function} 获取经纬度成功的回调
   * @param posError {Function} 获取经纬度失败的回调
   * @param isAccurate {Boolean} 是否通过高精度查询 (如果使用高精度定位会发起两次请求，定位会需要更多时间，如只需定位城市，不需开启此开关，此开关在app中无效)
   */
  Geolocation.requestCityInfo = function(callback, error, posCallback, posError, isAccurate) {

    var _HybridLocate = function() {
      var successCallback = function(info) {
        if (!info || !info.value)
        {
          errorCallback('网络不通，当前无法定位', 1);
          return;
        }
        if (info) {
          if (info.locateStatus) {
            if (info.locateStatus == -1) {
              errorCallback('网络不通，当前无法定位', 1);
              return;
            } else if (info.locateStatus == -2) {
              errorCallback('定位没有开启', 2);
              return;
            }
          }
          if (info.value && _.isObject(info.value))
          {
            if (_.size(info.value) == 2)
            {
              posCallback && posCallback(info.value.lng, info.value.lat)
            }
            else  {
              callback && callback({lng: info.value.lng, lat: info.value.lat, city: info.value.ctyName || info.value.province, address: info.value.addrs});
            }
          }
        }
      };

      var errorCallback = function(err, msg) {
        if (typeof posError === 'function') {
          posError(err, msg);
          return;
        }
        if (error) {
          error(msg);
        }
      };

      Facade.request({
        name: Facade.METHOD_LOCATE,
        success: successCallback,
        error: errorCallback
      });
    };

    var _WebLocate = function() {
      var successCallback = function(pos) {
        var lng = pos.coords.longitude;
        var lat = pos.coords.latitude;
        posCallback && posCallback(lng, lat);
        var locateSuccessCallback = function(data) {
          if (callback) {
            callback(data);
          }
        };

        var locateErrorCallback = function(err, msg) {

          if (error) {
            error();
          }
        };
        if (!isAccurate) {
          Geolocation.requestAMapAddress(lng, lat, locateSuccessCallback, locateErrorCallback);
        } else {
          Geolocation.tansformLongitude(lng, lat, function(lng, lat) {
            Geolocation.requestAMapAddress(lng, lat, locateSuccessCallback, locateErrorCallback);
          }, function(err) {
            locateErrorCallback(err);
          });
        }
      };

      var errorCallback = function(err, msg) {
        if (typeof posError === 'function') {
          posError(msg, err);
          return;
        }
        if (error) {
          error(msg);
        }
      };

      Geolocation.requestGeographic(successCallback, errorCallback);
    };

    var Locate = Util.isInApp() ? _HybridLocate : _WebLocate;
    Locate();
  };

  /**
   * 获得周边信息
   * @param callback {Function} 成功时的回调
   * @param erro {Function} 失败时的回调
   */
  Geolocation.requestAroundInfo = function(pos, callback, error) {
    var lng = pos.split(',')[0];
    var lat = pos.split(',')[1];

    var locateSuccessCallback = function(data) {
      if (callback) {
        callback(data);
      }
    };

    var locateErrorCallback = function() {
      if (error) {
        error();
      }
    };

    Geolocation.requestAMapAround(lng, lat, locateSuccessCallback, locateErrorCallback);
  };

  /**
   * 获得关键字查询信息
   * @param callback {Function} 成功时的回调
   * @param erro {Function} 失败时的回调
   */
  Geolocation.requestKeywordInfo = function(keywords, city, callback, error) {
    var locateSuccessCallback = function(data) {
      if (callback) {
        callback(data);
      }
    };

    var locateErrorCallback = function() {
      if (error) {
        error();
      }
    };

    Geolocation.requestAMapKeyword(keywords, city, locateSuccessCallback, locateErrorCallback);
  };

  /*******************************************
   * 保存定位城市的城市名
   * @author ouxz@ctrip.com
   */
  var PositionStore = Geolocation.PositionStore = cBase.Class(cStore, {
    __propertys__: function() {
      this.key = 'POSITION_CITY';
      this.lifeTime = '10M';
    },
    initialize: function($super, options) {
      $super(options);
    }
  });
  /**
   * 获取经过缓存的城市信息
   * @param callback 完成时的回调
   * @param error  报错时的回调
   * @param scope  回调函数执行的上下文环境
   * @author ouxz@ctrip.com
   */
  Geolocation.requestCacheCityInfo = function(callback, error, scope) {
    var posStore = PositionStore.getInstance(),
      posinfo = posStore.get();
    if (posinfo) {
      callback && callback.call(scope, posinfo);
    } else {
      Geolocation.requestCityInfo(function(posinfo) {
        posStore.set(posinfo);
        callback && callback.call(scope, posinfo);
      }, function(msg, e) {
        error && error.call(scope, msg, e);
      });
    }
  };

  /**
   * @author cmli@ctrip.com
   * @description 加入地图功能
   * @param options.lat 定位点的维度
   * @param options.lng 定位点的精度
   * @param options.id  地图容器的id，某个标签的id名称
   * @param options.content 定位点信息
   * @param options.level 地图显示等级[optional]
   * @instance
   *  需要引入的代码
   * <script language="javascript" src="http://webapi.amap.com/maps?v=1.2&key=0b895f63ca21c9e82eb158f46fe7f502"></script>
   */ 
  Geolocation.requestMap = function(options) {

    var WebMap = function(config) {

      // @description 在web环境中，如果缺少AMap对象和定位点信息，直接返回false，标记错误，无法加载地图
      if (!AMap || !config || !config.lat || !config.lng || !config.id) return false;

      var DEFAULT_LEVEL = 13;

      // @description 初始化地图信息
      var mapContainer = new AMap.Map(config.id, {
        center: new AMap.LngLat(config.lng, config.lat),  // @description 地图中心点
        level: config.level || DEFAULT_LEVEL              // @description 地图显示的比例尺级别
      });

      // @description 自定义点标记内容
      var markerContent = document.createElement("div");
      markerContent.className = 'map-content';

      // @description 点标记中的图标
      var markerImg = document.createElement("img");
      markerImg.src = "http://res.m.ctrip.com/html5/Content/images/map_address.png";
      markerContent.appendChild(markerImg);

      // @description 点标记中的文本
      if (config.content) {
        var markerSpan = document.createElement("span");
        markerSpan.innerHTML = config.content;
        markerContent.appendChild(markerSpan);
      };

      // @description 生成标记点，并且设置position
      var marker = new AMap.Marker({
        position: new AMap.LngLat(config.lng, config.lat)
      });

      // @description 更新点标记内容
      marker.setContent(markerContent);

      // @description 设置marker到Map上去
      marker.setMap(mapContainer);
    }

    var HybridMap = function(config) {
      // @description 留下在Hybrid中调用的接口
    }

    // @description 通过Util判断当前环境是App还是Hybrid
    var Map = Util.isInApp() ? HybridMap : WebMap;

    // @description 调用Map显示地图
    Map(options);
  };

    /**
    * @description 写内容到文件
    * @param {double} options.latitude, 纬度2567.     
    * @param {double} options.longitude, 经度2568.     
    * @param {String} options.title, 在地图上显示的点的主标题2569.     
    * @param {String} options.subtitle, 在地图上显示点的附标题
    */
    Geolocation.show_map = function (options) {
        if (!options) {
            throw new Error('function show_map error is "param is null"');
        }
        options.name = Facade.METHOD_SHOW_MAP;
        Facade.request(options);
    };
	
	
	/**
    * @description 在地图上显示多个POI位置点
    */	
	Geolocation.app_show_map_with_POI_list = function(options)
    {
      Facade.request({ name: Facade.METHOD_APP_SHOW_MAP_WITH_POI_LIST, poiList: options.poiList});
    }  

    WidgetFactory.register({
        name: WIDGET_NAME,
        fn: Geolocation
    });
});