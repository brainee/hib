/**
 * Created by huangjianhua on 14-3-5.
 */

"use strict"
define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('cuiswitch_2.html')], function(libs, c, pageview, cUI, html) {
    var View = pageview.extend({
        render: function() {
            this.$el.html(html);
        },

        onCreate: function() {
            this.injectHeaderView();
            this.render();
        },

        events: {

        },
        onLoad: function() {
            this.headerview.set({
                title: 'switch',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function() {
                        this.back('index');
                    }
                }
            });
            this.headerview.show();
            this.turning();

            var s = new cUI.cuiSwitch({rootBox: this.$el.find('.hm'), checked: true, changed: function() {
                $('#msg').html($('<div>current status:'+ this.getStatus() +'</div>'));
            }});
        },

        onShow: function() {

        },

        onHide: function() {

        }
    });

    return View;
});

















