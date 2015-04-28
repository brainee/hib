define(['libs','c', 'cWidgetFactory', 'cWidgetHeaderView', 'cWidgetGuider'], function(libs, c, WidgetFactory){
  "use strict";

  var Guider = WidgetFactory.create('Guider');
  var options = options || {};

  /********************************
   * @description: ��PageViewע��HeaderViewʵ��
   */
  options.injectHeaderView = function (data) {
    $('#headerview').remove();
    var HeaderView = WidgetFactory.create('HeaderView');
    this.headerview = new HeaderView(data);
    //this.$el.append(this.headerview.getView());
    $('#main').before(this.headerview.getView());
  };

  // ��дc.view����header�����ã�ȥ����ȥ���ö������ڵĿؼ�Ӱ��
  options._initializeHeader = function(){};
  options._getDefaultHeader = function(){};

  // @deprecated
  //options.registerCallback = function(callback, timeout){
    //timeout =  timeout ? timeout:400;
    //var self = this;
    //var Publisher = WidgetFactory.create('Publisher');

    //Publisher.register({
    //  name: 'login',
    //  success: function(){
    //    setTimeout(function() { callback(); }, timeout);
    //  }
    //});
  //};

  options.hybridBridgeRender = function () {
    //------------------------
    // @author Michael.Lee
    // ����Ⱦҳ��֮ǰ��App������Web������ͬ�Ĵ���������App��תH5��ҳ�涼Ҫ��callAppInitȥ��ʼ������

    var self = this;
    //var Guider = widgetFactory.create('Guider');

    //var hybridCallback = function () {
    //  self.callAppInit($.proxy(self.showView, self));
    //};
    var hybridCallback = $.proxy(self.showView, self);
    var callback = $.proxy(self.showView, self);

    Guider.apply({
      hybridCallback: hybridCallback,
      callback: callback
    });
    //-------------------------  
  };

  options.registerCallback = function (callback) {
    //var Guider = WidgetFactory.create('Guider');
    //Guider.register({ tagname: 'METHOD_BECOME_ACTIVE', callback: callback });
  };

  options.callAppInit = function (callback) {
    var version = 0;
    if (window.localStorage) {
      var appInfo = window.localStorage.getItem('APPINFO');

      appInfo = JSON.parse(appInfo);
      if(appInfo) version = appInfo.version;
    }
    Guider.init({version: version, callback: callback});
  };

  var BasePageView = c.view.extend(options);

  //�������¼���
  BasePageView.ONCLICK = 'click';

  return BasePageView;

  // ----------------------------------------------------------------- //
  // ʹ�÷���
  //
  //  var View = BasePageView.extend({
  //    onCreate: function(){
  //       this.injectHeaderView();
  //    },
  //    onLoad: function(){
  //       ��ҪHeaderView������
  //       this.headerview.set(data);
  //       this.headerview.show();
  //    }
  //  });
  //  ��onCreate����ʾ�ĵ���injectHeaderView��������Դ������ݣ�������ﴫ�������ݣ���ôonLoad����ȥset���ݾͲ���Ҫ��
  //  ��onLoad���߼��������ݿ�ʼ��Ⱦ�����ʱ�����this.headerview.set(data)������
  // ----------------------------------------------------------------- //

});