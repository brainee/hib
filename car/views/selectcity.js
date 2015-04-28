// ------------------------------
// 选择用车城市
//
// 1.不再区分不同页面调用用车城市
// 2.去掉定位逻辑
// 3.去掉历史城市
// 4.不再区分国内国外城市
// 5.信息传递不再依靠store，而是url参数
//
// 6.增加注释
// 总代码量 445line->170line
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('selectcity.html')], function (libs, c, CarModel, CarStore, BasePageView, viewhtml) {

    //获得用车城市列表的Model
    var RentSearchCitysModel = CarModel.RentSearchCitysModel.getInstance();

    var View = BasePageView.extend({

        //初始化页面
        render: function () {
            this.$el.html(viewhtml);
            this.els = {
                city_box: this.$el.find('.city_box'),
                city_list: this.$el.find('#city_list'),
                city_associate: this.$el.find('.associate'),
                city_listtpl: this.$el.find('#citylisttpl'),
                city_search_wrap: this.$el.find('.search_wrap'),
                city_confirm: this.$el.find('#city_confirm'),
                city_keyword: this.$el.find('#city_keyword')
            };
            this.lsittplfun = _.template(this.els.city_listtpl.html());
        },

        events: {
            'input #city_keyword': 'cityKeyWordInput',
            'focus #city_keyword': 'cityKeyWordFocus',
            'click .cityitem': 'cityItemClick',
            'click #city_confirm': 'cityConfirmClick'
        },

        //选择城市
        cityItemClick: function (e) {
            var dom = $(e.currentTarget),
                cityname = dom.attr('data-name'),
                cityid = dom.attr('data-id');

            var qs = $.param({ cityname: cityname, cityid: cityid });
            this.back('#rent?' + qs);
        },

        //关键字搜索
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

        //显示“取消”按钮
        cityKeyWordFocus: function () {
            this.els.city_search_wrap.addClass('search_focus');
        },

        //点击“取消”按钮
        cityConfirmClick: function () {
            this.els.city_keyword.val("");
            this.els.city_box.show();
            this.els.city_associate.hide();
        },

        goBack: function () {
            
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();

            //绑定Input组件
            c.ui.InputClear(this.els.city_keyword, null, null, {
                top: 9
            });
        },

        onLoad: function () {
            var self = this;

            this.headerview.set({
                title: '用车城市',
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

            //请求数据及出错处理
            this.showLoading();
            this.updatePage(function () {
                this.hideLoading();
                this.turning();
            }, function () {
                this.hideLoading();
                this.showToast('加载失败，请重试', 2);
            });
        },

        //请求数据
        updatePage: function (callback, error) {
            RentSearchCitysModel.excute(function (data) {
                this.renderList(data);
                callback && callback.call(this);
            }, function () {
                error && error.call(this);
            }, false, this);
        },

        //绘制数据
        renderList: function (data) {
            var paramObj = $.deparam(window.location.hash.replace(/#[^\?]*\?/, ''));

            var html = this.lsittplfun({
                hots: data.hot,
                list: data.list,
                selectedCity: paramObj
            });
            this.els.city_list.html(html);
        },

        onShow: function () {

        },

        onHide: function () {

        },

    });
    return View;
});