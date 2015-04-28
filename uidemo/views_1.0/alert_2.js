/**
 * Created by huangjianhua on 14-3-4.
 */

"use strict"

define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('alert_2.html')], function(libs, c, pageview, html) {
    var s = null;

    var View = pageview.extend({
        render: function() {
           this.$el.html(html);
        },

        onCreate: function() {
            this.injectHeaderView();
            this.render();
        },

        events: {
            'click #demo1': "demo1Alert",
            'click #alert_2': "testAlert"
        },
        demo1Alert: function() {
            this.showMessage('on line');
        },

        testAlert: function() {
            s = new c.ui.Alert({
                title: 'alert title',
                message: 'alert message',
                buttons: [{
                    text: '取消',
                    click: function() {
                        this.hide();
                    }
                }, {
                    text: '确定',
                    click: function() {
                        this.hide();
                    }
                }]
            });
            s.show();
        },

        onLoad: function() {
            this.headerview.set({
                title: 'alert组件',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function() {
                        this.back('index');
                        if(s) s.hide();
                    }
                }
            });
            this.headerview.show();
            this.turning();
        },
        onShow: function() {

        },
        onHide: function() {

        }

    });

    return View;
});