"use strict"
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('demo_alert.html')], function (libs, c, pageview, html) {
    var s = null;

    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();

            this.render();
        },

        events: {
            'click #demo2': 'testAction',
            'click #demo3': 'demo3',
            'click #demo1': function () {
                this.showMessage('一句话就搞定了');

            }
        },

        testAction: function () {
            s = new c.ui.Alert({
                title: '提示信息',
                message: '测试信息',
                buttons: [
                    {
                        text: '取消',
                        click: function () {
                            this.hide();
                        }
                    }
                ]
            });
            s.show();
        },

        demo3: function () {
            s = new c.ui.Alert({
                title: '提示信息',
                message: '测试信息',
                buttons: [
                    {
                        text: '取消',
                        click: function () {
                            this.hide();
                        }
                    },
                    {
                        text: '确定',
                        click: function () {
                            this.hide();
                        }
                    }
                ]
            });
            s.show();
        },

        onLoad: function () {
            //对HeaderView设置数据
            this.headerview.set({
                title: 'alert组件',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function () {
                        this.back('api');
                        if (s) s.hide();
                    }
                }
            });
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