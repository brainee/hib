// define(['cModel', 'cBase', 'CarStore', 'cUtility'], function (AbstractModel, cBase, CarStore, cUtility) {
define(['cModel', 'cBase', 'CarStore', 'cWidgetFactory', 'cWidgetGeolocation'], function (AbstractModel, cBase, CarStore, WidgetFactory) {
    var CarModel = CarModel || {};


    /********************************
    * @description:  搜索页城市列表
    * @author:       t.zhou@Ctrip.com
    */
    var AbstractCitysModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = '/CarRental/CityList/Query';
            //this.debug = false;
            //this.url = '/Data/City';
            //this.method = 'get';
            this.param = {
                ver: 0
            };
            this.result = null;
            this.dataformat = function (data) {
                var list = {}, hot = [], citymap = {};
                var cla;
                var cities = data.cities || [];
                for (var i = 0, len = cities.length; i < len; i++) {
                    if (cities[i].hot) {
                        hot.push(cities[i]);
                    }
                    cla = list[cities[i].fstpy.toUpperCase()] || [];
                    cla.push(cities[i]);
                    list[cities[i].fstpy.toUpperCase()] = cla;
                    citymap[cities[i].name] = cities[i];
                }
                return {
                    citymap: citymap,
                    list: list,
                    hot: hot

                };
            };
            this.curcity = CarStore.CurrentCityInfoStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        },
        /*
        * 获得当前城市列表中对应的城市信息
        */
        getCurrentCityInfo: function () {
            var subkey = (this.param && this.param.get && this.param.set) ? JSON.stringify(this.param.get()) : JSON.stringify(this.param);
            this.curcity.setSubKey(subkey);
            return this.curcity.getCurCity();
        },
        /*
        * 保存当前城市列表中对应的城市信息
        */
        setCurrentCityInfo: function (cityinfo) {
            var subkey = (this.param && this.param.get && this.param.set) ? JSON.stringify(this.param.get()) : JSON.stringify(this.param);
            this.curcity.setSubKey(subkey);
            return this.curcity.setCurCity(cityinfo);
        },
        /*
        * 设置当前页面已定位过
        */
        setPosition: function () {
            var subkey = (this.param && this.param.get && this.param.set) ? JSON.stringify(this.param.get()) : JSON.stringify(this.param);
            this.curcity.setSubKey(subkey);
            this.curcity.setPosition();
        },
        /*
        * 判断当前页面是否定位过
        */
        isPosition: function () {
            var subkey = (this.param && this.param.get && this.param.set) ? JSON.stringify(this.param.get()) : JSON.stringify(this.param);
            this.curcity.setSubKey(subkey);
            return this.curcity.isPosition();
        },
        getSubKey: function () {
            return JSON.stringify(this.param);
        }
    });

    /******************************************
    * @description:  搜索页城市列表 : 接机/接火车
    * @author:       t.zhou@Ctrip.com
    */
    CarModel.PickonSearchCitysModel = new cBase.Class(AbstractCitysModel, {
        __propertys__: function () {
            this.param = { drvtype: 2 };
            this.result = CarStore.PickonSearchCitysStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /*****************************************
    * @description:  搜索页城市列表：送机/送火车
    * @author:       t.zhou@Ctrip.com
    */
    CarModel.SeeoffSearchCitysModel = new cBase.Class(AbstractCitysModel, {
        __propertys__: function () {
            this.param = { drvtype: 4 };
            this.result = CarStore.SeeoffSearchCitysStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /****************************************
    * @description:  搜索页城市列表：日租/时租
    * @author:       t.zhou@Ctrip.com
    */
    CarModel.RentSearchCitysModel = new cBase.Class(AbstractCitysModel, {
        __propertys__: function () {
            this.param = { drvtype: 1 };
            this.result = CarStore.RentSearchCitysStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /**************************************
    * @description:  搜索页城市列表：热门线路
    * @author:       t.zhou@Ctrip.com
    */
    CarModel.HotlineSearchCitysModel = new cBase.Class(AbstractCitysModel, {
        __propertys__: function () {
            this.param = { drvtype: 8 };
            this.result = CarStore.HotlineSearchCitysStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**************************************
    * @description:  用车产品列表查询
    * @author:       cmli@Ctrip.com
    */
    CarModel.ProductListModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            //this.debug = true;
            this.url = "/CarRental/ProductList/Query";
            this.param = CarStore.ProductListParamStore.getInstance();
            this.result = CarStore.ProductListStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    CarModel.ProductDetailModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = "/CarRental/Product/Query";
            this.param = CarStore.ProductDetailParamStore.getInstance();
            this.result = CarStore.ProductDetailStore.getInstance();
        },


        initialize: function ($super, options) {
            $super(options);
        }
    });


    /**************************************
    * @description:  送达地点/出发地点查询
    * @author:       cmli@Ctrip.com
    */
    CarModel.GetonGetoffAreaModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = "/CarRental/GetonGetoffArea/Query";
            this.param = {};
            this.result = CarStore.GetonGetoffAreaStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /**************************************
    * @description:  用车城市查询
    * @author:       cmli@Ctrip.com
    */
    CarModel.StationListModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = "/CarRental/StationList/Query";
            this.param = {
                'ver': 0,       //版本
                'dcid': 2,      //城市ID  默认为上海
                'dcname': '上海',   //城市名称
                'stype': '1',   //根据城市ID搜索还是根据城市名称搜索
                'drvtype': 8    //租车类型
            };

            this.result = CarStore.StationListStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /**************************************
    * @description:  用车可用时间查询
    * @author:       cmli@Ctrip.com
    */
    CarModel.AvailTimeModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = "/CarRental/AvailableTime/Query";

            this.param = {
                'ver': 0,  //版本
                'drvtype': 1, //租车类型
                'rtype': 1,  //1日租 2时租
                'rmtype': 0, //包车 Dedicated 拼车 Shared
                'stype': 1,   //
                'stathotinfo': {
                    'dcid': 2, //默认是上海
                    'statype': 22,
                    'stathotid': 33
                },
                'flginfo': {  //数据接口通的时候，需去掉
                    flgno: ''
                }
            };

            this.result = CarStore.AvailTimeStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /*************************************
    * @description:    接机，按航班号获取有效时间
    * @author：        ouxz@ctrip.com
    */
    CarModel.AvailTimeAirNoModel = new cBase.Class(CarModel.AvailTimeModel, {
        __propertys__: function () {
            this.url = "/CarRental/AvailableTime/Query";
            //this.param = {};
            this.param = {
                ver: 0,
                drvtype: 2,
                rmtype: 0, //包车1 Dedicated 拼车2 Shared
                rtype: 0,
                stype: 2,
                stathotinfo: {
                    dcid: 1,
                    statype: 1,
                    stathotid: 112
                },
                flginfo: {
                    flgno: 1324
                }
            };
            this.result = CarStore.AvailTimeAirNoStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /*************************************
    * @description:    接机，按机场车站获取有效时间
    * @author：        ouxz@ctrip.com
    */
    CarModel.AvailTimeStationModel = new cBase.Class(CarModel.AvailTimeModel, {
        __propertys__: function () {
            this.url = "/CarRental/AvailableTime/Query";
            //this.param = {};
            this.param.drvtype = 2; //租车类型 2为接机
            this.param.rtype = 0;   //日租、时租
            this.param.rmtype = 0;  //包车、拼车
            this.param.stype = 1;   //1按机场车站热门线路查询，2按航班号查询
            this.param.stathotinfo = {
                dcid: null,          //用车城市
                stattype: null,       //站点类型
                stathotid: null      //站点id
            };

            this.result = CarStore.AvailTimeStationStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /*************************************
    * @description:    送机，送火车用车时间
    * @author：        ouxz@ctrip.com
    */
    CarModel.AvailTimeSendModel = new cBase.Class(CarModel.AvailTimeModel, {
        __propertys__: function () {
            this.url = "/CarRental/AvailableTime/Query";
            //this.param = {};
            this.param.drvtype = 4; //租车类型 2为接机
            this.param.rtype = 0;   //日租、时租
            this.param.rmtype = 0;  //包车、拼车
            this.param.stype = 1;   //1按机场车站热门线路查询，2按航班号查询
            this.param.stathotinfo = {
                dcid: null,          //用车城市
                statype: null,       //站点类型
                stathotid: null      //站点id
            };

            this.result = CarStore.AvailTimeSendStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**************************************
    * @description:  热门路线可用时间查询
    * @author:       cmli@Ctrip.com
    */
    CarModel.HotlineAvailTimeModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = "/CarRental/AvailableTime/Query";
            this.param = {
                'ver': 0,  //版本
                'drvtype': 8, //租车类型
                'rtype': 0,  //1日租 2时租
                'rmtype': '1', //包车 Dedicated 拼车 Shared
                'stype': 1,   //
                'stathotinfo': {
                    'dcid': 2, //默认是上海
                    'statype': 3,
                    'stathotid': null
                },
                'flginfo': {  //数据接口通的时候，需去掉
                    flgno: ''
                }
            };
            //this.param = CarStore.HotlineAvailTimeParamStore.getInstance();
            this.result = CarStore.HotlineAvailTimeStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**************************************
    * 获取城市信息
    */
    CarModel.getCurrentCityInfo = function (CityListModel, callback, error, scope) {
        var citylistmodel = CityListModel.getInstance(), //城市列表model
            cityliststore = citylistmodel.getResultStore(); //存储城市列表的store

        var cityinfo = citylistmodel.getCurrentCityInfo();
        if (cityinfo) {
            callback && callback.call(scope, cityinfo);
        } else {
            var Geolocation = WidgetFactory.create('Geolocation');

            // cUtility.requestCityInfo(function (data) {
            Geolocation.requestCityInfo(function (data) {
                var cityname = data ? data.city.replace('市', '') : '上海';
                citylistmodel.excute(function () {
                    var cityinfo = cityliststore.getCityInfoByName(cityname);
                    citylistmodel.setCurrentCityInfo(cityinfo);
                    callback && callback.call(scope, cityinfo);
                }, function () {
                    error && error.call(scope);
                }, false);
            }, function (msg) {
                error && error.call(scope, msg);
            });
        }
    };
    /**
    * 
    */
    CarModel.PositionCity = new cBase.Class({
        initialize: function () {
            this.isPositioning = false;
        },
        //开始定位
        startPosition: function (model, callback, error, scope) {
            this.isPositioning = true;
            var self = this;
            CarModel.getCurrentCityInfo(model, function (data) {
                if (self.isPositioning) {
                    var cityInfoStore = CarStore.CurrentCityInfoStore.getInstance();
                    cityInfoStore.setPosition();
                    //是否存在于城市列表内
                    callback && callback.call(scope, data);
                }
            }, function (e) {
                if (self.isPositioning) {
                    var cityInfoStore = CarStore.CurrentCityInfoStore.getInstance();
                    cityInfoStore.setPosition();
                    error && error.call(scope, e);
                }
            }, scope);
        },
        //取消定位
        endPosition: function () {
            this.isPositioning = false;
        }
    });
    
    /***
    *  搜索航班号
    */
    CarModel.SearchFlightNoModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = '/CarRental/FlightsInfo/Query';
            this.param = _.clone({
                'ver': 0,
                'fno': 0,
                'sdate': null
            });
            this.result = CarStore.SearchFlightNoStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    *  机场，车站，热门线路查询基类
    */
    var CarStationListSearchModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {
            this.url = '/CarRental/StationList/Query';
            this.param = _.clone({
                'ver': 0,
                'dcid': null,
                'dcname': '',
                'stype': null,
                'drvtype': null
            });
        },
        initialize: function ($super, options) {
            $super(options);
        },
        setCityName: function (cityname) {
            this.setParam('dcname', cityname);
        },
        setCityId: function (cityid) {
            this.setParam('dcid', cityid);
        }
    });
    /**
    *  接车/接火车--机场车站model
    */
    CarModel.PickonStationListSearchModel = new cBase.Class(CarStationListSearchModel, {
        __propertys__: function () {
            this.param.drvtype = 2;
            this.param.stype = 1;
            this.param.dcname = 'shs';
            this.result = CarStore.PickonStationListStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /**
    *  送车/送火车--机场车站model
    */
    CarModel.SeeoffStationListSearchModel = new cBase.Class(CarStationListSearchModel, {
        __propertys__: function () {
            this.param.drvtype = 4;
            this.param.stype = 1;
            this.param.dcname = 'shs';
            this.result = CarStore.SeeoffStationListStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    return CarModel;
});
