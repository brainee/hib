/**
 * Created by huangjianhua on 14-3-5.
 */

define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('headwarning_2.html')], function(libs, c, pageview, cUI, html) {
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
            'click #demo':'warningAction'
        },

        warningAction: function() {
            this.headerview.hide();
            var that = this;
            s = new cUI.HeadWarning();
            s.setTitle('my title', 'your self', function() {
                that.headerview.show();
                that.back();
                alert('callback function');
            });
            s.show();
        },

        onLoad: function() {
            this.headerview.set({
                title: 'headerWarning',
                view: this,
                back: true,
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