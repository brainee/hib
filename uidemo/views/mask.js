define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('mask.html')], function (libs, c, pageview, html) {
    "use strict"

    var s = null;

    /*
     * 自定义Mask类，继承c.ui.Layer
     * 实现根据传入html展示弹窗，控制弹窗与c.ui.Mask的显示与隐藏状态
     */
    var Mask = new c.base.Class(c.ui.Layer, {
        __propertys__: function () {
            var self = this;
            this.contentDom;
            this.mask = new c.ui.Mask();
            this.mask.addEvent('onShow', function () {
                $(window).bind('resize', this.onResize);
                this.onResize();
                var scope = this;
                this.root.bind('click', function () {
                    scope.hide();
                    scope.root.unbind('click');
                    self.hide();
                });

            });
        },
        initialize: function ($super, opts) {

            $super({
                onCreate: function () {
                },
                onShow: function () {
                    for (var k in opts) this[k] = opts[k];
                    this.mask.show();
                    this.setzIndexTop();
                    if (typeof this.html == 'string') this.html = $(this.html);
                    this.contentDom.html(this.html);
                    if (this.closeDom) {
                        this.contentDom.find(this.closeDom).on('click', function () {
                            s && s.hide();
                        });
                    }
                },
                onHide: function () {
                    this.mask && this.mask.hide();
                }
            });

        }
    });

    /*
     * 自定义Mask引用示例
     */
    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        events: {
            'click #demo1': function () {
                var html = [
                        '<div class="modal-wrap modal-price-detail">',
                        '<div class="modal-hd"><h3>Mask Demo</h3>',
                        '<i class="icon-close">+</i></div>',
                        '<div class="modal-bd">',
                        '<h3>这是一个圆角的窗口</h3>',
                        '</div></div>'
                    ].join(''),
                    html = $(html);

                if (!s) {
                    s = new Mask({
                        html: html, // 弹窗html
                        closeDom: '.icon-close' // 弹窗关闭按钮
                    });
                }
                s.show();
            }
        },

        onLoad: function () {
            //对HeaderView设置数据
            this.headerview.set({
                title: 'mask组件',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function () {
                        this.back('index');
                        if (s) s.hide();
                    }
                }
            });
            this.headerview.show();

            this.turning();
        },

        onShow: function () {

        },

        onHide: function () {
            this.s && this.s.destroy();
            this.mask && this.mask.hide();
            this.root && this.root.remove();
        }

    });

    return View;

});