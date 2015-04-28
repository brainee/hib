"use strict"
define(['libs', 'cBase', 'cBasePageView', buildViewTemplatesPath('imglazyload.html'), 'cImgLazyload'], function (libs, cBase, BasePageView, html, cImgLazyload) {

    var viewhtml = '<h1>我是首页</h1><div><button>点击我去list</button></div>';
    var firstCreate = true;

    var View = BasePageView.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();

            this.render();
            var list = this.$el.find('#list');

        },

        events: {
            'click #list li': function (e) {

                this.forward($(e.currentTarget).attr('data-key'));
            },
            'scroll body': function (e) {
                var str = "<li class='hot_img'><img width='142px' height='80px' alt='' src='http://pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png' data-src='http://pkgpic.ctrip.com/images2/1/227/227_43_s31840-m.jpg'></li>";

                $("#wrapper2").append($(str));
            }
        },

        onLoad: function () {
            this.headerview.set({
                title: '延迟加载',
                back: false,
                view: this,
                tel: null
            });
            this.headerview.show();

            this.turning();

            var imgs = this.$('#wrapper1 img');
            var img2 = this.$('#wrapper2 img');
            //var imgs2 = this.$('.cui-slide-imgsinter img');

            ////用法一，推荐用法
            //cImgLazyload.lazyload({
            //  imgs: imgs2,
            //  width: 460,
            //  height: 200
            //});



            //用法二
            window.s1 = new cImgLazyload({
                imgs: imgs
            });

            //用法二
            window.s2 = new cImgLazyload({
                imgs: img2,
                width: 460,
                height: 200

            });

        },

        onShow: function () {

        },

        onHide: function () {

        }

    });

    return View;

});
