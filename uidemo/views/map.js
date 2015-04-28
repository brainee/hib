define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('map.html'), 'cWidgetFactory', 'cWidgetGeolocation'], function (libs, c, pageview, html, factory) {

  var geolocation = factory.create('Geolocation');

  var View = pageview.extend({
    render: function() {
      this.$el.html(html);
    },

    onCreate: function() {
        this.injectHeaderView();
        this.render();
    },

    onLoad: function() {
        this.headerview.set({
           title: 'map组件',
            back:true,
            view: this,
            tel: null,
            events: {
                returnHandler: function() {
                    this.back('index');
                }
            }
        });
        this.headerview.show();
        this.turning();
    },

    onShow: function() {
		var setting =[{
			lng: '116.397428',
			lat: '39.90923',
			content: '中心点',
			id: 'mapcontainer'
		},{
			lng: '116.225883',
			lat: '39.552804',
			content: '测试点1'

		},{
			lng: '116.379689',
			lat: '39.93622',
			content: '测试地点2'

		}] 
		geolocation.requestMap(setting);
    },

    onHide: function() { }
  });

  return View;
});