define(['libs', 'cBase', 'AbstractAPP', 'cWidgetFactory', 'cWidgetGuider'], function (libs, cBase, AbstractAPP, WidgetFactory) {

  var Appliction = new cBase.Class(AbstractAPP, {
    __propertys__: function () {

    },

    cleanCache: function(){

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
        for(var value in array){
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

      this.cleanCache();
    }

  });
  return Appliction;
});
