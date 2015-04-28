"use strict"
define(['cBase', 'cBasePageView', 'DemoModel', buildViewTemplatesPath('index.html')], function (cBase, BasePageView, DemoModel, viewhtml) {

  var noStoreModel = DemoModel.noStoreModel.getInstance(),
    storeModel = DemoModel.StoreModel.getInstance();

  var View = BasePageView.extend({

    events: {
      'click #noStoreBtn': 'noStoreReq',
      'click #storeBtn':   'storeReq'
    },

    onCreate: function () {
      this.$el.html(viewhtml);
      this.injectHeaderView();
    },

    onLoad:     function () {
      // this.headerview就是View含有的HeaderView的全局对象
      this.headerview.set({
        title:  'Model Demo',
        view:   this,
        back:   true,
        home:   true,
        tel:    {
          number: 4000086666
        },
        events: {
          returnHandler: function () {
          },
          homeHandler:   function () {
          }
        }
      });
      // 显示headerview
      this.headerview.show();


      //启动转场
      this.turning();
    },


    //nostoreModel Demo
    noStoreReq: function () {
      //成功回调
      var success = function (data) {
        console.log(data);
      };

      //失败回调
      var error = function (e) {
        console.log(e);
      };

      //取消请求
      var complete = function (e) {
        console.log(e);
      };

      //请求数据
      noStoreModel.excute(success, error, false, this, complete);
    },


    storeReq: function () {
      //成功回调
      var success = function (data) {
        console.log(data);
      };

      //失败回调
      var error = function (e) {
        console.log(e);
      };

      //取消请求
      var complete = function (e) {
        console.log(e);
      };

      //请求数据
      storeModel.excute(success, error, false, this, complete);
    },
    onShow:   function () {

    },

    onHide: function () {

    }
  });

  return View;
});