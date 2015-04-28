"use strict"
define(['libs', 'cBasePageView', buildViewTemplatesPath('testLink.html')], function (libs, pageview, html) {


  var View = pageview.extend({
    render: function () {
      this.$el.html(html);
    },

    onCreate: function () {
      this.injectHeaderView();

      this.render();
    },

    events: {
     
    },

    onLoad: function () {
      //对HeaderView设置数据
      this.headerview.set({
        title: '测试文档',
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

  });

  return View;

});