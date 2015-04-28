/**
 * Created by huangjianhua on 14-3-5.
 */
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('inputvalidator_2.html'), 'cWidgetFactory', 'cWidgetInputValidator'], function (libs, c, BasePageView, html, WidgetFactory) {
    "use strict"

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
            'click #email': function () {
                this.validate({
                    el: this.$('#emailTxt'),
                    test: c.utility.validate.isEmail,
                    errorMsg: '邮箱格式错误'
                });
            },
            'click #date': function () {
                this.validate({
                    el: this.$('#dateTxt'),
                    test: c.utility.validate.isDate,
                    errorMsg: '日期格式错误'
                });
            },
            'click #idCard': function () {
                this.validate({
                    el: this.$('#idCardTxt'),
                    test: c.utility.validate.isIdCard,
                    errorMsg: '身份证格式错误'
                });
            }
        },
        validate: function (args) {
            if (!args.test(args.el.val())) {
                this.addErrorClass(args.el);
                this.showMessage(args.errorMsg ? args.errorMsg : '输入错误');
            } else {
                this.showMessage(args.succesMsg ? args.succesMsg : '输入正确');
            }
        },
        addErrorClass: function (el) {
            el.parents('.inputParent').addClass('cui-input-error');
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