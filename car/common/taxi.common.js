define(['libs', 'c', 'cStore', 'cWidgetFactory','cUtility', 'cWidgetCalendar', 'cWidgetMember', 'cWidgetGuider'], function (libs, c, AbstractStore, WidgetFactory, cUtility) {
    var cBase = c.base,
        cDate = cBase.Date,
        cui = c.ui;
    var TaxiCommon = {};
    var Guider = WidgetFactory.create('Guider'), Member = WidgetFactory.create('Member');
    /**
    * @description: 倒计时
    * @author: od
    */
    TaxiCommon.CountDown = new cBase.Class(cui.EventListener, {

        __propertys__: function () {
            this.startTime;
            this.second = 99;
            this.onStart;
            this.onLoading;
            this.onComplete;
            this.state = TaxiCommon.CountDown.STATE_INIT;

            this._startCoundDown = $.proxy(this.__startCoundDown, this);
            this._resource;
            this._diff;
        },
        initialize: function ($super, ops) {
            $super(ops);
            this._setOption(ops);
        },
        _setOption: function (ops) {
            ops = ops || {};
            for (var i in ops) {
                switch (i) {
                    case 'startTime':
                    case 'second':
                    case 'scope':
                        this[i] = ops[i];
                        break;
                    case 'onStart':
                    case 'onLoading':
                    case 'onComplete':
                    case 'onInterrupt':
                        this.addEvent(i, ops[i]);
                }
            }
        },
        _getStartTime: function () {
            var stime;
            if (this.startTime && typeof this.startTime === 'object' && this.startTime.get) {
                stime = this.startTime.get();
                stime = stime && stime.time;
                !stime && ((stime = (new Date()).valueOf()) && this.startTime.setAttr('time', stime));
                return stime;
            }
            if (!this.startTime) this.startTime = (new Date()).valueOf();
            return this.startTime;
        },
        __startCoundDown: function () {
            this.sec = this.second - parseInt((new Date() - this._getStartTime()) / 1000);
            if (this.sec <= 0) {
                this.sec = 0;
                this.trigger('onLoading', [this.sec], this.scope || this);
                this.trigger('onComplete', [], this.scope || this);
                this.state = TaxiCommon.CountDown.STATE_COMPLETE;
            } else {
                this.trigger('onLoading', [this.sec], this.scope || this);
                this.state = TaxiCommon.CountDown.STATE_LOADING;
                this._resource = setTimeout(this._startCoundDown, 1000);
            }
        },
        start: function () {
            var startTime = new Date(this._getStartTime()),
                now = new Date(),
                diff = parseInt((now - startTime) / 1000);
            if (diff < this.second) {
                this.sec = this.second - diff;
                this._startCoundDown(diff);
                this.trigger('onStart', [], this.scope || this);
                this.state = TaxiCommon.CountDown.STATE_START;
            } else {
                this.trigger('onStart', [], this.scope || this);
                this.trigger('onLoading', [0], this.scope || this);
                this.trigger('onComplete', [], this.scope || this);
                this.state = TaxiCommon.CountDown.STATE_COMPLETE;
            }
        },
        end: function () {
            this.trigger('onInterrupt', [], this.scope || this);
            this.state = TaxiCommon.CountDown.STATE_INTERRUPT;
            clearTimeout(this._resource);
        },
        reset: function () {
            if (typeof this.startTime === 'object' && this.startTime.setAttr) {
                this.startTime.setAttr('time', +new Date());
            } else {
                this.startTime = +new Date();
            }
        },
        getState: function () {
            return this.state;
        }
    });
    //初始状态
    TaxiCommon.CountDown.STATE_INIT = 0,
    //开始状态
    TaxiCommon.CountDown.STATE_START = 1,
    //读秒状态
    TaxiCommon.CountDown.STATE_LOADING = 2,
    //完成状态
    TaxiCommon.CountDown.STATE_COMPLETE = 3,
    //主动停止
    TaxiCommon.CountDown.STATE_INTERRUPT = 4;

    /**
    * @description: 易道广告
    * @author: lh_sun@ctrip.com
    */

    TaxiCommon.YiDaoAd = function (settings) {
        this.create(settings);
    };


    TaxiCommon.YiDaoAd.prototype = {
        constructor: TaxiCommon.YiDaoAd,
        create: function (settings) {
            
            if(!cBase.isInApp()){
                return;
            }

            var defaultSettings = {
                $container: null,
                view : null,
                actionType: 1,
                className : ''
            };

            this.settings = $.extend(defaultSettings, settings || {});


            this.requestAdView(function( options ){
                this.initialize(options);
            }, function(){
                
            });



        },

        initialize : function(options){
            this.$container = this.settings.$container;
            this.view = this.settings.view;
            this.actionType = this.settings.actionType;
            this.title = options.title;
            this.createHTML(options);
            this.adUrl = cUtility.isPreProduction() == 0 ? options["test_adurl_5.3"] : options["product_adurl_5.3"];
            this.domId = TaxiCommon.YiDaoAd.idCollection[this.actionType];
            this.removeDom();
            this.render(options);
            this.bindEvent();            
        },

        createHTML : function(options){
            var arr = [];
            arr.push('<div class="ctopbar ' + this.settings.className + '" style="display:none;">');
            arr.push(this.actionType && this.actionType == 3 ? options.dcsj_word : options.common_word);
            arr.push('<i class="newarr_r"></i></div>');
            this.html = arr.join('');
        },

        requestAdView: function (successCallback, errorCallback) {
            var self = this;

            var callback = function (data) {
                successCallback.call(self, data);                
            }

            var date = new Date();
            //var url = 'http://m.ctrip.com/client/html5/advertisement.json?time=' + date.getTime();
            var url = 'http://m.ctrip.com/client/html5/yidao.json?time=' + date.getTime();
            if (cUtility.isPreProduction() == 0) {
                url = 'http://waptest.ctrip.com/client/html5/yidao.json?time=' + date.getTime();
            }

            require([url + '&callback=define'],
                function (data) {
                    callback(data);
                }
            );

            /*$.ajax({
                url: url + '&callback=jsonp1',
                dataType: 'jsonp',
                type: 'GET',
                success: callback,
                jsonpCallback : "jsonp1"

                jsonp:"jsonp1",
                jsonpCallback : "jsonp1"
            });*/
        },

        render: function (options) {
            this.$ad = $(this.html);
            this.$ad.attr('id', this.domId);
            //this.$ad.insertBefore(this.$container[0].firstChild);
            this.$container.prepend(this.$ad);  

            var startDate = cDate.parse(options.start_date).getTime(),
                endDate = cDate.parse(options.end_date).getTime(),
                now = cBase.getServerDate().getTime();
            //now = cDate.parse('2014/1/21 00:00:01').getTime();

            //console.log('startDate : ' + startDate);
            //console.log('endDate : ' + endDate);
            //console.log('now : ' + now);

            now > startDate && now < endDate ? this.$ad.show() : this.$ad.hide();                      
        },

        bindEvent : function(){
            this.$ad.bind('click', $.proxy(function(){
                if( this.actionType == 3 ){
                    this.view.forward('seeoff!567');
                }else{
                    var link = this.adUrl;
                    var title = this.title || '春节回家过年1元接送';
                     Guider.jump({ targetModel: 'h5', url: link, title: title });                  
                }
            }, this));
        },

        removeDom : function(){
            $('#' + this.domId).remove();
        },

        destory: function () { 
            this.$ad && this.$ad.unbind('click');
            this.$container = null;
            this.view = null;
            this.actionType = null;
        }
    };

    TaxiCommon.YiDaoAd.defaultOptions = {
	    "test_adurl_5.2" : "http://car.uat.sh.ctriptravel.com/carbooking/activity/yiyuanapp.aspx#yikoujia0121",
	    "product_adurl_5.2" : "http://car.ctrip.com/carbooking/Activity/YiYuanAPP.aspx#yikoujia0121",
	    "test_adurl_5.3" : "http://car.test.sh.ctriptravel.com/carbooking/Activity/YiYuanapp.aspx#yikoujia0121",
	    "product_adurl_5.3" : "http://car.ctrip.com/carbooking/Activity/YiYuanAPP.aspx#yikoujia0121",
	    "dcsj_word" : "送机专车一口价，低过打车价",
	    "common_word" : "接送机一口价，再晚再远也不怕",
	    "title" : "春节回家过年1元接送",
	    "start_date" : "2014/1/22 23:59:00",
	    "end_date" : "2014/2/28 23:59:00"	
    };

    TaxiCommon.YiDaoAd.idCollection = {
        '0': 'yidao-pa',
        '1': 'yidao-pp',
        '2': 'yidao-so',
        '3': 'yidao-stp',
    };


    return TaxiCommon;
});