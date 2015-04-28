define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('clipboard.html'), 'cWidgetFactory', 'cWidgetGuider'], function (libs, c, pageview, cUI, html, WidgetFactory) {
    "use strict";

    var Guider = WidgetFactory.create('Guider');

    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();

            this.render();
        },

        events: {
            'click #demo1': 'testAction1',
            'click #demo2': 'testAction2'
        },

        testAction1: function () {
            Guider.copyToClipboard({content: $('#input1').val()});
        },

        testAction2: function () {
            Guider.readFromClipboard({callback: function (key) {
                $('#input2').value(key);
            }});
        },

        onLoad: function () {
            this.headerview.set({
                title: '粘贴板操作',
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