define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('inputclear.html')], function (libs, c, pageview, cUI, html) {
    "use strict";

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
            //c.ui.InputClear(this.$el.find('#input'));
            c.ui.InputClear(this.$el.find('#input'), null, null, {
                top: 10,
                right: 5
            });
        },

        onLoad: function () {
            this.headerview.set({
                title: 'inputclear组件',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function () {
                        this.back('index');
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