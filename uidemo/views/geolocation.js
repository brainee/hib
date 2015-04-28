define([ 'cBasePageView', 'cWidgetGeolocation', 'cWidgetFactory', buildViewTemplatesPath('geolocation.html') ], function ( BasePageView, x, WidgetFactory, viewhtml ) {

    var _templateFn = _.template(viewhtml);

    var View = BasePageView.extend({
        render: function () {
            var html = _templateFn();
            this.$el.html(html);        
        },

        onCreate: function () {
            // ?
            this.injectHeaderView();
            // ?
            this.render();
        },

        onShow: function() {
            
        },

        onHide: function() {
            
        },

        onLoad: function () {
            var self = this;

            var Geolocation = WidgetFactory.create('Geolocation');
			var f = function (city) { alert(city.address); }
			Geolocation.requestCityInfo(f);
            
            // 页眉设置
            this.headerview.set({
                // 标题（顶部可见）
                title: 'Geolocation',
                
                // 是否显示“返回”按钮（左上角）
                back: true,

                // ?
                view: self,
                
                // 是否显示“拨打电话”按钮（右上角）
                tel: true,

                // 是否显示“返回主页”按钮
                home: true,

                events: {
                    // ?                
                    returnHandler: function () {
                        this.back('index');
                    }
                }
            });
            
            // 显示页眉            
            this.headerview.show();

            // ? 其中会调用 onShow() 方法，并在其中完成加载到 DOM 的工序。
            this.turning(); 
        }
    });

    return View;
});