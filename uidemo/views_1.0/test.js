// ------------------------------
// 选择用车城市
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('test.html')], function (libs, c, CarModel, CarStore, BasePageView, viewhtml) {

    var HistorySearchCitysStore = CarStore.HistorySearchCitysStore.getInstance();
    var CurrentCityInfoStore = CarStore.CurrentCityInfoStore.getInstance();

    var View = BasePageView.extend({

        pageid: '',

        //当前选中TAB
        CRT_TAB: 0,

        //pickon : 接机/接火车 hotline：热门线路 seeoff：送机/送火车 rent：日租/时租
        PAGE_TYPE: null,
        ENUM_PAGETYPE: {
            pickon: CarStore.ENUM_PAGETYPE_PICKON,
            seeoff: CarStore.ENUM_PAEGTYPE_SEEOFF,
            rent: CarStore.ENUM_PAGETYPE_RENT,
            hotline: CarStore.ENUM_PAGETYPE_HOTLINE
        },

        positioncity: new CarModel.PositionCity(),

        //根据PAGE_TYPE获得相应的城市查询MODEL
        getSearchCitysModel: function (type) {
            switch (type) {
                case CarStore.ENUM_PAGETYPE_PICKON:
                    return CarModel.PickonSearchCitysModel.getInstance();
                case CarStore.ENUM_PAEGTYPE_SEEOFF:
                    return CarModel.SeeoffSearchCitysModel.getInstance();
                case CarStore.ENUM_PAGETYPE_RENT:
                    return CarModel.RentSearchCitysModel.getInstance();
                case CarStore.ENUM_PAGETYPE_HOTLINE:
                    return CarModel.HotlineSearchCitysModel.getInstance();
            }
        },

        getSearchCitysModelClass: function (type) {
            switch (type) {
                case CarStore.ENUM_PAGETYPE_PICKON:
                    return CarModel.PickonSearchCitysModel;
                case CarStore.ENUM_PAEGTYPE_SEEOFF:
                    return CarModel.SeeoffSearchCitysModel;
                case CarStore.ENUM_PAGETYPE_RENT:
                    return CarModel.RentSearchCitysModel;
                case CarStore.ENUM_PAGETYPE_HOTLINE:
                    return CarModel.HotlineSearchCitysModel;
            }
        },

        //根据PAGE_TYPE获得相应查询页的查询参数STORE
        getSearchCityParmsStory: function (type) {
            switch (type) {
                case CarStore.ENUM_PAGETYPE_PICKON:
                    return CarStore.PortSearchParam.getInstance();
                case CarStore.ENUM_PAEGTYPE_SEEOFF:
                    return CarStore.SeeoffParamStore.getInstance();
                case CarStore.ENUM_PAGETYPE_RENT:
                    return CarStore.RentParamStore.getInstance();
                case CarStore.ENUM_PAGETYPE_HOTLINE:
                    return CarStore.HotlineParamStore.getInstance();
            }
        },

        render: function () {
            this.$el.html(viewhtml);
            this.els = {
                city_box: this.$el.find('.city_box'),
                city_inlandbox: this.$el.find('#city_inlandbox'),
                city_interbox: this.$el.find('#city_interbox'),
                city_associate: this.$el.find('.associate'),
                city_listtpl: this.$el.find('#citylisttpl'),
                city_search_wrap: this.$el.find('.search_wrap'),
                city_tab: this.$el.find('#city_tab'),
                city_confirm: this.$el.find('#city_confirm'),
                city_keyword: this.$el.find('#city_keyword')
            };
            this.lsittplfun = _.template(this.els.city_listtpl.html());
        },

        events: {
            'input #city_keyword': 'cityKeyWordInput',
            'focus #city_keyword': 'cityKeyWordFocus',
            'click #city_tab li[data-id]': 'cityChangeTab',
            'click .cityitem': 'cityItemClick',
            'click #city_confirm': 'cityConfirmClick'
        },

        cityItemClick: function (e) {
            var dom = $(e.currentTarget),
                cityname = dom.attr('data-name'),
                cityid = dom.attr('data-id'),
                cityattr = dom.attr('data-attr');

            var SearchCityParmsStory = this.getSearchCityParmsStory(this.PAGE_TYPE);
            SearchCityParmsStory.saveFieldVal(cityname, cityid, cityattr);

            var data = {
                id: cityid,
                dsp: cityname,
                attr: cityattr
            };
            this.addHistory(data);

            this.goBack();
        },

        cityKeyWordInput: function (e) {
            var input = $(e.currentTarget),
                key = input.val().toLowerCase();

            if (key.length) {
                var list = this.els.city_box.find('[data-filter*="' + key + '"]'), clist, hit = {};
                this.els.city_box.hide();
                this.els.city_associate.hide();
                this.els.city_associate.empty();
                clist = list.clone();

                _.each(list, $.proxy(function (el, index) {
                    var $el = $(el.cloneNode(true));
                    this.els.city_associate.append($el);
                }, this));

                if (!list.length) {
                    this.els.city_associate.html('<dd class="emptyitem">没有结果</dd>');
                }
                this.els.city_associate.show();
            } else {
                this.els.city_associate.empty();
            }
        },

        cityKeyWordFocus: function () {
            this.els.city_search_wrap.addClass('search_focus');
            var self = this;
            setTimeout(function () {
                $(window).bind('scroll', self._onScroll);
            }, 1000);
        },

        cityConfirmClick: function () {
            this.els.city_keyword.val("");
            this.els.city_box.show();
            this.els.city_associate.hide();
        },

        cityChangeTab: function (e) {
            this.els.city_keyword.blur(); //解决IOS不失去焦点的问题
            var target = $(e.currentTarget);
            var selTab = parseInt(target.attr('data-id'), 10);
            if (this.CRT_TAB != selTab) {
                this.els.city_tab.find('li').removeClass('tabcrt');
                target.addClass('tabcrt');
                this.CRT_TAB = selTab;
                switch (selTab) {
                    case 0:
                        this.showInland();
                        break;
                    case 1:
                        this.showInter();
                        break;
                }
            }
        },

        goBack: function () {
            this.positioncity.endPosition();
            switch (this.PAGE_TYPE) {
                case CarStore.ENUM_PAGETYPE_PICKON:
                    this.back('pickonport');
                    this.pageid = '214246';
                    break;
                case CarStore.ENUM_PAEGTYPE_SEEOFF:
                    this.back('seeoff');
                    this.pageid = '214259';
                    break;
                case CarStore.ENUM_PAGETYPE_HOTLINE:
                    this.back('hotline');
                    this.pageid = '';
                    break;
                case CarStore.ENUM_PAGETYPE_RENT:
                    this.back('rent');
                    this.pageid = '214268';
                    break;
            }
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
            this._onScroll = $.proxy(this.onScroll, this);
            c.ui.InputClear(this.els.city_keyword, null, null, {
                top: 9
            });
        },

        onLoad: function (referrer) {
            window.__CAR_SELECT_CITY_WARNING = false;
            this.referrer = referrer || '';

            var self = this;

            switch (this.referrer) {
                case 'pickonport':
                    self.pageid = '214248';
                    break;
                case 'seeoff':
                    self.pageid = '214261';
                    break;
                case 'rent':
                    self.pageid = '214269';
                    break;
            }

            var pagePath = this.getPath(0);
            this.PAGE_TYPE = this.ENUM_PAGETYPE[pagePath];

            //对HeaderView设置数据
            this.headerview.set({
                //title: '用车城市',
                title: self.updateTitle(),
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

            //重置上次输入记录
            this.cityConfirmClick();

            var HistorySearchCitysData = HistorySearchCitysStore.get();
            this.CRT_TAB = HistorySearchCitysData ? HistorySearchCitysData.crt || 0 : 0;

            this.showLoading();
            this.updatePage(function () {
                this.hideLoading();
                this.turning();
            }, function () {
                this.hideLoading();
                this.showToast('加载失败，请重试', 2, function () {
                    //为解决bug:0036248
                    window.__CAR_SELECT_CITY_WARNING = true;
                    self.back(this.referrer);
                });
            });
        },

        updateTitle: function () {
            switch (this.PAGE_TYPE) {
                case CarStore.ENUM_PAGETYPE_PICKON:
                    return '用车城市';
                case CarStore.ENUM_PAEGTYPE_SEEOFF:
                    return '用车城市';
                case CarStore.ENUM_PAGETYPE_RENT:
                    return '用车城市';
                case CarStore.ENUM_PAGETYPE_HOTLINE:
                    return '出发城市';
            }
        },

        updatePage: function (callback, error) {
            var SearchCitysModel = this.getSearchCitysModel(this.PAGE_TYPE);

            SearchCitysModel.excute(function (data) {
                if (data && data.citymap && _.size(data.citymap) == 0) {
                    SearchCitysModel.excute(function (data) {
                        this.renderList(data);
                        callback && callback.call(this);
                    }, function () {
                        error && error.call(this);
                    }, true, this);
                } else {
                    this.renderList(data);
                    callback && callback.call(this);
                }
            }, function () {
                error && error.call(this);
            }, false, this);
        },

        renderList: function (data) {
            var SearchCityParmsStory = this.getSearchCityParmsStory(this.PAGE_TYPE);
            var cityinfo = SearchCityParmsStory.getCity();

            var history = HistorySearchCitysStore.get() || {};

            var _inland = [],
                _inter = [];

            for (var i = 0; i < history.inland.length; i++) {
                _.each(data.citymap, function (city) {
                    if (city.name == history.inland[i].dsp) {
                        _inland.push(history.inland[i]);
                    }
                });
            }

            for (var j = 0; j < history.inter.length; j++) {
                _.each(data.citymap, function (city) {
                    if (city.name == history.inter[j].dsp) {
                        _inter.push(history.inter[j]);
                    }
                });
            }

            var inlandhtml = this.lsittplfun({
                hots: data.inlandhot,
                list: data.inland,
                history: _inland,
                selectedCity: cityinfo
            });
            this.els.city_inlandbox.html(inlandhtml);

            var interhtml = this.lsittplfun({
                hots: data.interhot,
                list: data.inter,
                history: _inter,
                selectedCity: cityinfo
            });
            this.els.city_interbox.html(interhtml);

            switch (this.CRT_TAB) {
                case 0:
                    this.showInland();
                    break;
                case 1:
                    this.showInter();
                    break;
            }


        },

        showInland: function () {
            this.els.city_tab.find('li').removeClass('tabcrt');
            this.els.city_tab.find('li').first().addClass('tabcrt');
            this.els.city_interbox.css('display', 'none');
            this.els.city_inlandbox.css('display', 'block');
        },

        showInter: function () {
            this.els.city_tab.find('li').removeClass('tabcrt');
            this.els.city_tab.find('li').last().addClass('tabcrt');
            this.els.city_inlandbox.css('display', 'none');
            this.els.city_interbox.css('display', 'block');
        },

        /*历史记录STORE处理
         */
        addHistory: function (data) {
            var oldlist = [];
            var HistorySearchCitysData = HistorySearchCitysStore.get();

            if (data.attr == 1) {
                oldlist = HistorySearchCitysData ? HistorySearchCitysData.inland : [];
                var _list = this.doHistorySubList(oldlist, data);
                HistorySearchCitysData.inland = _list;
                HistorySearchCitysData.crt = 0;
            } else {
                oldlist = HistorySearchCitysData ? HistorySearchCitysData.inter : [];
                var _list = this.doHistorySubList(oldlist, data);
                HistorySearchCitysData.inter = _list;
                HistorySearchCitysData.crt = 1;
            }

            HistorySearchCitysStore.set(HistorySearchCitysData);
        },

        doHistorySubList: function (oldlist, data) {
            var _list = oldlist;
            var _index = -1;
            for (var i = 0, len = _list.length; i < len; i++) {
                if (_list[i].dsp == data.dsp) {
                    _index = i;
                    break;
                }
            }
            if (_index >= 0) {
                _list.splice(_index, 1);
            }
            _list.unshift(data);
            _list.splice(3, _list.length); //3为最大长度

            return _list;
        },

        onShow: function () {
            //城市定位
            var self = this;
            CurrentCityInfoStore.setSubKey(this.getSearchCitysModel(this.PAGE_TYPE).getSubKey());
            var cityinfo;
            if (CurrentCityInfoStore.isPosition() && (cityinfo = CurrentCityInfoStore.getCurCity())) {
                this.updateCrtCity(cityinfo);
            } else {
                this.$el.find('.city_local').html('定位中');
                this.positioncity.startPosition(this.getSearchCitysModelClass(this.PAGE_TYPE), function (data) {
                    if (data) {
                        self.updateCrtCity(data);
                    } else {
                        self.$el.find('.city_localbox').hide();
                    }
                }, function () {
                    self.$el.find('.city_localbox').hide();
                }, this);
            }
        },

        updateCrtCity: function (data) {
            //增加 data是否 null判断 update by caof 2013-10-19
            if (data) {
                this.$el.find('.city_local').html(data.name);
                this.$el.find('.city_local').attr('data-id', data.id);
                this.$el.find('.city_local').attr('data-name', data.name);
                this.$el.find('.city_local').attr('data-attr', data.attr);

                var SearchCityParmsStory = this.getSearchCityParmsStory(this.PAGE_TYPE);
                var cityinfo = SearchCityParmsStory.getCity();
                if (data.id == cityinfo.cityid) {
                    this.$el.find('.city_local').addClass('ok_crt');
                }
            }
        },
        onHide: function () {
            $(window).unbind('scroll', this._onScroll);
        },
        //当窗口滚动时，触发
        onScroll: function (e) {
            this.els.city_keyword.blur();
            $(window).unbind('scroll', this._onScroll);
        }
    });
    return View;
});