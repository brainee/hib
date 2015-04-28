define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('headwarning.html')], function (libs, c, pageview, cUI, html) {
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
            this.headerview.hide();
            var that = this;
            s = new cUI.HeadWarning();
            s.setTitle('我的标题', '自定义内容', function () {
                that.headerview.show();
                that.back();
                alert('回调的函数');

            });
            s.show();
        },

        onLoad: function () {
            this.headerview.set({
                title: 'headwarning组件',
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