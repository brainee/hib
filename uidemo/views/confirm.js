"use strict"
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('confirm.html')], function (libs, c, pageview, html) {
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
            'click #demo1': 'testAction'
        },

        testAction: function () {
            s = new c.ui.Alert({
                title: 'confirm title',
                message: 'confirm test',
                type: 'confirm'
            });
            s.show();
        },

        onLoad: function () {
            //对HeaderView设置数据
            this.headerview.set({
                title: 'confirm组件',
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