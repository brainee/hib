/**
 * Created by huangjianhua on 14-3-6.
 */
/**
 * Created by huangjianhua on 14-3-5.
 */
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('selectcity.html')], function (libs, c, pageview, html) {
    "use strict";

    var s = null;


    var StoreCase = new c.base.Class(c.store, {
        __propertys__: function () {
            this.key = 'STORAGE_EXAMPLE', //设置在localstorage中的key值
                this.lifeTime = '2D'            //生产
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    var storeinstance = StoreCase.getInstance();



    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            this.headerview.set({
                title: '选择城市',
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

            var cityObj = storeinstance.getAttr('citycurstore');
            console.log()
            if (cityObj) {
                this.$('.acityname').html(cityObj.name);
            }

            this.headerview.show();
            this.turning();
        },
        events: {
            'click .selectcity': 'toCityList'
        },
        toCityList: function () {
            this.forward('citylist');
        },

        onShow: function () {

        },

        onHide: function () {

        }

    });

    return View;

});