define(['cStore', 'cBase'], function (AbstractStore, cBase) {
    var DemoStore = DemoStore || {};

    DemoStore.ModelDemoStore = new cBase.Class(AbstractStore, {
        __propertys__: function () {
            this.key = 'P_DEMO';
            this.lifeTime = '2D';
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });

    return DemoStore;
});
