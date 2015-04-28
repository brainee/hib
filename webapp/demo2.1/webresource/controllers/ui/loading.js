/**
 * Created by jp_wang on 2014/11/20.
 */
define(['UIDemoView'], function (UIDemoView) {

  var View = UIDemoView.extend({
    events: {
      'click .js_demo01': 'demo01',
      'click .js_demo02': 'demo02',
    },

    demo01: function () {
      this.showLoading();

      setTimeout(function () {
        Lizard.hideLoading();
      }, 2000)

    },

    demo02: function () {
      this.showLoading({
        datamodel: {
          content: '加载中...',
          closeBtn: true
        }
      });
    },

    onCreate: function () {
    },
    onShow: function () {
      this.header.set({
        view: this,
        title: 'loading的使用',
        back: true
      });

      this.header.show()
    },
    onHide: function () {

    }
  });

  return View;
});