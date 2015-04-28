/**
 * Created by huangjianhua on 14-3-5.
 */
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('tabs.html'), 'cUITab'], function (libs, c, pageview, html, cUITab) {
    "use strict";

    var s = null;
    var tablist = null;

    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            this.headerview.set({
                title: 'tab组件',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function () {
                        this.back('index');
                        if (s) s.hide();
                    }
                }
            });

            if(!tablist) {
                var data = [
                    { id: 1, name: '中国' },
                    { id: 2, name: '美国' },
                    { id: 3, name: '英国' }

                ];
                tablist = new cUITab({
                    //容器元素
                    rootBox: this.$('#wrapper'),
                    //对应数据
                    data: data,
                    //设置选择值，必须正确
                    selectedKey: 2,
                    //改变时候触发事件
                    changed: function (data) {

                        var s = '';
                        console.log(data);
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