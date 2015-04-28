// ------------------------------
// 送机/送火车
// ------------------------------
define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('seeoff.html')], function (libs, c, CarModel, CarStore, BasePageView, viewhtml) {
    /********************************
     * @description:  各种订单完成页进入用车频道的url参数store only for app
     * @author:       lh_sun@Ctrip.com
     */
    var hybridH5URLParamStore = CarStore.HybridH5URLParamStore.getInstance();
    //包车
    var ENUM_RMTYPE_BAO = 1, ENUM_RMTYPE_PIN = 2;  //拼车
    var cBase = c.base, cDate = cBase.Date;
    //上一页
    var lastPage;
    var View = BasePageView.extend({
        pageid: '214259',
        hasAd: true,
        SeeoffParam: CarStore.SeeoffParamStore.getInstance(),
        //用车时间model
        AvailTimeSendModel: CarModel.AvailTimeSendModel.getInstance(),
        //用车时间store
        AvailTimeSendStore: CarStore.AvailTimeSendStore.getInstance(),
        //机场车站列表model
        StationListSearchModel: CarModel.SeeoffStationListSearchModel.getInstance(),
        //当前城市model
        positioncity: new CarModel.PositionCity(),
        //当前城市store
        CurrentCityInfoStore: CarStore.CurrentCityInfoStore.getInstance(),
        //机场,车站列表
        stationlist: null,
        //使用时间
        usetimelist: null,
        rmmap: null,
        //当前网络是否挂掉
        isNetdown: false,
        render: function () {
            this.$el.html(viewhtml);
            this.els = {
                acityname: this.$el.find('.acityname'),
                aterm: this.$el.find('.aterm'),
                dcity: this.$el.find('.dcity'),
                renttype: this.$el.find('.rentcartype span'),
                baoche: this.$el.find('.baoche'),
                pinche: this.$el.find('.pinche'),
                times: this.$el.find('.times')
            };
        },
        events: {
            'click .selectcity': 'toSelectCityList',
            'click .selectport': 'selectStation',
            'click .usedatebox': 'chooseUseDate',
            'click #c-seeoff-query': 'tolistAction',
            'click .rentcartype span': 'switchRentType',
            'click .selectcity': 'toSelectCityList'
        },
        tolistAction: function () {
            if (this.verifyFrom()) {
                this.SeeoffParam.save();
                this.forward('list');
            }
        },

        getAppUrl: function () {
            var plps = this.SeeoffParam.get();
            return $.param(plps);
        },

        selectStation: function () {
            if (this.stationlist && this.stationlist.length) {
                this.showStation(this.stationlist);
            } else {
                this.showLoading();
                setTimeout($.proxy(function () {
                    this.showToast('加载失败，请重试');
                    this.hideLoading();
                }, this), 500);
            }
        },
        toSelectCityList: function () {
            this.SeeoffParam.setEditField('stathotinfo.cityname', 'stathotinfo.dcid');
            this.forward('selectcity!seeoff');
        },
        toflightAction: function () {
            this.forward('pickonair');
        },
        tolistAction: function () {
            this.showLoading();
            this.verifyFrom(function () {
                this.SeeoffParam.save();
                this.hideLoading();
                this.forward('list');
            }, function (msg) {
                this.hideLoading();
                this.showToast(msg);
            });
        },
        verifyFrom: function (callback, error) {
            if (this.isNetdown) {
                error && error.call(this, '加载失败，请重试');
                this.hideLoading();
                return false;
            }
            var param = this.SeeoffParam.get();
            if (!param.usedt) {
                error && error.call(this, '请选择用车时间');
                this.hideLoading();
                return false;
            }
            //todo 需要加逻辑
            if (!param.stathotinfo.statid || !param.stathotinfo.dcid) {
                error && error.call(this, '请选择机场或车站');
                this.hideLoading();
                return false;
            }
            var qparam = {
                'stathotinfo.dcid': param.stathotinfo.dcid,
                'stathotinfo.statype': param.stathotinfo.stattype,
                'stathotinfo.stathotid': param.stathotinfo.statid
            };
            var rmtype = parseInt(param.rmtype);
            this.requestDates(qparam, function (dates) {
                this.hideLoading();
                var times = dates && dates.times || [];
                var dmap = {};
                _.each(times, function (item) { dmap[item.rmtype] = item; });
                if ((!dmap[ENUM_RMTYPE_BAO] || !dmap[ENUM_RMTYPE_BAO].isavail) && (!dmap[ENUM_RMTYPE_PIN] || !dmap[ENUM_RMTYPE_PIN].isavail)) {
                    error && error.call(this, '该城市暂无用车服务');
                    this.hideLoading();
                    return;
                }
                var cur = dmap[rmtype];
                if (rmtype === ENUM_RMTYPE_BAO && !cur.isavail) {
                    error && error.call(this, '该城市暂无包车服务');
                    this.hideLoading();
                    return;
                }
                if (rmtype === ENUM_RMTYPE_PIN && !cur.isavail) {
                    error && error.call(this, '该城市暂无拼车服务');
                    this.hideLoading();
                    return;
                }
                var stime = cDate.parse(cur.stime, true),
                    etime = cDate.parse(cur.etime, true),
                    usedt = cDate.parse(param.usedt, true);
                if (usedt < stime || usedt > etime) {
                    error && error.call(this, '现在可预订' + cDate.format(stime, 'm月d日H:i') + '后的用车请调整用车时间');
                    this.hideLoading();
                    return;
                }
                console.log(stime, etime, usedt);
                callback && callback.call(this);
            }, function () {
                error && error.call(this, '加载失败，请重试');
                this.hideLoading();
            });
            return true;
        },
        switchRentType: function (e) {
            var dom = $(e.currentTarget),
                self = this,
                type = dom.attr('data-type');
            if (dom.hasClass('nocar')) {
                return
            }

            function doCheck() {
                self.els.renttype.removeClass('current');
                dom.addClass('current');
                self.SeeoffParam.setAttr('rmtype', type);
                self.updateUseDate();
            }

            var availTimeStore = this.AvailTimeSendStore.get();
            if (!availTimeStore || !availTimeStore.times) {
                //当获取失败的时候，重新获取
                this.AvailTimeSendStore.remove();
                this.requestStatDate(function () {
                    doCheck();
                }, function () {
                    self.showToast('加载失败，请重试', 2); // 全局加载失败处理
                });
                return;
            } else {
                doCheck();
            }


        },
        goBack: function () { },
        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },
        onLoad: function (lastview) {

            lastPage = lastview;
            this.clearParam(lastview);
            this.updateHeader();
            this.turning();

            /********************************
             * @description:  各种订单完成页进入用车频道的url参数store only for app
             * @author:       lh_sun@Ctrip.com
             */

            var hhps = hybridH5URLParamStore.get() || {};

            if (cBase.isInApp()) {
                //app里面需要判断是否带有参数，如果带有参数的话，先获取城市ID，然后再拉数据
                //if (lastview === 'index' && hybridH5URLParamStore.getAttr('dcityname') && hybridH5URLParamStore.getAttr('dtime')) {
                if (lastview === 'index' && hhps.dcityname && hhps.dtime) {
                    var self = this;
                    var citylistmodel = CarModel.PickonSearchCitysModel.getInstance(), //城市列表model
                        cityliststore = citylistmodel.getResultStore(); //存储城市列表的store
                    var acityname = hhps.dcityname;
                    var cityname = acityname.replace('市', '');
                    citylistmodel.excute(function () {
                        var cityinfo = cityliststore.getCityInfoByName(cityname);
                        citylistmodel.setCurrentCityInfo(cityinfo);
                        if (cityinfo) {
                            self.els.acityname.html(cityinfo.name);
                            self.SeeoffParam.setAttr('stathotinfo.dcid', cityinfo.id);
                            self.SeeoffParam.setAttr('stathotinfo.cityname', cityinfo.name);
                            self.updatePageData();
                        } else {
                            //获取城市ID失败的话，走正常的业务逻辑
                            self.normalGetData();
                        }

                    }, function () {
                        //获取城市ID失败的话，走正常的业务逻辑
                        self.normalGetData();
                    }, false);
                } else {
                    //如果hybrid传过来的不是正常值的话，走正常的业务逻辑
                    this.normalGetData();
                }

            } else {
                //H5里面走正常的业务逻辑
                this.normalGetData();

            }


        },
        normalGetData: function () {
            //用户是否手动选择过城市
            var sop = this.SeeoffParam.get() || {};
            if (!this.SeeoffParam.isSelcity() && sop.stathotinfo.cityname && sop.stathotinfo.cityname == '上海') {
                //默认为上海
                this.els.acityname.html('上海');
                this.SeeoffParam.setAttr('stathotinfo.dcid', 2);
                this.positioncity.startPosition(CarModel.SeeoffSearchCitysModel, function (data) {
                    //增加 data 是否 null 判断 2013-10-19 caofu
                    if (data) {
                        this.els.acityname.html(data.name);
                        this.SeeoffParam.setAttr('stathotinfo.dcid', data.id);
                        this.SeeoffParam.setAttr('stathotinfo.cityname', data.name);
                    }
                    this.updatePageData();
                }, function (e) { }, this);
            }
            this.updatePageData();
        },
        clearParam: function (lastview) {
            if (lastview === 'list') {
                this.SeeoffParam.setAttr({
                    'rmtype': null,
                    'stathotinfo.stattype': null,
                    'stathotinfo.statid': null,
                    'stathotinfo.index': null
                });
            }
        },
        updateHeader: function () {
            //对HeaderView设置数据
            this.headerview.set({
                title: '送机/送火车',
                back: true,
                view: this,
                tel: { number: '4000086666' },
                home: true,
                events: {
                    returnHandler: function () {
                        this.back('index');
                    },
                    homeHandler: function () {
                        this.jump('/html5/');
                    }
                }
            });

            // 将HeaderView显示出来
            this.headerview.show();
        },
        showStation: function (data) {
            data = data || [];
            var self = this;
            //var index = this.SeeoffParam.getAttr('stathotinfo.index');
            var index = this.SeeoffParam.get().stathotinfo.index;
            var radiolist = this.myradiolist = new c.ui.ScrollRadioList({
                title: '机场/车站',
                index: index,
                data: data,
                disItemNum: 4,
                itemClick: function (item) {
                    console.log(item);
                    self.SeeoffParam.setAttr({
                        'stathotinfo.statype': item.data.statype,
                        'stathotinfo.index': item.index,
                        'stathotinfo.stattype': item.data.statype,
                        'stathotinfo.statid': item.data.stathotinfo.typ,
                        'statname': item.key
                    });
                    self.requestStatDate();
                    self.els.aterm.html(item.key);
                }
            });
            radiolist.show();
        },
        LoadPageOther: function () {
            this.requestStatDate(function () {
            }, function () {
                //bug:36248
                if (!window.__CAR_SELECT_CITY_WARNING) {
                    this.showToast('加载失败，请重试', 2); // 全局加载失败处理
                } else {
                    window.__CAR_SELECT_CITY_WARNING = false;
                }
            });
        },
        //获取所有数据
        requestStatDate: function (callback, error) {
            /********************************
             * @description:  BUG 43007  IOS APP 日租时租里面，this.SeeoffParam.getAttr('xx.xx')在某些情况下会获取错误
             * @author     :  lh_sun@Ctrip.com
             * @date       :  2013-12-27
             */
            var seeOffParam = this.SeeoffParam.get() || {};
            var stathotinfo = seeOffParam.stathotinfo || {};
            var cityid = stathotinfo.dcid || '';
            var statid = stathotinfo.statid || '';


            //var cityid = this.SeeoffParam.getAttr('stathotinfo.dcid');
            //增加 this.SeeoffParam.getAttr('stathotinfo.statid') 是否 null 判断 2013-10-19 caofu
            //var statid = this.SeeoffParam.getAttr('stathotinfo.statid');
            var stathotid = statid ? +statid : 0;
            this.requestStations(cityid, function (stats) {
                var curstat, index;
                //增加 stats && stats.stathotinfo 是否 null 判断 2013-10-19 caofu
                if (stats && stats.stathotinfo) {
                    $.each(stats.stathotinfo, function (i, item) {
                        if (stathotid === item.stathotinfo.typ) {
                            index = i;
                            curstat = item;
                        }
                    });
                    if (!index) {
                        curstat = stats.stathotinfo[0];
                        index = 0;
                    }
                    this.setStationData(stats, curstat, index);
                }
                //当存在有当前选中时，加载时间选项
                if (curstat && curstat.stathotinfo) {
                    var param = {
                        'stathotinfo.dcid': +cityid,
                        'stathotinfo.statype': curstat.statype,
                        'stathotinfo.stathotid': curstat.stathotinfo.typ
                    };
                    this.SeeoffParam.setAttr({
                        'stathotinfo.dcid': +cityid,
                        'stathotinfo.stattype': curstat.statype,
                        'stathotinfo.statid': curstat.stathotinfo.typ,
                        'stathotinfo.index': index
                    });
                    this.requestDates(param, function (dates) {
                        //更新出行方式
                        this.updateTripModeState(dates && dates.times || []);
                        //更新用车时间
                        this.updateUseDate(dates && dates.times || []);
                        callback && callback.call(this);
                    }, function () {
                        this.setInvalidState(3);
                    });
                } else {
                    this.SeeoffParam.setAttr({
                        'stathotinfo.stattype': '',
                        'stathotinfo.statid': '',
                        'stathotinfo.index': ''
                    });
                    //将所有的出行方式和用车时间
                    this.setInvalidState(3);
                    error && error.call(this);
                }

            }, function () {
                this.setInvalidState(3);
                error && error.call(this);
                this.setStationData();
            });
        },
        setInvalidState: function (tags) {
            if (tags & 1) {
                this.els.baoche.removeClass('current').addClass('nocar').html('包车');
                this.els.pinche.removeClass('current').addClass('nocar').html('拼车');
            }
            if (tags & 2) {
                this.els.times.addClass('invaild').html('请选择用车时间');
            }
            if (tags & 4) {
                this.els.aterm.html('请选择机场车站');
            }
        },
        //更新出行方式
        updateTripModeState: function (dates) {
            //var rmtype = parseInt(this.SeeoffParam.getAttr('rmtype') || 0);
            var rmtype = parseInt(this.SeeoffParam.get().rmtype || 0);
            var rmmap = this.rmmap = (function (dates) {
                var map = {};
                for (var i = 0; i < dates.length; i++) {
                    if (dates[i].isavail) map[dates[i].rmtype] = dates[i];
                }
                return map;
            })(dates);
            //是否支持包车
            if (rmmap[ENUM_RMTYPE_BAO]) {
                this.els.baoche.removeClass('nocar').html('包车');
            } else {
                this.els.baoche.addClass('nocar').html('暂无包车');
            }
            //是否支持拼车
            if (rmmap[ENUM_RMTYPE_PIN]) {
                this.els.pinche.removeClass('nocar').html('拼车');
            } else {
                this.els.pinche.addClass('nocar').html('暂无拼车');
            }
            //选中标签
            rmtype = rmtype || 1;
            if (ENUM_RMTYPE_BAO === rmtype) {
                if (rmmap[rmtype]) {
                    rmtype = ENUM_RMTYPE_BAO;
                } else {
                    rmtype = ENUM_RMTYPE_PIN;
                }
            }
            if (ENUM_RMTYPE_PIN === rmtype) {
                if (rmmap[rmtype]) {
                    rmtype = ENUM_RMTYPE_PIN;
                } else {
                    //rmtype = 0;
                    rmtype = 1;
                }
            }
            this.SeeoffParam.setAttr({
                'rmtype': rmtype
            });
            if (!rmtype) {
                this.SeeoffParam.setAttr({
                    'usedt': ''
                });
            }
            this.els.renttype.removeClass('current');
            if (rmtype === ENUM_RMTYPE_BAO) {
                this.els.baoche.addClass('current');
            } else if (rmtype === ENUM_RMTYPE_PIN) {
                this.els.pinche.addClass('current');
            }
        },
        updateUseDate: function () {
            /*var rmtype = parseInt(this.SeeoffParam.getAttr('rmtype'));
             var usedt = this.SeeoffParam.getAttr('usedt');*/
            var sop = this.SeeoffParam.get();
            var rmtype = parseInt(sop.rmtype, 10);
            var usedt = sop.usedt;
            var dates = this.AvailTimeSendStore.get();

            /********************************
             * @description:  各种订单完成页进入用车频道的url参数store only for app
             * @author:       lh_sun@Ctrip.com
             */



            if (cBase.isInApp()) {
                var hhps = hybridH5URLParamStore.get() || {};
                //app里面需要判断是否带有参数，如果带有参数的话，先获取城市ID，然后再拉数据
                if (hhps.dcityname && hhps.dtime) {
                    var atime = hhps.dtime;
                    var _date = new c.base.Date(c.base.Date.parse(atime)),
                        hour = _date.date.getHours();
                    if (_date.date.getMinutes() > 51) {
                        _date.date.setHours(hour + 1);
                    }
                    _date.date.setHours(hour - 2);
                    var minute = Math.ceil(_date.date.getMinutes() / 10) * 10;
                    _date.date.setMinutes(minute);
                    usedt = _date.format('Y/n/j H:i:s');
                }
            }


            if (rmtype && dates) {
                var usedate = cDate.parse(usedt),
                    curdateObj = _.find(dates.times || [], function (v, i) {
                        if (v.isavail && v.rmtype === rmtype) return true;
                    });
                if (!curdateObj) curdateObj = dates.times[0];

                var curdate = cDate.parse(curdateObj.stime);
                if (usedate.valueOf() < curdate.valueOf()) {
                    usedate = curdate;
                }
                this.SeeoffParam.setAttr('usedt', usedate.format('Y/m/d H:i:s'));
                this.els.times.html(usedate.format('m月d日 H:i')).removeClass('invaild');
            } else {
                this.setInvalidState(3);
            }
        },
        //获取机场车站
        requestStations: function (cityid, callback, error) {
            this.showLoading();
            this.isNetdown = false;
            this.StationListSearchModel.setCityId(cityid);
            this.StationListSearchModel.excute(function (stats) {
                this.hideLoading();
                this.isNetdown = false;
                callback && callback.call(this, stats);
            }, function () {
                this.hideLoading();
                this.isNetdown = true;
                error && error.call(this);
            }, false, this, function () {
                this.hideLoading();
            });
        },
        //获得用车时间
        requestDates: function (params, callback, error) {
            this.showLoading();
            this.isNetdown = false;
            this.AvailTimeSendModel.setParam(params);
            this.AvailTimeSendModel.excute(function (dates) {
                this.hideLoading();
                this.isNetdown = false;
                callback && callback.call(this, dates);
            }, function () {
                this.isNetdown = true;
                this.hideLoading();
                error && error.call(this);
            }, false, this, function () {
                this.hideLoading();
            });
        },
        setStationData: function (data, curstat, index) {
            var list = [];
            if (data && data.stathotinfo) {
                for (var i = 0; i < data.stathotinfo.length; i++) {
                    list.push({
                        key: data.stathotinfo[i].stathotinfo.val,
                        tit: i,
                        data: data.stathotinfo[i]
                    });
                }
            }
            this.stationlist = list;
            if (curstat) {
                this.SeeoffParam.setAttr({
                    'stathotinfo.statid': curstat.stathotinfo.typ,
                    'stathotinfo.stattype': curstat.statype,
                    'statname': curstat.stathotinfo.val
                });
                this.els.aterm.html(curstat.stathotinfo.val).removeClass('invaild');
            } else {
                this.els.aterm.html('请选择机场或车站');
            }
        },
        updatePageData: function () {

            /*var cityinfo = this.SeeoffParam.getCity();
             if (cityinfo) {
             this.els.acityname.html(cityinfo.cityname);
             }*/
            /********************************
             * @description:  BUG 43007  IOS APP 日租时租里面，this.SeeoffParam.getAttr('xx.xx')在某些情况下会获取错误
             * @author     :  lh_sun@Ctrip.com
             * @date       :  2013-12-27
             */
            /*var seeOffParam = this.SeeoffParam.get() || {};
             var statHotInfo = seeOffParam && seeOffParam.stathotinfo || {};
             var cityname = statHotInfo && statHotInfo.cityname || '';
             cityname && this.els.acityname.html(cityname);*/
            var pps = this.SeeoffParam.get();
            var cityname = pps.stathotinfo && pps.stathotinfo.cityname;
            this.els.acityname.html(cityname);
            this.LoadPageOther();
        },
        addZero: function (num, n) {
            var len = num.toString().length;
            while (len < n) {
                num = "0" + num;
                len++;
            }
            return num;
        },
        getMMDDHHMM: function (date, flag) {
            var _date = new c.base.Date(c.base.Date.parse(date)),
                hour = _date.date.getHours();

            if (_date.date.getMinutes() > 51) {
                _date.date.setHours(hour + 1);
                _date.date.setMinutes(0);
            }

            var minute = !flag ? Math.ceil(_date.date.getMinutes() / 10) * 10 : Math.floor(_date.date.getMinutes() / 10) * 10;


            _date.date.setMinutes(minute);

            return {
                specialDate: _date.format('D') ? _date.format('n月j日 D') : _date.format('n月j日 w'),
                formatedDate: _date.format('Y-n-j H:i:s'),
                hour: _date.date.getHours(),
                minute: _date.date.getMinutes(),
                origDate: date
            };
        },

        /********************************
         * @description:  【用车时间滑动】==>【根据已知小时，格式化小时】
         */

        getAllHours: function (hour, val1, val2, flag) {
            var retObj = [],
                j = 0,
                len = 24,
                disable;
            for (; j < len; j++) {
                if (j < hour) {
                    disable = val1;
                } else if (j == hour) {
                    if (!flag) {
                        disable = val2;
                    } else {
                        disable = val1;
                    }
                } else {
                    disable = val2;
                }
                retObj.push({
                    key: j,
                    val: this.addZero(j, 2),
                    disabled: disable
                });
            }
            return retObj;
        },

        /********************************
         * @description:  【用车时间滑动】==>【根据已知分钟，格式化分钟】
         */

        getAllMinutes: function (minute, val1, val2, flag) {
            var retObj = [],
                i = 0,
                len = 60,
                disable;
            for (; i < len; i += 10) {
                if (i < minute) {
                    disable = val1;
                } else if (i == minute) {
                    if (!flag) {
                        disable = val2;
                    } else {
                        disable = val1;
                    }
                } else {
                    disable = val2;
                }
                retObj.push({
                    key: i,
                    val: this.addZero(i, 2),
                    disabled: disable
                });
            }
            return retObj;
        },
        getAllDate: function (startTime, endTime) {
            var sTimeDate = new c.base.Date(new c.base.Date(c.base.Date.parse(startTime)).format('Y-n-j 00:00:00')),
                eTimeDate = new c.base.Date(new c.base.Date(c.base.Date.parse(endTime)).format('Y-n-j 00:00:00')),
                sSeconds = sTimeDate.date.getTime(),
                eSeconds = eTimeDate.date.getTime(),
                intervalDay = 24 * 60 * 60 * 1000,
                i = sSeconds,
                retArr = [],
                $item = null;

            var s3Month = new cDate(new Date(sSeconds)),
                _endTime = null,
                retTime = null,
                eeSeconds,
                _eSeconds;
            s3Month.addMonth(3);
            s3Month.date.setDate(1);
            s3Month.date.setHours(0);
            s3Month.date.setMinutes(0);
            _endTime = new Date(s3Month.date.getTime() - 1000);
            _endTime.setMinutes(50);
            _endTime.setHours(23);
            eeSeconds = _endTime.getTime();
            _eSeconds = eeSeconds <= eSeconds ? eeSeconds : eSeconds;

            for (; i <= _eSeconds; ) {
                $item = new Date(i);
                retArr.push(new c.base.Date($item).format('Y-n-j 00:00:00'));
                i += intervalDay;
            }

            retArr[0] = startTime;
            if (eeSeconds >= eSeconds) {
                this.isLessThan6 = false;
                retArr[retArr.length - 1] = endTime;
            } else {
                this.isLessThan6 = true;
                retArr[retArr.length - 1] = new c.base.Date(_endTime).format('Y-n-j 23:50:00');
            }

            retArr[0] = startTime;

            return retArr;

        },

        doCheck: function () {
            var self = this,
                $this = this.els.times;
            var productListParamStore = this.SeeoffParam,
                productListParamStoreObj = productListParamStore.get();
            var availTimeStore = this.AvailTimeSendStore.get();



            var usedt = productListParamStoreObj.usedt;

            var usedate = cDate.parse(usedt),
                now = cBase.getServerDate();
            //console.log('usedate : ' + (+usedate.date));
            //console.log('now : ' + (+now));

            // 加上时间对比修复 bug 44417
            if (+usedate.date < +now &&
                !(usedate.date.getYear() == now.getYear() &&
                    usedate.date.getMonth() == now.getMonth() &&
                    usedate.date.getDate() == now.getDate() &&
                    usedate.date.getHours() == now.getHours() &&
                    usedate.date.getMinutes() == now.getMinutes())) {

                //当获取失败的时候，重新获取
                this.AvailTimeSendStore.remove();
                this.requestStatDate(function () {
                }, function () {
                    this.showToast('加载失败，请重试', 2); // 全局加载失败处理
                });
                return;
            }


            var bookableTimeList = _.find(availTimeStore.times || [], function (v, i) {
                if (v.isavail && parseInt(v.rmtype, 10) === parseInt(productListParamStoreObj.rmtype, 10)) return true;
            });

            var usedtDate = new c.base.Date(c.base.Date.parse(usedt)),
                isInitialize = false,
                preStatus = {},
                allDate = self.getAllDate(bookableTimeList.stime, bookableTimeList.etime),
            //allDate = self.getAllDate(bookableTimeList.stime, '2013/12/12 13:40:50'),
                allDateLength = allDate.length,
                yearMonthDayArr = _.map(allDate, function (val, key) {
                    var formatDateObj = self.getMMDDHHMM(val, allDate.length - 1 == key);
                    var hoursArr = null;
                    var minutesArr = null;
                    hoursArr = self.getAllHours(formatDateObj.hour, false, true);
                    minutesArr = self.getAllMinutes(formatDateObj.minute, false, true);
                    if (key === (allDateLength - 1)) {
                        hoursArr = self.getAllHours(formatDateObj.hour, true, false, true);
                        minutesArr = self.getAllMinutes(formatDateObj.minute, true, false, true);
                    }

                    return {
                        val: formatDateObj.specialDate,
                        key: formatDateObj.origDate,
                        formatedDate: formatDateObj.formatedDate,
                        index: key,
                        hour: formatDateObj.hour,
                        minute: formatDateObj.minute,
                        hoursArr: hoursArr,
                        minutesArr: minutesArr
                    };
                }),

                yearMonthDayArrSelected = _.find(yearMonthDayArr, function (val) {
                    var origDate = new c.base.Date(val.formatedDate && val.formatedDate.replace(/-/g, '/')).format('Ymd');
                    var destiDate = usedtDate.format('Ymd');
                    return origDate === destiDate;
                });


            if (!yearMonthDayArrSelected) {
                yearMonthDayArrSelected = yearMonthDayArr[0];
            }

            yearMonthDayArrSelected.lHour = usedtDate.date.getHours();
            yearMonthDayArrSelected.lMinute = usedtDate.date.getMinutes();



            var index = parseInt(yearMonthDayArrSelected.index, 10);

            var yearMonthDayArrSelected = yearMonthDayArr[index];

            var indexHours = parseInt(yearMonthDayArrSelected.lHour, 10);

            var indexMinutes = parseInt(yearMonthDayArrSelected.lMinute, 10) / 10;

            this.scrollRadio = new c.ui.ScrollRadio({
                title: '用车时间',
                data: [yearMonthDayArr, yearMonthDayArrSelected.hoursArr, yearMonthDayArrSelected.minutesArr],
                index: [index, indexHours, indexMinutes],
                okClick: function (item) {
                    var item0 = item[0],
                        item1 = item[1],
                        item2 = item[2],
                        _date = new c.base.Date(c.base.Date.parse(item0.key));
                    _date.date.setHours(item1.val);
                    _date.date.setMinutes(item2.val);
                    _date.date.setSeconds(0);

                    $this.html(_date.format('m月d日 H:i'));

                    productListParamStore.setAttr({
                        usedt: _date.format('Y/n/j H:i:s')
                    });
                },
                cancelClick: function (item) {

                },
                changed: [
                    function (item) {
                        index = parseInt(item.index, 10);

                        var hourIndex,
                            minuteIndex,
                            yearMonthDay = yearMonthDayArr[index],
                            scroll1 = this.scroll[1],
                            scroll2 = this.scroll[2],
                            hoursArr = null;

                        if (isInitialize) {
                            yearMonthDay.lHour = scroll1.getSelected().val;
                        }
                        if (yearMonthDay.lHour > yearMonthDay.hour) {
                            hourIndex = yearMonthDay.lHour;
                        } else {
                            hourIndex = yearMonthDay.hour;
                        }

                        hoursArr = yearMonthDay.hoursArr;

                        if (self.isLessThan6 && index === (allDateLength - 1)) {
                            if (parseInt(yearMonthDay.lHour) <= parseInt(yearMonthDay.hour)) {
                                hourIndex = yearMonthDay.lHour;
                            } else {
                                hourIndex = yearMonthDay.hour;
                            }
                        }

                        scroll1.reload(hoursArr);
                        scroll1.setIndex(hourIndex);
                        isInitialize = true;
                    },
                    function (item) {
                        if (isInitialize) {

                            var hourIndex,
                                minuteIndex,
                                yearMonthDay = yearMonthDayArr[index],
                                minutesArr = null,
                                scroll1 = this.scroll[1],
                                scroll2 = this.scroll[2];

                            yearMonthDay.lHour = scroll1.getSelected().val;
                            yearMonthDay.lMinute = scroll2.getSelected().val;
                            if (yearMonthDay.lHour > yearMonthDay.hour) {
                                minutesArr = self.getAllMinutes(1, true, true);
                                minuteIndex = yearMonthDay.lMinute;
                            } else {
                                minutesArr = yearMonthDay.minutesArr;
                                minuteIndex = yearMonthDay.lMinute > yearMonthDay.minute ? yearMonthDay.lMinute : yearMonthDay.minute;
                            }

                            if (index === (allDateLength - 1)) {
                                if (yearMonthDay.lHour < yearMonthDay.hour) {
                                    minutesArr = self.getAllMinutes(1, true, true);
                                    minuteIndex = yearMonthDay.lMinute;
                                } else {
                                    minutesArr = yearMonthDay.minutesArr;
                                    minuteIndex = yearMonthDay.lMinute > yearMonthDay.minute ? yearMonthDay.lMinute : yearMonthDay.minute;
                                }
                            }

                            if (self.isLessThan6 && index === (allDateLength - 1)) {
                                if (parseInt(yearMonthDay.lHour) === parseInt(yearMonthDay.hour)) {
                                    minutesArr = yearMonthDay.minutesArr;
                                    minuteIndex = yearMonthDay.lMinute < yearMonthDay.minute ? yearMonthDay.lMinute : yearMonthDay.minute;
                                } else {
                                    minutesArr = self.getAllMinutes(1, true, true, true);
                                    minuteIndex = yearMonthDay.lMinute;
                                }
                            }
                            scroll2.reload(minutesArr);
                            scroll2.setIndex(minuteIndex / 10);

                        }


                    },
                    function (item) {

                    }
                ]
            });


            this.scrollRadio.show();
            this.scrollRadio.scroll[0].setIndex(index);
            this.scrollRadio.setTips('现在可预订' + cDate.parse(bookableTimeList.stime).format('m月d日H:i') + '后的用车');
        },

        /********************************
         * @description:  【用车时间滑动】==>【main】
         */
        chooseUseDate: function (event) {

            var self = this,
                $this = this.els.times;
            if ($this.html().trim().indexOf('请选择用车时间') > -1) {
                return;
            }
            var productListParamStore = this.SeeoffParam,
                productListParamStoreObj = productListParamStore.get();
            var availTimeStore = this.AvailTimeSendStore.get();
            if (!availTimeStore || !availTimeStore.times) {
                //当获取失败的时候，重新获取
                this.AvailTimeSendStore.remove();
                this.requestStatDate(function () {
                    self.doCheck();
                }, function () {
                    this.showToast('加载失败，请重试', 2); // 全局加载失败处理
                });
                return;
            } else {
                this.doCheck();
            }

        },
        onShow: function () {
            this.setTitle('送机/送火车');
        },
        onHide: function () {
            this.scrollRadio && this.scrollRadio.hide();
            this.myradiolist && this.myradiolist.hide();
            this.AvailTimeSendModel.abort();
            this.StationListSearchModel.abort();
        }
    });
    return View;
});