/**
* @author l_wang王磊 <l_wang@Ctrip.com>
* @class cUIWarning404
* @description 404提示框
*/
define(['libs', 'cBase', 'cUIPageview', 'cWidgetFactory', 'cWidgetGuider'], function (libs, cBase, PageView, WidgetFactory) {

  var Guider = WidgetFactory.create('Guider');


  var options = {};

  var _config = {
    prefix: 'cui-'
  };

  var _calback = function () { };

  var _attributes = {};
  _attributes.class = _config.prefix + 'warning';

  _attributes.onCreate = function () {
    this.root.html([
          '<div class="head-warning">',
              '<div class="head-warning-padding">',
                  '<div class="head-warning-content">',
                      '<div class="cui-load-fail cui-text-center">',
                        '<div class="cui-load-error">',
                              '<div class="cui-i cui-wifi cui-fail-icon">',
                              '</div>',
                        '</div>',
                        '<p class="cui-grayc">加载失败，请稍后再试试吧</p>',
                        '<button type="button" class="cui-btns-retry">重试</button>',
                        '<div class="cui-glines"></div>',
                        '<p class="cui-grayc">或者拨打携程客服电话</p>',
                        '<span id="telBtn" class="cui-btns-tel"><span class="cui-i cui-warning-kf"></span>联系客服</span>',
                    '</div>',
                  '</div>',
              '</div>',
          '</div>'
                    ].join(''));
    this.addClass('head-warning-top');
    this.retryDom = this.root.find('.cui-btns-retry');

    this.retryDom.bind('click', $.proxy(function () {
      this.callback && this.callback();
    }, this));
  };

  _attributes.onShow = function () {

    this.mask.root.css({
      'z-index': '1000'
    });
    this.root.css({
      'z-index': '1001'
    });
    
    var self = this;
    window.scrollTo(0, 0);
    this.root.find('#telBtn').click(function () {
      Guider.apply({
        hybridCallback: function () {
          Guider.callService();
        },
        callback: function () {
          window.location.href = 'tel:' + self.tel;
        }
      });
    });
  };

  options.__propertys__ = function () {
    this.retryDom;
    this.tel = '4000086666';
    this.callback = function () { };
  };

  options.initialize = function ($super, opts) {
    $super(_attributes, opts);
  };
  options.retryClick = function (callback) {
    if (callback) {
      this.callback = callback;
    }
  }
  return new cBase.Class(PageView, options);

});