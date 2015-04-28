/********************************
* @description:  日租时租
*/
define(['libs', 'c', 'cUICore', 'CarModel', 'CarStore', 'cBasePageView', 'cListAdapter', 'cBase', buildViewTemplatesPath('rent.html')], function (libs, c, cui, CarModel, CarStore, BasePageView, ListAdapter, cBase, html) {
    var cBase = c.base,
        cDate = c.base.Date;
    var View = BasePageView.extend({
        pageid: '214268',
        //是否要显示广告
        hasAd: true,
        /*
        *自定义属性
        */

        //用车时长是否小于2月，点击用车时间弹框用到
        isLessThan2: false,

        //产品列表查询param store
        productListParamStore: CarStore.RentParamStore.getInstance(),

        //可用时间查询store
        availTimeStore: CarStore.AvailTimeStore.getInstance(),
        //可用时间查询Model
        availTimeModel: CarModel.AvailTimeModel.getInstance(),

        //渲染html
        render: function () {
            this.$el.append(html);
        },

        //绑定事件
        events: {
            //选择用车城市
            'click #c-rent-city': 'toSelectCityList',
            //点击【查询】按钮 进入列表页
            'click #c-rent-query': 'rentQuery',
            //选择用车时长
            'click #c-rent-useLong': 'chooseUseDur',
            //选择用车时间
            'click #c-rent-useTime': 'chooseUseDate',
            //时租日租tab切换
            'click #c-rent-type span': 'switchRentType'
        },

        //create时候促发的事件
        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        //加载数据
        onLoad: function () {

            var self = this,
                dcid;

            //对HeaderView设置数据
            this.headerview.set({
                title: '日租／时租',
                back: true,
                view: self,
                tel: true,
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

            this.turning();

            //获取dom节点
            this.els = {
                $city: $('#c-rent-city em'),
                $type: $('#c-rent-type'),
                $useTime: $('#c-rent-useTime em'),
                $useLong: $('#c-rent-useLong em'),
                $typeTab: $('.c-rent-type-d'),
                $rizu: this.$el.find('.rizu'),
                $shizu: this.$el.find('.shizu'),
                $renttype: this.$el.find('#c-rent-type span')
            };

            //重置各种选项归默认值
            this.reAdjust();

            //默认城市是上海，然后load数据
            var cityname = '上海';
            var cityid = '2';

            //如果是从选择城市过来的话，重新赋值
            /*虎虎，不要咬我，我改一下下*/
            var paramObj = $.deparam(window.location.hash.replace(/#[^\?]*\?/, ''));
            if (paramObj.cityname && paramObj.cityid) {
                cityname = paramObj.cityname;
                cityid = paramObj.cityid;
            }

            //用车城市回显
            this.els.$city.html(cityname);
            //设置列表查询的cityid
            this.productListParamStore.setAttr('stathotinfo.dcid', cityid);
            //设置列表查询的cityname
            this.productListParamStore.setAttr('stathotinfo.cityname', cityname);
            //获取用车时间
            this.loadAvailTimeCarData();
        },
        //重置各种选项归默认值
        reAdjust: function () {
            this.useTimeReset();
            this.productListParamStore.setAttr({
                usedur: ''
            });
        },

        //重置【用车时间】【用车时长】选项归默认值
        useTimeReset: function () {
            this.els.$useTime.html('请选择用车时间').addClass('cnotime');
            this.els.$useLong.html('请选择用车时长').addClass('cnotime');
            this.setInvalidState(1);
        },

        //初始化页面数据
        updatePageData: function () {
            var pps = this.productListParamStore.get();
            var cityname = pps.stathotinfo && pps.stathotinfo.cityname;
            this.els.$city.html(cityname);
        },


        /********************************
        * @description:  【用车城市选择】
        */

        toSelectCityList: function () {
            this.productListParamStore.setEditField('stathotinfo.cityname', 'stathotinfo.dcid');
            var cityname = '上海';
            var cityid = '2';

            //获取上一次保存的数据——城市名称、城市ID
            var pps = this.productListParamStore.get();
            if (pps.stathotinfo.dcid && pps.stathotinfo.cityname) {
                cityname = pps.stathotinfo.cityname;
                cityid = pps.stathotinfo.dcid;
            }
            //跳转用车城市页面
            var qs = $.param({ cityname: cityname, cityid: cityid });
            this.forward('selectcity?' + qs);
        },

        //一位数字补0
        addZero: function (num, n) {
            var len = num.toString().length;
            while (len < n) {
                num = "0" + num;
                len++;
            }
            return num;
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

        //获取所有的天数
        getAllDate: function (startTime, endTime) {
            //最小值：当前最早可预订的日期。
            //最大值：当前月+2个月后的最后一天。
            var sTimeDate = new c.base.Date(c.base.Date.parse(startTime)),
                eTimeDate = new c.base.Date(c.base.Date.parse(endTime)),
                //开始时间的时间戳
                sSeconds = sTimeDate.date.getTime(),
                //结束时间的时间戳
                eSeconds = eTimeDate.date.getTime(),
                //一天的秒数
                intervalDay = 24 * 60 * 60 * 1000,
                i = sSeconds,
                retArr = [],
                $item = null;

            var s3Month = new cDate(new Date(sSeconds)),
                _endTime = null,
                retTime = null,
                eeSeconds,
                _eSeconds;
            //时间变成3个月后的第一天0分0秒
            s3Month.addMonth(3);
            s3Month.date.setDate(1);
            s3Month.date.setHours(0);
            s3Month.date.setMinutes(0);
            //现在的时间减去1秒，变成2月后的最后一天的23时50分
            _endTime = new Date(s3Month.date.getTime() - 1000);
            _endTime.setMinutes(50);
            _endTime.setHours(23);
            eeSeconds = _endTime.getTime();
            _eSeconds = eeSeconds <= eSeconds ? eeSeconds : eSeconds;

            for (; i < _eSeconds; ) {
                $item = new Date(i);
                retArr.push(new c.base.Date($item).format('Y-n-j 00:00:00'));
                i += intervalDay;
            }

            retArr[0] = startTime;
            this.isLessThan2 = true;
            //最后一天的时间，如果开始时间、结束时间的时间间隔小于2月，则变为endTime，否则为最后一月的23:50:00
            if (eeSeconds >= eSeconds) {
                var eeTime = "";
                if (eTimeDate.format('H:i:s') === '00:00:00') {
                    eTimeDate.addDay(-1);
                    eeTime = eTimeDate.format('Y-n-j 23:50:00');
                } else {
                    eeTime = endTime;
                }
                retArr[retArr.length - 1] = eeTime;
            } else {
                retArr[retArr.length - 1] = new c.base.Date(_endTime).format('Y-n-j 23:50:00');
            }

            return retArr;

        },

        //显示用车时间弹框
        showTimeScrollRadio: function () {
            var self = this,
                $this = $('#c-rent-useTime em'),
                $typeTab = this.els.$typeTab;

            var productListParamStore = this.productListParamStore,
                productListParamStoreObj = productListParamStore.get(),
                availTimeStore = this.availTimeStore.get();
            var usedt = productListParamStoreObj.usedt;


            var usedate = cDate.parse(usedt),
                now = cBase.getServerDate();

            //筛选可预订的时间
            var bookableTimeList = _.find(availTimeStore.times || [], function (v, i) {
                if (v.isavail && parseInt(v.rtype, 10) === parseInt(productListParamStoreObj.rtype, 10)) return true;
            }),

                usedtDate = new c.base.Date(c.base.Date.parse(usedt)),
                isInitialize = false,
                preStatus = {},
            //获取用车可用的时间
                allDate = self.getAllDate(bookableTimeList.stime, bookableTimeList.etime),
            //allDate = self.getAllDate(bookableTimeList.stime, '2013/12/12 00:00:00'),
                allDateLength = allDate.length,
            //获取各个时间对应的时间格式
                yearMonthDayArr = _.map(allDate, function (val, key) {
                    var formatDateObj = self.getMMDDHHMM(val);
                    var hoursArr = null;
                    var minutesArr = null;
                    hoursArr = self.getAllHours(formatDateObj.hour, false, true);
                    minutesArr = self.getAllMinutes(formatDateObj.minute, false, true);
                    if (self.isLessThan2 && key === (allDateLength - 1)) {
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


            //选中的日期索引
            var index = parseInt(yearMonthDayArrSelected.index, 10);

            //被选中的日期
            var yearMonthDayArrSelected = yearMonthDayArr[index];

            //被选中的日期小时部分
            var indexHours = parseInt(yearMonthDayArrSelected.lHour, 10);

            //被选中的日期分钟部分
            var indexMinutes = parseInt(yearMonthDayArrSelected.lMinute, 10) / 10;

            //初始化日期选择组件
            this.scrollRadio = new cui.ScrollRadio({
                title: '用车时间',
                //三个轴对应的数据，格式为数组
                data: [yearMonthDayArr, yearMonthDayArrSelected.hoursArr, yearMonthDayArrSelected.minutesArr],
                //被选中的索引值
                index: [index, indexHours, indexMinutes],
                //点击【确定】按钮促发的事件
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
                //每个轴——日期、时、分值改变时促发的事件
                changed: [
                    function (item) {
                        index = parseInt(item.index, 10);

                        var hourIndex,
                            minuteIndex,
                            yearMonthDay = yearMonthDayArr[index],
                            scroll1 = this.scroll[1],
                            scroll2 = this.scroll[2],
                            hoursArr = null;

                        //对于已经初始化的，时间保存的是上一次选择的时间
                        if (isInitialize) {
                            yearMonthDay.lHour = scroll1.getSelected().val;
                        }

                        //如果上一次选择的最早喜小时大于要显示的，则选择最早的
                        if (yearMonthDay.lHour > yearMonthDay.hour) {
                            hourIndex = yearMonthDay.lHour;
                        } else {
                            hourIndex = yearMonthDay.hour;
                        }

                        hoursArr = yearMonthDay.hoursArr;

                        //如果时间小于两个月，并且，日期是最后的日期，则判断与之前的相反
                        if (self.isLessThan2 && index === (allDateLength - 1)) {
                            if (yearMonthDay.lHour <= yearMonthDay.hour) {
                                hourIndex = yearMonthDay.lHour;
                            } else {
                                hourIndex = yearMonthDay.hour;
                            }
                        }

                        //重置时间组件的小时部分
                        scroll1.reload(hoursArr);
                        //设置index
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
                            
                            //小时、分钟获取上次记忆的
                            yearMonthDay.lHour = scroll1.getSelected().val;
                            yearMonthDay.lMinute = scroll2.getSelected().val;

                            //如果上一次选择的最早喜小时大于要显示的，则选择最早的
                            if (yearMonthDay.lHour > yearMonthDay.hour) {
                                minutesArr = self.getAllMinutes(1, true, true);
                                minuteIndex = yearMonthDay.lMinute;
                            } else {
                                minutesArr = yearMonthDay.minutesArr;
                                minuteIndex = yearMonthDay.lMinute > yearMonthDay.minute ? yearMonthDay.lMinute : yearMonthDay.minute;
                            }


                            //如果时间小于两个月，并且，日期是最后的日期，则判断与之前的相反
                            if (self.isLessThan2 && index === (allDateLength - 1)) {
                                if (yearMonthDay.lHour === yearMonthDay.hour) {
                                    minutesArr = yearMonthDay.minutesArr;
                                    minuteIndex = yearMonthDay.lMinute < yearMonthDay.minute ? yearMonthDay.lMinute : yearMonthDay.minute;
                                } else {
                                    minutesArr = self.getAllMinutes(1, true, true, true);
                                    minuteIndex = yearMonthDay.lMinute;
                                }
                            }
                            //重置时间组件的分钟部分
                            scroll2.reload(minutesArr);
                            scroll2.setIndex(minuteIndex / 10);

                        }


                    },
                    function (item) {

                    }
                ]
            });

            //显示时间选择组件
            this.scrollRadio.show();
            this.scrollRadio.scroll[0].setIndex(index);
            this.scrollRadio.setTips('现在可预订' + cDate.parse(bookableTimeList.stime).format('m月d日H:i') + '后的用车');
        },

        /********************************
        * @description:  【用车时间滑动】==>【main】
        */
        chooseUseDate: function (event) {

            var self = this,
                $this = $('#c-rent-useTime em'),
                $typeTab = this.els.$typeTab;
            if ($this.html().trim().indexOf('请选择用车时间') > -1) {
                //当获取失败的时候，重新获取
                this.loadAvailTimeCarData();
                return;

            }

            //弹出时间选择组件
            self.showTimeScrollRadio();

        },

        //弹出时长选择组件
        showDurScrollRadio: function () {
            var self = this,
                $this = $('#c-rent-useLong em');
            var productListParamStore = this.productListParamStore,
                //获取日租还是时租
                rtype = parseInt(productListParamStore.get().rtype, 10),
                dates = this.availTimeStore.get() && this.availTimeStore.get().times || [];

            //过滤可用时间
            var rmap = (function (dates) {
                var map = {};
                for (var i = 0; i < dates.length; i++) {
                    if (dates[i].isavail) map[dates[i].rtype] = dates[i];
                }
                return map;
            })(dates);

            if (_.isEmpty(rmap)) {
                return;
            }

            var itvals = rmap[rtype].itvals,
                unit = rtype === 1 ? '天' : '小时',
                data = [],
                index = parseInt($this.html().trim().match(/(\d*)/img)[0], 10),
                $item,
                i = 0,
                len = itvals.length;

            //格式化用车时长
            for (; i < len; i++) {
                $item = itvals[i].val;
                data.push({
                    val: $item + unit,
                    key: $item
                });
            }


            //初始化用车时长组件
            this.scrollRadioList = new cui.ScrollRadioList({
                title: '用车时长',
                index: index - 1,
                data: data,
                //选中后促发的事件
                itemClick: function (item) {
                    //回显
                    $this.html(item.val);
                    productListParamStore.setAttr({
                        usedur: item.key
                    });
                }
            });

            //显示选择用车时长组件
            this.scrollRadioList.show();
        },

        /********************************
        * @description:  【选择时长】
        */

        chooseUseDur: function (event) {

            var self = this,
                $this = $('#c-rent-useLong em');
            if ($this.html().trim().indexOf('请选择用车时长') > -1) {
                return;
            }

            //弹出用车时长选择组件
            self.showDurScrollRadio();

        },

        /********************************
        * @description:  【提交查询】
        */
        rentQuery: function () {
        //提交查询之前的各种业务逻辑判断
            var pps = this.productListParamStore.get(),
                dcid = pps.stathotinfo.dcid,
                rmtype = pps.rmtype,
                useTime = pps.usedt,
                usedur = pps.usedur,
                stime = c.utility.dateParse(useTime).getTime(),
                els = this.els,
                useTimeDefault = els.$useTime.html().trim().indexOf('请选择用车时间'),
                useLongDefault = els.$useLong.html().trim().indexOf('请选择用车时长');
            
            //判断用车城市是否为空
            if (!dcid) {
                this.showToast('请选择用车城市');
                return;
            }

            //判断用车时间是否为空
            if (useTimeDefault > -1 || !useTime) {
                this.showToast('请选择用车时间');
                return;
            }

            //判断用车时长
            if (useLongDefault > -1 || !usedur) {
                this.showToast('请选择用车时长');
                return;
            }

            //保存参数store
            this.productListParamStore.save();
            //将参数放到url后面，跳转列表页
            this.forward('list?' + $.param(this.productListParamStore.get()));
        },

        //格式化时间
        getMMDDHHMM: function (date) {
            var _date = new c.base.Date(c.base.Date.parse(date)),
                hour = _date.date.getHours();

            if (_date.date.getMinutes() > 51) {
                _date.date.setHours(hour + 1);
            }

            var minute = Math.ceil(_date.date.getMinutes() / 10) * 10;

            _date.date.setMinutes(minute);

            return {
                //用来显示的时间
                specialDate: _date.format('D') ? _date.format('n月j日 D') : _date.format('n月j日 w'),
                //格式化后的时间
                formatedDate: _date.format('Y-n-j H:i:s'),
                //小时部分
                hour: _date.date.getHours(),
                //分钟部分
                minute: _date.date.getMinutes(),
                //原格式时间
                origDate: date
            };
        },

        //日租时租tab切换
        switchRentType: function (e) {
            var dom = $(e.currentTarget),
                self = this,
                type = dom.attr('data-type');
            if (dom.hasClass('nocar')) {
                return
            }

            self.els.$renttype.removeClass('current');
            dom.addClass('current');
            self.productListParamStore.setAttr('rtype', type);
            //更新用车时间、用车时长
            self.updateUseDate();
        },

        //更新用车时间、用车时长
        updateUseDate: function () {
            var pps = this.productListParamStore.get();
            var rtype = pps && pps.rtype
            var usedt = pps && pps.usedt;
            var dates = this.availTimeStore.get();
            //有日租时租数据
            if (rtype) {

                var usedate = cDate.parse(usedt),
                curdateObj = _.find(dates.times || [], function (v, i) {
                    if (v.isavail && v.rtype == rtype) return true;
                });
                if (!curdateObj) curdateObj = dates.times[0];

                var curdate = cDate.parse(curdateObj.stime),
                    enddate = cDate.parse(curdateObj.etime),
                    //当前服务器时间
                    now = cBase.getServerDate();

                //如果用车时间为空，并且用车时间小于服务器下发的最早时间，则用车时间为服务器下发的最早时间
                if (!usedt || usedate.valueOf() < curdate.valueOf()) {
                    usedate = curdate;
                }

                var usedur = curdateObj.itvals[0].val,
                    useLongStr = rtype == 1 ? "天" : "小时";

                this.productListParamStore.setAttr('usedt', usedate.format('Y/m/d H:i:s'));
                this.productListParamStore.setAttr('usedur', usedur);

                this.els.$useTime.html(usedate.format('m月d日 H:i')).removeClass('cnotime');
                this.els.$useLong.html(usedur + useLongStr).removeClass('cnotime');
            } else {
             //无日租时租数据，则显示默认的文字
                this.setInvalidState(3);
            }
        },

        //设置日租时租tab、用车时间、用车时长无效的状态
        setInvalidState: function (tags) {
            if (tags | 1) {
                this.els.$rizu.removeClass('current').addClass('nocar').html('暂无日租');
                this.els.$shizu.removeClass('current').addClass('nocar').html('暂无时租');
            }
            if (tags | 2) {
                this.els.$useTime.addClass('cnotime').html('请选择用车时间');
                this.els.$useLong.addClass('cnotime').html('请选择用车时长');
            }
        },

        //更新出行方式
        updateTripModeState: function (dates) {
            //以下rtype是有记忆的 已经改为默认是日租
            //var rtype = parseInt(this.productListParamStore.getAttr('rtype') || 0);

            var rtype;
            var rmap = this.rmap = (function (dates) {
                var map = {};
                for (var i = 0; i < dates.length; i++) {
                    if (dates[i].isavail) map[dates[i].rtype] = dates[i];
                }
                return map;
            })(dates);



            //是否支持日租
            if (rmap['1']) {
                this.els.$rizu.removeClass('nocar').html('日租');
            } else {
                this.els.$rizu.addClass('nocar').html('暂无日租');
            }
            //是否支持时租
            if (rmap['2']) {
                this.els.$shizu.removeClass('nocar').html('时租');
            } else {
                this.els.$shizu.addClass('nocar').html('暂无时租');
            }

            if (!rmap['1'] && !rmap['2']) {
                this.showToast('加载失败，请重试');
            }
            //选中标签
            rtype = rtype || 2;

            if (1 == rtype) {
                if (rmap[rtype]) {
                    rtype = 1;
                } else {
                    rtype = 2;
                }
            }
            if (2 == rtype) {
                if (rmap[rtype]) {
                    rtype = 2;
                } else {
                    rtype = 1;
                }
            }

            this.productListParamStore.setAttr('rtype', rtype);
            this.els.$renttype.removeClass('current');
            if (rtype == 1) {
                this.els.$rizu.addClass('current');
            } else if (rtype == 2) {
                this.els.$shizu.addClass('current');
            }
        },

        //请求用车时间
        loadAvailTimeCarData: function (sCallback, eCallback) {
            this.showLoading();

            //success的回调
            sCallback = sCallback || function () { };
            //error的回调
            eCallback = eCallback || function () { };

            var self = this,
                els = self.els,
                ajaxOnly = false,
                onSuccess,
                onError,
                productListParamStore = self.productListParamStore.get(),
                availTimeModel = self.availTimeModel;
            availTimeModel.param.rtype = 0;
            availTimeModel.param.stathotinfo.dcid = productListParamStore.stathotinfo.dcid;
            //获取用车时间成功
            onSuccess = function (json) {
                //success
                var self = this;
                var times = json.times;
                self.updateTripModeState(json && times || []);
                self.updateUseDate(json && times || []);
                sCallback.call(self);
                this.hideLoading();
            };

            //获取用车时间失败
            onError = function (error) {
                this.showToast('加载失败，请重试', 2); // 全局加载失败处理
                eCallback.call(self);
                this.hideLoading();
            };
            //this为指定onSuccess、onError里面的this指向
            availTimeModel.excute(onSuccess, onError, ajaxOnly, this);

        },

        //onShow设置title
        onShow: function () {
            this.setTitle('日租/时租');
        },

        //隐藏/切换页面 的时候，需要把用车时间的选择组件、用车时长的选择组件全部隐藏了，并且把请求用车时间的ajax给abort了
        onHide: function () {
            if (this.scrollRadioList) this.scrollRadioList.hide();
            if (this.scrollRadio) this.scrollRadio.hide();
            this.availTimeModel.abort();
        }
    });

    return View;

});
