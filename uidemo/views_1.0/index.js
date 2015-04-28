"use strict"
define(['libs', 'cBasePageView', buildViewTemplatesPath('index.html')], function (libs, BasePageView, html) {
    var viewhtml = '<h1>我是首页</h1><div><button>点击我去list</button></div>';

    var View = BasePageView.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();

            this.render();
            var list = this.$el.find('#list');
            var listArr = [
            'alert',
            'alert_2',
            'headWarning',
            'headWarning_2',
            'inputClear',
            'inputClear_2',
            'loading',
            'loading_2',
            'loadingLayer',
            'InputValidator',
            'InputValidator_2',
            'mask',
            'scrollRadio',
            'scrollRadioList',
            'toast',
            'warning404',
            'cuiSwitch',
            'cuiSwitch_2',
            'num',
            'scrolldemo',
            'tabs',
            'selectcity',
            'citylist',
            'citylist_2',
            'test',
            'test2',
            'demo_c',
            'flip',
            'flip_2'

        ];

            for (var i = 0, len = listArr.length; i < len; i++) {
                if (listArr[i] == "InputValidator") {
                    list.append($('<li data-key="' + listArr[i] + '"><a href="javascript:;" >c.widget.' + listArr[i] + '</a></li>'))
                }
                else {
                    list.append($('<li data-key="' + listArr[i] + '"><a href="javascript:;" >c.ui.' + listArr[i] + '</a></li>'))
                }
            }
        },

        events: {
            'click #list li': function (e) {

                this.forward($(e.currentTarget).attr('data-key'));
            }
        },

        onLoad: function () {
            this.headerview.set({
                title: 'demo列表',
                back: false,
                view: this,
                tel: null
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
