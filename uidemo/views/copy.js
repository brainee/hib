"use strict"
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('copy.html'),'cWidgetFactory', 'cWidgetCalendar'], function (libs, c, pageview, html, WidgetFactory) {
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
                        this.back('index');
                        if (s) s.hide();
                    }
                }
            });

            var Calendar = WidgetFactory.create('Calendar');
            var cal = new Calendar({
                rootBox: '.cal'
            });
            cal.show();

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