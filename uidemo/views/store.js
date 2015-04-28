"use strict"
define(['cBase', 'cBasePageView', 'cStore', buildViewTemplatesPath('store.html')], function (Base, BasePageView, Store, viewhtml) {
    var StoreCase = new Base.Class(Store, {
        __propertys__: function () {
            this.key = 'STORAGE_EXAMPLE',
                this.lifeTime = '2D'
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    var storeinstance = StoreCase.getInstance();
    var View = BasePageView.extend({
        events: {
            'click #saveBtn': 'save',
            'click #setAction': 'setAttr',
            'click #readBtn': 'read',
            'click #getAttrBtn': 'getAttr',
            'click #deleteBtn': '_delete'
        },

        save: function() {
            var value = $('#inputvalue').val();
            storeinstance.set({ inputvalue: value });
            alert('保存成功');
        },

        setAttr: function() {
            storeinstance.setAttr('name', 'abc');
            alert('保存成功');
        },

        read: function() {
            var value = storeinstance.get();
            alert(this._getFomatJSON(value));
        },

        getAttr: function() {
            var val = storeinstance.getAttr('name');
            alert(val);
        },

        _delete: function() {
            storeinstance.remove();
        },

        _getFomatJSON: function(jsonObj) {
            return JSON.stringify(jsonObj, null, 2);
        },
        onCreate: function() {
            this.$el.html(viewhtml);
            this.injectHeaderView();
        },

        onLoad: function() {
            this.headerview.set({
               title: 'Store demo',
                view: this,
                back: true,
                home: true,
                tel: {
                    number: 4000086666
                },
                events: {
                    returnHandler: function() {

                    },
                    homeHandler: function() {

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