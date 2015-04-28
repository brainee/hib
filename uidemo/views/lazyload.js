
define(['cUISwitch', 'libs', 'c', 'cUICore', 'cBasePageView', buildViewTemplatesPath('lazyload.html'), 'cWidgetFactory', 'cWidgetTipslayer', 'cLazyload' ], function ( _Switch, libs, c, cui, BasePageView, viewhtml, WidgetFactory, t, lazyload) {

    // var _templateFn = _.template($('#ctrip-page-booking').html());
    var _templateFn = _.template(viewhtml);

    var s='';

    var View = BasePageView.extend({

        render: function () {
            var html = _templateFn();
            this.$el.html(html);
        },

        events: {
            'click #lazyImg': 'lazyImg'
        },



        lazyImg: function () {
            var el = this.$el.find('#img');
            var src = prompt("请输入src");
            el.attr('src', src);
            lazyload.lazyload(el);
        },



        goTo: function (e) {
            this.forward($(e.currentTarget).data('hash'));
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            var self = this;

            //对HeaderView设置数据
            this.headerview.set({
                title: '滚轮demo',
                back: true,
                view: self,
                tel: null,
                home: null,
                events: {
                    returnHandler: function () {
                        this.back('index');
                    }
                }
            });
            // 将HeaderView显示出来
            this.headerview.show();

            this.turning();
        },

        onShow: function () {
            var s = new _Switch({rootBox: this.$el.find('#switch'),
                checked: true,
                changed: function () {
                    //              alert(this.getStatus())
                }
            });
        },

        onHide: function () {
        }
    });

    return View;

});