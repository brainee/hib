/**
 * @author l_wang王磊 <l_wang@Ctrip.com>
 * @class cBusinessCommon
 * @description 分离公共业务逻辑至此
 */
define(['cAdView', 'cSales', 'cWidgetFactory', 'cWidgetGuider'], function (cAdView, cSales, WidgetFactory) {

  return function () {
    var Guider = WidgetFactory.create('Guider');
    //广告业务
    Lizard.viewReady(function (inView) {
      var ua = window.navigator.userAgent;
      if (ua.indexOf('CtripWireless') > -1) {
        return true;
      }
      if (cAdView) {
        inView.footer = cAdView.getInstance();
        inView.footer.setCurrentView(inView);
        if (inView.hasAd) {
          inView.footer.isCreate = false;
          inView.footer.status = 'notCreate';
          if (!inView.footer.root || (inView.footer.root && inView.footer.rootBox != inView.footer.root))
          {
            inView.footer.root && inView.footer.rootBox != inView.footer.root && inView.footer.root.remove();
            inView.footer.update({
              rootBox: inView.adContainer? inView.$el.find('#' + inView.adContainer): $('#footer')
            });
            inView.footer.show();
          }          
          if (!$('#page_id').length) {
            $('<INPUT type="hidden" id="page_id" value="' + inView.pageid + '"/>').appendTo($('body'));
          }          
        }
        else {
          inView.footer.hide();
        }
      }
    });

    //营销业务
    Lizard.viewReady(function (inView) {
      cSales.updateSales(inView);
    });

    //GA
    Lizard.viewReady(function (inView) {
      if (typeof _gaq !== 'undefined') {
        _gaq.push(['_trackPageview', window.location.href]);
      }

      if (Lizard.isHybrid) {
        var url = inView._getViewUrl();
        Guider.app_log_google_remarkting(url);
      }
    });

  };
});

