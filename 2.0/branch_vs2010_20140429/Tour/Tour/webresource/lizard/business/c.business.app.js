define(['libs', 'cBase', 'AbstractAPP', 'cWidgetFactory', 'cWidgetGuider'], function (libs, cBase, AbstractAPP, WidgetFactory) {

  //l_wang flip手势工具
  (function () {
    var touch = {};
    var down = 'touchstart';
    var move = 'touchmove';
    var up = 'touchend';
    if (!('ontouchstart' in window)) {
      down = 'mousedown';
      move = 'mousemove';
      up = 'mouseup';
    }

    function swipeDirection(x1, x2, y1, y2) {
      return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
    }

    function flip(el, dir, fn, noDefault) {
      if (!el) return;

      el.on(down, function (e) {
        var pos = (e.changedTouches && e.changedTouches[0]) || e;
        touch.x1 = pos.pageX;
        touch.y1 = pos.pageY;

      }).on(move, function (e) {
        //如果view过长滑不动是有问题的
        if (!noDefault) { e.preventDefault(); }
      }).on(up, function (e) {
        var pos = (e.changedTouches && e.changedTouches[0]) || e;
        touch.x2 = pos.pageX;
        touch.y2 = pos.pageY;

        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 10) ||
        (touch.y2 && Math.abs(touch.y1 - touch.y2) > 10)) {
          var _dir = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2);
          if (dir === _dir) {
            typeof fn == 'function' && fn();
          }
        } else {
          //tap的情况
          if (dir === 'tap') {
            typeof fn == 'function' && fn();
          }
        }
      });
    }

    function flipDestroy(el) {
      if (!el) return;
      el.off(down).off(move).off(up);
    }

    $.flip = flip;
    $.flipDestroy = flipDestroy;

  })();


  var Appliction = new cBase.Class(AbstractAPP, {
    __propertys__: function () {

    },

    cleanCache: function () {

      var DEPRECATED_FLIGHT_MAP = [
      // ----------------------------------
      // CLEAR DEPRECATED INFO
        "FLIGHT_SEARCH",
        "FLIGHT_SEARCH_SUBJOIN",
        "FLTINTL_SEARCH",
        "FLIGHT_LIST",
        "FLIGHT_INTER_CITY_LIST",
        "FLIGHT_CITY_LIST",
        "zqInCityInfo",
        "zqInCityDateStore",
        "LastInCitySelectDateTime",
        "LastzqInAirportSelectDateTime",
        "zqInAirportInfo",
        "zqInAirportDateStore",
        "zqInAirportDateAndAddressStore",
        "zqInCityDateAndAddressStore",
        "zqInCitySelectStore",
        "zqInAirportSelectStore",
        "FLIGHT_DETAILS",
        "FLIGHT_DETAILS_PARAM",
        "FLIGHT_ORDERINFO",
        "USER_FLIGHT_ORDERLIST",
        "USER_FLIGHT_ORDERDETAIL",
        "USER_FLIGHT_ORDERPARAM",
        "FLIGHT_RETURNPAGE",
        "FLIGHT_SELECTED_INFO",
        "FLIGHT_PICK_TICKET_SELECT",
        "FLIGHT_AIRLINE",
        "FLIGHT_AIRCTRAFT",
        "FLIGHT_ENUM_TAKETIME",
        "FLIGHT_ENUM_CABINS",
        "FLIGHT_LIST_FILTER",
        "FLIGHT_PICK_TICKET",
        "FLIGHT_PICK_TICKET_PARAM",
        "FLIGHT_AD_TIMEOUT",
      // ----------------------------------
      // CLEAR LIST INFO AND USER INFO
        "P_FLIGHT_TicketList",
        "U_FLIGHT_ORDERLIST",
        "U_FLIGHT_ORDERDETAIL"
      ];

      var map = {
        "flight": DEPRECATED_FLIGHT_MAP
      }

      var array = map[this.channel];

      if (Array.isArray(array)) {
        for (var value in array) {
          window.localStorage.removeItem(value);
        }
      };
    },

    initialize: function ($super, options) {

      $super(options);

      //适配app 张爸爸
      var Guider = WidgetFactory.create('Guider');
      Guider.create();

      //l_wang提升响应速度
      $.bindFastClick && $.bindFastClick();

      //l_wang flip手势工具



      this.cleanCache();
    }

  });
  return Appliction;
});
