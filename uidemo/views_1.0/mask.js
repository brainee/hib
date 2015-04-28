define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('mask.html')], function (libs, c, pageview, cUI, html) {
    "use strict";
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
            'click #demo': 'testAction'
        },

        testAction: function () {
            s = new c.ui.Mask({
                classNames: ['cui-opacitymask']
            });
            s.show();

            setTimeout(function () {
                s.hide();
            }, 2000);
        },

        onLoad: function () {
            this.headerview.set({
                title: 'mask组件',
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