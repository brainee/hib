"use strict"
define(['libs', 'cBasePageView', buildViewTemplatesPath('layerlist.html')], function (libs, pageview, html) {
  var s = null;

  var View = pageview.extend({
    render: function () {
      this.$el.html(html);
    },

    onCreate: function () {
      this.injectHeaderView();

      this.render();
    },

    events: {
      'click label' : function () {
          this.list.show()
      }
    },

    onLoad: function () {
      //对HeaderView设置数据
      this.headerview.set({
        title: 'LayerList',
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
      this.headerview.show();

      this.turning();
    },

    onShow: function () {
      if (!this.list) {
        var data = [];

        for (var i = 0; i < 4; i++) {
          data.push({ name: '更多操作' + i });
        }

        this.list = new cUILayerList({

          viewdata: {
            list: data
          },
          onItemAction: function (data, index, e) {
             //将item的内容显示到页面上
            $("label").html("<span style='display:block;height:40px;color:red;margin-left:26px'>" + data.name + "</span>");
this.hide()
          }
        });
      }

    window.sss =  this.list;

      this.list.show();

    },

    onHide: function () {
      this.list.cancelAction();
    }

  });

  return View;

});