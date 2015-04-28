define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('map.html'), 'cWidgetFactory', 'cWidgetGeolocation'], function (libs, c, pageview, html, factory) {

  var geolocation = factory.create('Geolocation');

  var View = pageview.extend({
    render: function() {
      this.$el.html(html);
    },

    onCreate: function() {
      this.render();
    },

    onLoad: function() {
      this.turning();
    },

    onShow: function() {

      var setting = {
        lat: '116.397428',
        lng: '39.90923',
        content: 'xxxxx',
        id: 'mapcontainer'
      }

      geolocation.requestMap(setting);
    },

    onHide: function() { }
  });

  return View;
});