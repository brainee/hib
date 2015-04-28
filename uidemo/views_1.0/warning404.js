"use strict";
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('warning404.html'), 'cUIWarning404'], function(libs, c, pageview, html, cUIWarning404){

  var s = null;
  var View = pageview.extend({
    render: function(){
      this.$el.html(html);
    },

    onCreate: function(){
      this.injectHeaderView();
      this.render();
    },

    events: {
      'click #test': 'testAction'
    },

    testAction: function(){
          s = new cUIWarning404();
          s.retryClick(function () {
              this.hide();
          });
          s.show();
    },

        onLoad: function () {
          this.headerview.set({
            title: 'warning404组件',
            back: true,
            view: this,
            tel: null,
            events: {
              returnHandler: function () {
                this.back('index');
                if(s) s.hide();
              }
            }
          });
          this.headerview.show();

      this.turning();
    },

    onShow: function(){

    },

    onHide: function(){

    }

  });

  return View;

});