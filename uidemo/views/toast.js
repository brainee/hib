"use strict"
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('toast.html')], function (libs, c, pageview, html) {
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
            'click #test1': 'test1Action',
            'click #test2': 'test2Action'
        },
        test1Action: function () {
            s = new c.ui.Toast();
            s.show('hello', 2, function () {
               //no callback
            }, true);
        },
        test2Action: function () {
            s = new c.ui.Toast();
            s.show('hello', 2, function () {
                alert('hello');
            }, true);
        },

        onLoad: function () {

            //对HeaderView设置数据
            this.headerview.set({
                title: 'toast组件',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function () {
                        this.back('index');
                        if(s) s.hide();
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