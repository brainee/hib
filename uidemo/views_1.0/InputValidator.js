"use strict"
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('InputValidator.html'), 'cWidgetFactory', 'cWidgetInputValidator'], function (libs, c, BasePageView, html, WidgetFactory) {

    var InputValidator = WidgetFactory.create('InputValidator');

    var View = BasePageView.extend({
        render: function () {
            this.injectHeaderView();
            this.$el.html(html);
            this.name = this.$el.find('#name');
            this.inputs = this.$el.find('.formValidate');

            if (!this.f) this.f = new InputValidator({ els: this.inputs, isShowMsg: true });
        },
        events: {
            'click #demo1': function () {
                this.f.validateAll(function () { }, function (args) {
                    for (var i = 0, len = args.length; i < len; i++) {
                        args[i].el.parent().addClass('cui-input-error');
                    }
                    var s = '';
                });
            },
            'click #add': function () {
                this.f.addValidator(this.name.val());
            },
            'click #remove': function () {
                this.f.removeValidator(this.name.val());

            }
        },
        homeUrl: (function () {
            return '/html5';
        })(),
        onCreate: function () {
            this.render();
        },
        ajaxRequest: function (onloadCall) {

        },
        onLoad: function () {
            var self = this;
            this.headerview.set({
                title: '验证组件',
                back: true,
                view: self,
                events: {
                    returnHandler: function () {
                        self.back('index');
                    }
                }
            });
            this.headerview.show();
            this.turning();
        },
        onShow: function () {
        },
        onHide: function () { }
    });
    return View;
});