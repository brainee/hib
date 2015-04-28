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
                {'uiname':'demo_alert','name':'警告框'},
                {'uiname':'demo_confirm','name':'确认框'},
                {'uiname':'demo_toast','name':'toast框'},
                {'uiname':'demo_loading','name':'loading框'},
                {'uiname':'demo_warning404','name':'warning404'}

        ];

            for (var i = 0, len = listArr.length; i < len; i++) {
                list.append($('<li data-key="' + listArr[i]['uiname'] + '"><a href="javascript:;" >' + listArr[i]['name'] + '</a></li>'))
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
