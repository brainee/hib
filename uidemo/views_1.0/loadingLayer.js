define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('loadingLayer.html')], function (libs, c, pageview, cUI, html) {
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
            'click #demo': 'showLoading'
        },

        showLoading: function () {
            var l = new c.ui.LoadingLayer(function () {
                alert('执行的内容');
                var s = '';
            });
            l.show();
        },

        onLoad: function () {
            this.headerview.set({
                title: 'loadingLayer组件',
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