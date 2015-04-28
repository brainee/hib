"use strict"
define(['libs', 'cBase', 'cBasePageView','cImgLazyload', buildViewTemplatesPath('myimglazyload.html')], function (libs, cBase, BasePageView, cImgLazyload, html) {
    var viewhtml = '<h1>我是首页</h1><div><button>点击我去list</button></div>';
    var firstCreate = true;
    var s1 = null;
    var View = BasePageView.extend({
        render: function () {
            this.$el.html(html);
        },
        onCreate: function () {
            this.injectHeaderView();
            this.render();
           // var list = this.$el.find('#list');
        },
        events: {
            
        },
        onLoad: function () {
            this.headerview.set({
                title: '延迟加载',
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
            var imgs = this.$('#img_list li img');
            s1 = new cImgLazyload({
                imgs: imgs
            });
            //s1.fadeIn();
        },
    });
    return View;
})
