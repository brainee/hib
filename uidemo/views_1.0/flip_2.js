/**
 * Created by huangjianhua on 14-3-6.
 */
// ------------------------------
// 订单填写
// ------------------------------

define(['libs', 'c', 'cUITab', 'cUICore', 'CarModel', 'CarStore', 'cBasePageView', 'cUITab', buildViewTemplatesPath('flip_2.html'), 'cWidgetFactory'], function (libs, c, cUITab, cui, CarModel, CarStore, BasePageView, cUITab, viewhtml, WidgetFactory) {
    window.log = window.alert;
    var tablist = null;

    var _templateFn = _.template(viewhtml);

    var View = BasePageView.extend({
        hasAd: true,
        render: function () {
            var html = _templateFn();
            this.$el.html(html);
        },

        events: {
            'click #des': function () {
                $.flipDestroy(this.$('#el'));
            }
        },

        native: function () {

        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            var self = this;


            //对HeaderView设置数据
            this.headerview.set({
                title: 'flip手势工具',
                back: null,
                view: self,
                tel: null,
                home: null
            });

            //flip手势
            var el = this.$('#el');
            var currentSelected = 1;  //默认第一个tab的index为0
            var tabsNum = 3;
            var data = [
                { id: 1, name: '中国' },
                { id: 2, name: '美国' },
                { id: 3, name: '英国' }
            ];

            $.flip(el, 'left', function () {
                tablist.setIndex(tablist.getIndex()-1);
            });

            $.flip(el, 'right', function () {
                tablist.setIndex(tablist.getIndex()+1);
            });

            $.flip(el, 'up', function () {
                el.val('up')
            });

            $.flip(el, 'down', function () {
                el.val('down')
            });

            //tabs

            if(!tablist) {
                tablist = new cUITab({
                    //容器元素
                    rootBox: this.$('.tabs'),
                    //对应数据
                    data: data,
                    //设置选择值，必须正确
                    selectedKey: currentSelected,
                    //改变时候触发事件
                    changed: function (data) {

                        var s = '';
                        el.val(data.name);
                    },
                    //扩展应用，暂时不予关注，当返回false时候设置值无效
                    changeAble: function () {
                        //          alert('不能选择')
                        //          return false;
                    }
                });
            }

            this.headerview.show();
            this.turning();

        },

        onShow: function () {

        },

        onHide: function () {
        }
    });

    return View;

});