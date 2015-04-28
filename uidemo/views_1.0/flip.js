/**
 * Created by huangjianhua on 14-3-6.
 */
// ------------------------------
// flip手势结合tabs应用
// ------------------------------

define(['libs', 'c', 'cUITab', 'cUICore', 'CarModel', 'CarStore', 'cBasePageView', 'cUITab', buildViewTemplatesPath('flip.html'), 'cWidgetFactory'], function (libs, c, cUITab, cui, CarModel, CarStore, BasePageView, cUITab, viewhtml, WidgetFactory) {
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
            //触发销毁事件
            'click #des': function () {
                $.flipDestroy(this.$('#el'));
                alert('flip事件已经销毁');
            }
        },

        native: function () {

        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            //对HeaderView设置数据
            this.headerview.set({
                title: 'flip手势工具',
                view: this,
                tel: null,
                home: null,
                back: true,
                events: {
                    returnHandler: function () {
                        this.back('index');
                    }
                }
            });

            //flip手势
            var el = this.$('#el');
            var currentSelected = 1;  //默认选中第一个tab
            //tabs的数据
            var data = [
                { id: 1, name: '中国' },
                { id: 2, name: '美国' },
                { id: 3, name: '英国' }
            ];

            $.flip(el, 'left', function () {
                //setIndex触发tab的切换事件，getIndex是获取当前导航index
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