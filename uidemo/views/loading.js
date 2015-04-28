define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('loading.html')], function (libs, c, pageview, cUI, html) {
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
            'click #demo': 'showLoading',
            'click #demo2': 'showLoadingLayer'
        },

        showLoading: function () {
            s = new cUI.Loading();
            s.show();
            setTimeout(function () {
                s.hide();
            }, 2000);
        },

        showLoadingLayer: function() {
            var loadingLayer = new c.ui.LoadingLayer(function() {
                alert('执行的内容');
                var s = '';
            },"自定义文字");
            loadingLayer.show();
        },

        onLoad: function () {
            this.headerview.set({
                title: 'loading组件',
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