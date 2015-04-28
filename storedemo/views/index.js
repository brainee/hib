"use strict"
define(['cBase', 'cBasePageView', 'cStore', buildViewTemplatesPath('index.html')], function (Base, BasePageView, Store, viewhtml) {

  var StoreCase = new Base.Class(Store, {
    __propertys__: function () {
      this.key = 'STORAGE_EXAMPLE', //设置在localstorage中的key值
        this.lifeTime = '2D'            //生产
    },
    initialize:    function ($super, options) {
      $super(options);
    }
  });

  var storeinstance = StoreCase.getInstance();

  var View = BasePageView.extend({

    events: {
      "click #saveBtn":    "save",
      "click #setAttrBtn": "setAttr",
      "click #readBtn":    "read",
      "click #getAttrBtn": "getAttr",
      "click #deleteBtn":  "_delete"
    },

    save: function () {
      var value = $('#inputvalue').val();
      storeinstance.set({ inputvalue: value });
      alert('保存成功');
    },


    setAttr: function () {
      storeinstance.setAttr("name", 'abc');
      alert('保存成功');
    },

    read: function () {
      var value = storeinstance.get();
      alert(this._getFomatJSON(value));
    },

    getAttr: function () {
      var val = storeinstance.getAttr('name');
      alert(val);
    },

    _delete: function () {
      storeinstance.remove()
    },


    _getFomatJSON: function (jsonObj) {
      // var jsonObj = JSON.parse(jsonStr);
      return JSON.stringify(jsonObj, null, 2);
    },
    onCreate:      function () {
      this.$el.html(viewhtml);
      this.injectHeaderView();
    },

    onLoad: function () {
      // this.headerview就是View含有的HeaderView的全局对象
      this.headerview.set({
        title:  'Store Demo',
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

      //...
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }
  });

  return View;
});