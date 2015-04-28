// ------------------------------
// 出发/到达地
//
// 1.去掉历史记录
// 2.去掉用户填写出发/到达地
// 3.去掉选择出发/到达地
// 4.去掉异地打车判断
// 5.去掉出发还是到达的判断，统一为出发地
// 6.去掉选择城市为非定位城市周边地标的显示判断（周边地标在任何情况都显示）
//
// 7.增加注释 
// 总代码量 517line->306line
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore',  'cBasePageView', buildViewTemplatesPath('taxisentaddress.html'), 'cUtility', 'cWidgetFactory', 'cGeoService'], function (libs, c, CarModel, CarStore,  BasePageView, viewhtml, cUtility, WidgetFactory, GeoService) {

    //用来处理参数传递
    var AddressStore = CarStore.AddressStore.getInstance();

    //高德接口，定位，周边，关键字
    var GeoLocation = GeoService.GeoLocation;
    var GeoAround = GeoService.GeoAround;
    var GeoKeyword = GeoService.GeoKeyword;

    //关键字查询队列
    var sq = new cUtility.SimpleQueue();

    var View = BasePageView.extend({

        //定位城市
        posCity: "",

        //选择城市
        selCity: "",

        render: function () {
            this.$el.html(viewhtml);

            this.els = {
                city_listtpl: this.$el.find('#taxisentcitylisttpl'),
                city_box: this.$el.find('.city_box'),
                city_associate: this.$el.find('.associate'),
                city_inlandbox: this.$el.find('#city_inlandbox'),
                city_localbox: this.$el.find('#city_localbox'),
                city_keyword: this.$el.find('#city_keyword_u'),
                city_local: this.$el.find('.city_local')
            };

            this.listtplfun = _.template(this.els.city_listtpl.html());

            c.ui.InputClear(this.els.city_keyword, null, null, {
                top: 9
            });
        },

        events: {
            'click .cityitem': 'cityItemClick',
            'input #city_keyword_u': 'onInput',
        },

        //点击选择事件
        cityItemClick: function (e) {
            var dom = $(e.currentTarget),
                name = dom.attr('data-name'),
                addr = dom.attr('data-addr'),
                city = dom.attr('data-city'),
                lng = dom.attr('data-lng'),
                lat = dom.attr('data-lat');

            //传回选择地点
            AddressStore.save({ city: city, name: name, addr: addr, lng: lng, lat: lat }, $.proxy(function () {
                this.goBack();
            }, this));
            //var qs = $.param({ city: city, name: name, addr: addr, lng: lng, lat: lat });
            //this.back('#booking?' + qs);
        },

        //加入事件队列
        onInput: function (e) {
            var dom = $(e.currentTarget);
            var self = this;

            sq.add(function () {
                self.cityKeyWordInput(dom.val(), function () {
                    sq.next();
                });
            });
        },

        //关键字查询
        cityKeyWordInput: function (key, callback) {
            if (key.length) {
                this.els.city_box.hide();

                var city = this.selCity;

                //高德关键字查询接口
                GeoKeyword.Subscribe(key, city, function (data) {//
                    var _list = [], html = [];

                    for (var i = 0, ilen = data.length; i < ilen; i++) {
                        var pos = data[i];
                        var _index = -1;
                        for (var j = 0, len = _list.length; j < len; j++) {
                            if (_list[j] == pos.name + pos.address) {
                                _index = j;
                                break;
                            }
                        }
                        if (_index < 0) {
                            html[html.length] = '<dd class="cityitem" data-name="' + pos.name
                               + '" data-city="' + city
                               + '" data-addr="' + pos.address
                               + '" data-lng="' + pos.location.split(',')[0]
                               + '" data-lat="' + pos.location.split(',')[1] + '">'
                               + pos.name + '<small class="ellips_line2">' + pos.address + '</small></dd>';

                            _list.unshift(pos.name + pos.address);
                        }
                    }
                    this.els.city_associate.html(html.join(''));

                    if (!data.length) {
                        this.els.city_associate.html('<dd class="emptyitem">未找到地址</dd>');
                    }
                    callback && callback();
                }, function () {
                    //console.log('error');
                    callback && callback();
                }, this);
                this.els.city_associate.show();
            } else {
                this.els.city_associate.empty();
                this.els.city_associate.hide();
                this.els.city_box.show();

                callback && callback();
            }
        },

        goBack: function () {
            this.back();
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            var self = this;
            //对HeaderView设置数据
            this.headerview.set({
                //title: '出发地点',
                title: "出发地点",
                back: true,
                view: self,
                tel: null,
                home: null,
                events: {
                    returnHandler: function () {
                        self.goBack();
                    }
                }
            });

            //将HeaderView显示出来
            this.headerview.show();

            //获得出发地/到达地类型
            var paramObj = $.deparam(window.location.hash.replace(/#[^\?]*\?/, ''));
            if (paramObj && paramObj.area) {

            }

            this.turning();
            this.updatePage();
        },

        //重置上次关键字记录
        resetLastKeyword: function () {
            this.els.city_keyword.val("");
            this.els.city_box.show();
            this.els.city_associate.hide();
        },

        //更新页面
        updatePage: function () {
            var self = this;

            //重置上次输入记录
            this.resetLastKeyword();

            //获得上路选中的城市
            AddressStore.getValue($.proxy(function (data) {
                this.selCity = data.city || "北京";

                //高德定位获得当前位置
                GeoLocation.Subscribe('taxi/taxisentaddress', {
                    onStart: function () {
                        //定位开始
                    },
                    onComplete: function (pos) {
                        //定位完成
                        self.posCity = pos.city.replace(/市$/, '');
                        var _html = '<dt>当前位置及周边</dt><dd class="cityitem" data-name="' + pos.address
                            + '" data-city="' + self.posCity//
                            + '" data-addr="' + pos.address
                            + '" data-lng="' + pos.lng
                            + '" data-lat="' + pos.lat + '">'
                            + pos.address + '<small class="ellips_line2">'
                            + pos.address + '</small></dd>';
                        self.els.city_localbox.show();
                        self.els.city_localbox.html(_html);

                        //高德周边查询
                        GeoAround.Subscribe(pos.lng + ',' + pos.lat, function (data) {
                            self.renderList(data);
                        }, function () {
                            //error && error.call(this);
                        }, self);
                    },
                    onError: function () {
                        //定位成功，但高德请求您异常
                        self.els.city_localbox.hide();
                    },
                    onPosError: function () {
                        //定位失败
                        var _html = '<dt>当前位置及周边</dt><dd>定位失败</dd>'; //
                        self.els.city_localbox.html(_html);
                    }
                }, self);  
            }, this));
        },

        //绘制高德关键字查询返回数据
        renderList: function (data) {
            data.city = this.posCity;
            var html = this.listtplfun({
                list: data
            });
            this.els.city_inlandbox.html(html);
        },
        
        onShow: function () {

        },

        onHide: function () {
            //取消定位
            GeoLocation.UnSubscribe('taxi/taxisentaddress');
        }
    });

    return View;
});