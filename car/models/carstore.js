define(['cStore', 'cBase', 'cUtility'], function (AbstractStore, cBase, cUtility) {
    var CarStore = CarStore || {};
    var UObject = cUtility.Object;
    //pickon : 接机/接火车(按机场车站) seeoff：送机/送火车 rent：日租/时租 hotline：热门线路 air:接机/接火车(按航班号)

    CarStore.ENUM_PAGETYPE_PICKON = 1; //接机、接火车，按机场车站
    CarStore.ENUM_PAEGTYPE_SEEOFF = 2; //送机、送火车
    CarStore.ENUM_PAGETYPE_RENT = 3;   //日租、日租
    CarStore.ENUM_PAGETYPE_HOTLINE = 4; //热门线路
    CarStore.ENUM_PAGETYPE_AIR = 5;    //接机、接火车，按航班号


    //包车
    CarStore.ENUM_RMTYPE_BAO = 1;
    //拼车
    CarStore.ENUM_RMTYPE_PIN = 2;

    /**
    * 页面间回调抽象store
    */
    var AbstractPageCall = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.CONST_TAG = 'tag';
            this.CONST_BACKURL = 'backurl';
            this.CONST_CALLBACK = 'callback';
            this.CONST_CURVALUE = 'curvalue';
        },
        initialize: function ($super, options) {
            $super(options);
        },
        //保存的用户选中的值
        save: function (data) {
            var obj = this.get(), self = this;
            if ($.isArray(obj.callback)) {
                $.each(obj.callback, function (i, v) {
                    self._callFunByStr(v, data);
                });
            } else {
                this._callFunByStr(obj.callback, data);
            }
        },
        /** 
        * 设置当前的配置
        * @param backurl  返回地址
        * @param callback 取到的数据传给那个方法
        * @param curvalue  
        */
        setCurrent: function (tag, backurl, callback, curvalue) {
            var obj = {};
            obj[this.CONST_TAG] = tag;
            obj[this.CONST_BACKURL] = backurl;
            obj[this.CONST_CALLBACK] = callback;
            obj[this.CONST_CURVALUE] = curvalue;
            this.set(obj);
        },
        /**
        * 获得当前的配置
        */
        getCurrent: function () {
            return this.get();
        },
        /**
        * 获得当前的值
        */
        getValue: function (callback) {
          var obj = this.get();
          return obj && this._callFunByStr(obj.curvalue,null,null,callback) || {};
        },
        //通过字符串调用某个类的方法
        _callFunByStr: function (str, data, scope, callback) {
            scope = scope || TaxiStore;
            var minfo = /^(?:(.*)::)?(.*):(.*)$/i.exec(str), Cls, Fun, scopeName;
            if (minfo && minfo.length === 4 && !minfo[1]) {
                Cls = scope[minfo[2]];
                Fun = minfo[3];
                if (Cls && Cls.getInstance) {
                    var result = (Cls.getInstance()[Fun])(data);
                    callback && callback(result);
                    return result;
                }
            } else if (minfo && minfo.length === 4 && minfo[1]) {
                scopeName = minfo[1];
                Cls = minfo[2];
                Fun = minfo[3];
                requirejs([scopeName], function (scope) {
                    if (scope && scope[Cls] && scope[Cls].getInstance) {
                        var instance = scope[Cls].getInstance();
                        var result = instance[Fun] && instance[Fun](data);
                        callback && callback(result);
                    }
                });
            }
            return false;
        }
    });

    /********************************
    * @description:  搜索页城市列表
    * @author:       t.zhou@Ctrip.com
    */
    var AbstractCitysStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
        },
        initialize: function ($super, options) {
            $super(options);
        },
        getCityInfoByName: function (cityname) {
            var citys = this.get();
            return citys && citys.citymap && citys.citymap[cityname];
        }
    });

    /******************************************
    * @description:  搜索页城市列表 : 接机/接火车
    * @author:       t.zhou@Ctrip.com
    */
    CarStore.PickonSearchCitysStore = new cBase.Class(AbstractCitysStore, {
        __propertys__: function () {
            this.key = 'P_CAR_PICKON_SEARCH_CITYS';
            this.lifeTime = '15D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /******************************************
    * @description:  营销
    * @author:       hjgong@Ctrip.com
    */

    CarStore.KeyWordMarketingModel = new cBase.Class(AbstractCitysStore, {
        __propertys__: function () {
            this.key = 'P_CARKeyWordMarketingModel';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });



    /*****************************************
    * @description:  搜索页城市列表：送机/送火车
    * @author:       t.zhou@Ctrip.com
    */
    CarStore.SeeoffSearchCitysStore = new cBase.Class(AbstractCitysStore, {
        __propertys__: function () {
            this.key = 'P_CAR_SEEOFF_SEARCH_CITYS';
            this.lifeTime = '15D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /****************************************
    * @description:  搜索页城市列表：日租/时租
    * @author:       t.zhou@Ctrip.com
    */
    CarStore.RentSearchCitysStore = new cBase.Class(AbstractCitysStore, {
        __propertys__: function () {
            this.key = 'P_CAR_RENT_SEARCH_CITYS';
            this.lifeTime = '15D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**************************************
    * @description:  搜索页城市列表：热门线路
    * @author:       t.zhou@Ctrip.com
    */
    CarStore.HotlineSearchCitysStore = new cBase.Class(AbstractCitysStore, {
        __propertys__: function () {
            this.key = 'P_CAR_HOTLINE_SEARCH_CITYS';
            this.lifeTime = '15D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**************************************
    * @description:  搜索页城市列表：历史城市
    * @author:       t.zhou@Ctrip.com
    */
    CarStore.HistorySearchCitysStore = new cBase.Class(AbstractCitysStore, {
        __propertys__: function () {
            this.key = 'U_CAR_HISTORY_SEARCH_CITYS';
            this.lifeTime = '15D';
            this.defaultData = {
                inter: [],
                inland: []
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  出发/送达地点选择
    * @author:       t.zhou@Ctrip.com
    */
    CarStore.GetonGetoffAreaStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_PICKON_GETOFF_AREA';
            this.lifeTime = '15D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /******************************************
    * @description:  出发/送达地点选择 : 历史地点
    * @author:       t.zhou@Ctrip.com
    */
    CarStore.HistoryGetonGetoffStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'U_CAR_HISTORY_GETONGETOFF_AREA';
            this.lifeTime = '15D';
        },
        initialize: function ($super, options) {
            $super(options);
        },

        addHistory: function (data) {
            var addr = data.addr;
            if (addr) {
                var addrObj = {
                    id: null,
                    dsp: addr
                }
                var _list = this.get() || [];
                var _index = -1;
                for (var i = 0, len = _list.length; i < len; i++) {
                    if (_list[i].dsp == addrObj.dsp) {
                        _index = i;
                        break;
                    }
                }
                if (_index >= 0) {
                    _list.splice(_index, 1);
                }
                _list.unshift(addrObj);
                _list.splice(5, _list.length); //5为最大长度

                this.set(_list);
            }
        }
    });

    /****************************************
    * @description:  car orderid
    * @author:       richardgong@Ctrip.com
    */

    CarStore.carOrderId = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_ORDERID';
            this.lifeTime = '5H';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    var ParamDefaultData = {
        pagetype: '',
        ver: 0,         // 版本号               int
        usedt: (new cBase.Date(cBase.getServerDate())).format('Y-m-d H:i:s'),      // 使用日期             DateTime
        usedur: 0,      // 用车时长             int
        drvtype: 1,    // 租车产品类型         Enum
        rtype: 1,      // 日租/时租            Enum          
        rmtype: 1,     // 包车/拼车            Enum
        stype: 1,      // 查询类型             Enum
        // 按站点查询的参数对象
        stathotinfo: {
            dcid: 2,      // 出发城市ID           int  默认上海
            cityname: '上海',
            stattype: 0,  // 机场/火车站/热门线路 int
            statid: 0    // 站点类型             int
        },
        //站点名称
        statname: '',
        // 按航班号查询参数对象
        flginfo: {
            flgno: ''   // 航班号
        },
        editfield: {
            cityid: '',
            cityname: ''
        },
        //用户是否选择过
        isselcity: false,
        //城市类型
        citytype: ''
    };
    /********************************
    * @description:  用车产品列表查询参数Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.ProductListParamStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'S_CAR_PRODUCT_LIST_PARAM';
            this.lifeTime = '15D';
            this.defaultData = JSON.parse(JSON.stringify(ParamDefaultData));
        },
        initialize: function ($super, options) {
            $super(options);
        },
        //保存当前store数据到ProductListParamStore，在搜索页提交时使用
        save: function () {
            this.setAttr('times', +new Date());
            var data = this.get();
            CarStore.ProductListParamStore.getInstance().set(data);
        },
        savePositionCity: function (cityname, cityid) {

        },
        getCity: function () {
            var cityname = this.getAttr('stathotinfo.cityname'),
                cityid = this.getAttr('stathotinfo.dcid'),
                citytype = this.getAttr('citytype');
            return {
                cityname: cityname,
                cityid: cityid,
                citytype: citytype
            };
        },
        //选择城市时要设置的字段，选择城市时使用
        setEditField: function (cityname, cityid) {
            this.setAttr('editfield', {
                cityname: cityname,
                cityid: cityid
            });
        },
        //获得要设置的字段映射，选择城市时使用
        getEditField: function (key) {
            return this.getAttr('editfield');
        },
        /* 保存要映射的值，选择城市时使用
        */
        saveFieldVal: function (cityname, cityid, citytype) {
            var map = this.getAttr('editfield');
            if (cityname && map.cityname) this.setAttr(map.cityname, cityname);
            if (cityid && map.cityid) this.setAttr(map.cityid, cityid);
            this.setAttr('citytype', citytype);
            //将当前状态设置为选中
            this.setSelcity();
        },
        //用户是否自行选择过城市
        isSelcity: function () {
            return this.getAttr('isselcity');
        },
        //设置当前已选择城市
        setSelcity: function () {
            this.setAttr('isselcity', true);
        }
    });

    /**
    * @description: 接：按航班号查询页
    * @author: ouxz@ctrip.com 
    */
    CarStore.AirNoSearchParam = new cBase.Class(CarStore.ProductListParamStore, {
        __propertys__: function () {
            this.key = 'S_CAR_PICKON_SEARCH_PARAM_AIR';
            this.defaultData = JSON.parse(JSON.stringify(ParamDefaultData));
            this.defaultData.pagetype = CarStore.ENUM_PAGETYPE_AIR;
            this.defaultData.drvtype = 2; //接机
            this.defaultData.rmtype = 1;    //包车,拼车
            this.defaultData.rtype = 2;
            this.defaultData.stype = 2; //按航班号查询
            this.defaultData.usedt = '';
            this.defaultData.flginfo.flgno = '';
            this.defaultData.stathotinfo = {};

        },
        initialize: function ($super, options) {
            $super(options);
        },
        //设置定航班号 
        setAirNo: function (AirNo, usedt) {
            this.setAttr({
                'flginfo': {
                    flgno: AirNo
                }
            });
            usedt && this.setAttr('usedt', usedt);
        }
    });

    /********************************
    * @description      接机按机场/车站
    * @author:          ouxz@ctrip.com
    */
    CarStore.PortSearchParam = new cBase.Class(CarStore.ProductListParamStore, {
        __propertys__: function () {

            this.key = 'S_CAR_PICKON_SEARCH_PARAM_PORT';
            this.defaultData = JSON.parse(JSON.stringify(ParamDefaultData));
            this.defaultData.pagetype = CarStore.ENUM_PAGETYPE_PICKON;
            this.defaultData.drvtype = 2; //接机
            this.defaultData.rmtype = 1;    //包车,拼车
            this.defaultData.rtype = 2;
            this.defaultData.stype = 1; //按机场车站查询
            this.defaultData.usedt = '';
            this.defaultData.flginfo.flgno = '';

        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  送机送火车查询参数Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.SeeoffParamStore = new cBase.Class(CarStore.ProductListParamStore, {
        __propertys__: function () {
            this.key = 'S_CAR_SEEOFF_PARAM';
            this.defaultData = JSON.parse(JSON.stringify(ParamDefaultData));
            this.defaultData.pagetype = CarStore.ENUM_PAEGTYPE_SEEOFF;
            this.defaultData.drvtype = 4;   //接机
            this.defaultData.rmtype = 1;    //包车,拼车
            this.defaultData.stype = 1;     //按机场/车站
            this.defaultData.rtype = 0;
            this.defaultData.flginfo.flgno = '';

        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  日租时租查询参数Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.RentParamStore = new cBase.Class(CarStore.ProductListParamStore, {
        __propertys__: function () {
            this.key = 'S_CAR_RENT_PARAM';
            this.defaultData = JSON.parse(JSON.stringify(ParamDefaultData));
            this.defaultData.pagetype = CarStore.ENUM_PAGETYPE_RENT;
            this.defaultData.usedt = '';
            this.defaultData.rmtype = 1;
            this.defaultData.stathotinfo = {};
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  热门线路查询参数Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.HotlineParamStore = new cBase.Class(CarStore.ProductListParamStore, {
        __propertys__: function () {
            this.key = 'S_CAR_HOTLINE_PARAM';
            this.defaultData = JSON.parse(JSON.stringify(ParamDefaultData));
            this.defaultData.pagetype = CarStore.ENUM_PAGETYPE_HOTLINE;
            this.defaultData.usedt = '';
            this.defaultData.drvtype = 8;
            this.defaultData.rtype = 0;
            this.defaultData.routeName = '';

            this.defaultData.stathotinfo = {
                dcid: 2,      // 出发城市ID           int  默认上海
                stattype: 3,  // 机场/火车站/热门线路 int
                statid: ''    // 站点类型             int
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /********************************
    * @description:  用车产品列表Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.ProductListStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_PRODUCT_LIST';
            this.lifeTime = '15D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车产品详情查询参数Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.ProductDetailParamStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'S_CAR_PRODUCT_DETAIL_PARAM';
            this.lifeTime = '24H';
            this.defaultData = {
                ver: 1,         // 版本         int
                pid: 1,         // 产品编号     int
                dcid: 1,        // 用车城市ID   int
                usedate: '',    // 用车时间     DateTime
                usedur: 1,      // 用车时长     int
                oid: 01010
            }
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车产品详情Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.ProductDetailStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_PRODUCT_DETAIL';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  未出行航班Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.NoTravelFlightListStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_NO_TRAVEL_FLIGHT_LIST';
            this.lifeTime = '30M';

        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  订单信息参数Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.BookingParamStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'S_CAR_BOOKING_PARAM';
            this.defaultData = {
                "useCount": 1
            };
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        },

        setAddr: function (data) {
            this.setAttr(TaxiStore.AddressStore.getInstance().getCurrent().tag.field, data.addr || data.name);
        },
        setInvinfoAddr: function (data) {
            this.setAttr('invinfo.addr', data);
        },
        setInvinfoDisplayValue: function () {
            return this.getAttr('invinfo.addr');
        },
        setDisplayValue: function () {
            var obj = this.get();
            var cityname = CarStore.ProductListParamStore.getInstance().getAttr('stathotinfo.cityname');
            return {
                city: cityname,
                area: this.getAttr(TaxiStore.AddressStore.getInstance().getCurrent().tag.field)
            };
        }
    });

    CarStore.AddressStore = new cBase.Class(AbstractPageCall, {
        __propertys__: function () {
            this.key = 'P_CAR_ADDRESS';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车订单列表Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.OrderListStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_ORDER_LIST';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车订单完成Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.OrderCompleteStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_ORDER_COMPLETE';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车订单详情Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.OrderDetailStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_ORDER_DETAIL';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /********************************
    * @description:  
    * @author:       cmli@Ctrip.com
    */
    CarStore.OrderDetailParamStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'S_CAR_ORDER_DETAIL_PARAM_STORE';
            this.lifeTime = '30M';
            this.defaultData = {
                "oid": '',
                "var": 0
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  
    * @author:       richardgong@Ctrip.com
    */
    CarStore.cancelOrderStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_CANCEL_ORDER_STORE';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  
    * @author:       richardgong@Ctrip.com
    */
    CarStore.refundOrderStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_REFUND_ORDER_STORE';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  送达地点/出发地点Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.GetonGetoffAreaStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_GETON_GETOFF_AREA';
            this.lifeTime = '2D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车城市Store
    * @author:       cmli@Ctrip.com
    */
    CarStore.StationListStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_STATION_LIST';
            this.lifeTime = '1D';
            this.defaultData = {
                "dcid": 2,
                "dcname": "上海",
                "StationAndHotLineList": [{
                    "stattype": 1,        //站点类型
                    "stathotinfo": ""     //车站/机场/热门线路的ID和名称
                }, {
                    "stattype": 1,        //站点类型
                    "stathotinfo": ""     //车站/机场/热门线路的ID和名称
                }]
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车可用时间store 按航班号查询可用时间
    * @author:       cmli@Ctrip.com
    */
    CarStore.AvailTimeStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_AVAIL_TIME';
            //this.lifeTime = '1D';
            //this.lifeTime = '30S';
            //this.lifeTime = '10S';
            this.lifeTime = '100D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /********************************
    * @description:  用车可用时间store 按航班号查询可用时间
    * @author:       cmli@Ctrip.com
    */
    CarStore.AvailTimeAirNoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_AIRNO_AVAIL_TIME';
            this.lifeTime = '30S';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    /********************************
    * @description:  热门路线可用时间store
    * @author:       cmli@Ctrip.com
    */
    CarStore.HotlineAvailTimeStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_HOTLINE_AVAIL_TIME';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    //当前城市Store
    CarStore.CurrentCityInfoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'U_CAR_CURRENT_CITYINFO';
            /*
            * 这里通过subkey来区分不同来自不同城市列表的定位城市
            */
            this.subkey = null;
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        },
        setSubKey: function (subkey) {
            this.subkey = subkey;
        },
        //是否定位过
        isPosition: function () {
            return this.getAttr(this.subkey + '.ispos');
        },
        //设置为定位过
        setPosition: function () {
            this.setAttr(this.subkey + '.ispos', true);
        },
        //获得当前城市
        getCurCity: function () {
            var info = this.getAttr(this.subkey);
            if (info && info.ispos && info.name) return info;
            return null;
        },
        //设置当前城市
        setCurCity: function (cityinfo) {
            this.setAttr(this.subkey, cityinfo);
        }
    });

    //查找航班历史记录Store
    CarStore.FlightHistoryStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'U_CAR_ADDRESS_HISTORY_LIST';
            this.lifeTime = '1D';
        },
        initialize: function ($super, options) {
            $super(options);
        },
        add: function (flightobj) {
            var flgno = UObject.get(flightobj, 'fno'), list = this.get() || [];
            if (flgno !== null && list !== null) {
                for (var i = 0; i < list.length; i++) {
                    if (UObject.get(list[i], 'fno') === flgno) {
                        list.splice(i, 1);
                    }
                }

                list.unshift(flightobj);
                list.splice(5, list.length); //5为最大长度

                //list.push(flightobj);
                this.set(list);
            }
        },
        del: function (flgno) {
            var list = this.get(), flag = false;
            for (var i = 0; i < list.length; i++) {
                if (UObject.get(list[i], 'fno') === flgno) {
                    list.splice(i, 1);
                    flag = true;
                }
            }
            if (flag) this.set(list);
        }
    });


    /********************************
    * @author: yhjia@Ctrip.com
    * @description: 当常用地址的选择需要区分页面和所选择的字段的时候，我们需要
    *   用一个全局的store来标记所选择的地址信息，这个store里面存有页面和调用字段等信息。
    *
    *   每一个meta包含三个信息：
    *       - curPage 用来标记当前页
    *       - retPage 用来标记完成跳转页
    *       - field   用来标记调出地址页的字段名
    * @usage: 
    *   主调页面需要set()上面的几个值来确定需要记录选择地址的标记，然后在回显
    *   页面里面用matchField来判断当前的字段是否是刚选的字段，然后用getSelMetaId()来取
    *   得需要读取的地址meta标记,  然后去CustomerAddrStore取值
    */
    CarStore.AddrSelMetaStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'CAR_ADDR_SEL_META_DATA';
            this.lifeTime = '30D';
        },
        initialize: function ($super, options) {
            $super(options);
        },

        matchField: function (field, curPage, retPage) {
            var meta = this.get();
            if (!meta || !meta.field || !meta.curPage || !meta.retPage)
                return false;

            return meta.field === field
                && meta.curPage === curPage
                && meta.retPage == retPage;
        },

        getSelMetaId: function () {
            var meta = this.get();
            return [meta.field, meta.curPage, meta.retPage].join('-');
        }
    });





    /**
    * =================客户使用地址
    */
    CarStore.CustomerAddrStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'U_CAR_CUSTOMER_ADDR';
            this.lifeTime = '30M';
            this.defaultData = {
                "addr": "",
                "addrId": 1,
                "cty": "",
                "destCtyId": 1,
                "dstr": "",
                "dstrId": 1,
                "edTime": "",
                "fee": 0,
                "gua": false,
                "ldTime": "",
                "mphone": "",
                "phone": "",
                "port": "",
                "prvn": "",
                "recipient": "",
                "rmk": "",
                "type": 1,
                "zip": "",
                'prvnId': '',
                'inforId': 0,
                "ctyName": "",
                "dstrName": "",
                "prvnName": ""
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


    CarStore.OperAddrStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'U_CAR_OPER_ADDR';
            this.lifeTime = '30M';
            this.defaultData = {
                'recipient': '',
                'addr': '',
                'zip': '',
                'prvnId': '',
                'prvnName': '',
                'ctyName': '',
                'dstrName': '',
                'inforId': 0
            };
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /**
    *  机场，车站，热门线路store
    */
    var CarStationListStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /**
    *  接机/接火车--机场/车站store
    */
    CarStore.PickonStationListStore = new cBase.Class(CarStationListStore, {
        __propertys__: function () {
            this.key = 'P_CAR_PICKON_STATION_LIST';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /**
    *  送机/送火车--机场/车站store
    */
    CarStore.SeeoffStationListStore = new cBase.Class(CarStationListStore, {
        __propertys__: function () {
            this.key = 'P_CAR_SEEOFF_STATION_LIST';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /**
    * 常用地址选择页面传输通道
    */
    CarStore.CommonAddress = new cBase.Class(AbstractPageCall, {
        __propertys__: function () {
            this.key = 'P_COMMON_ADDRESS_SELECTED';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * 保存接机接火车按机场车站用车时间
    */
    CarStore.AvailTimeStationStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_AVAIL_TIME_STATION';
            this.lifeTime = '10S';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });
    /**
    * 保存送机送火车用车时间
    */
    CarStore.AvailTimeSendStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_AVAIL_TIME_SEND';
            this.lifeTime = '10S';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    /**
    * 发票页面store
    */
    CarStore.ReceiptStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_RECEIPT_STORE';
            this.lifeTime = '30M';
        },
        initialize: function ($super, options) {
            $super(options);
        },

        setAddr: function (data) {
            this.setAttr(CarStore.AddressStore.getInstance().getCurrent().tag, data);
        },

        setDisplayValue: function () {
            return this.getAttr(CarStore.AddressStore.getInstance().getCurrent().tag);
        }
    });

    /**
    * 查找航班
    */
    CarStore.SearchFlightNoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_CAR_SEARCH_FLIGHTNO';
            this.lifeTime = '30M';
            /*this.defaultData = {
            flights: [
            {
            fno: 'MU5138',
            airname: '东航',
            dcity: '北京',
            acity: '上海',
            dport: '首都机场',
            aport: '虹桥机场',
            dterm: '1号航站楼',
            aterm: '2号航站楼',
            dtime: '2013/11/11 10:10:11',
            atime: '2013/11/11 12:10:11'
            }
            ]
            };*/
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    return CarStore;
});
