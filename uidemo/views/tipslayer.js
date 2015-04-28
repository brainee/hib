// ------------------------------
// 订单填写
// ------------------------------
define(['cUISwitch', 'libs', 'c', 'cUICore', 'cBasePageView', buildViewTemplatesPath('tipslayer.html'), 'cWidgetFactory', 'cWidgetTipslayer', 'cLazyload' ], function ( _Switch, libs, c, cui, BasePageView, viewhtml, WidgetFactory, t, lazyload) {

    // var _templateFn = _.template($('#ctrip-page-booking').html());
    var _templateFn = _.template(viewhtml);

    var s='';

    var View = BasePageView.extend({

        render: function () {
            var html = _templateFn();
            this.$el.html(html);
        },

        events: {
            'click #store': 'setStore',
            'click #storeHasBtn': 'setStoreHasBtn'
        },


        setStore: function () {
            //模拟以上数据即可，后续补上
            var TipsLayer = WidgetFactory.create('TipsLayer');

            var sss = '<li class="border_bot"><span>费用名称</span><em>小计(元)</em></li>';

            for(var i = 0; i< 10; i++) {
                sss += ['<li class="border_bot">',
                    '<span>二次付费</span><em>¥120</em>',
                    '<p><span>超时租费(2小时*40元/时)</span><em>¥120</em></p>',
                    '<p><span>超公里费(20公里*4元/公里)</span><em>¥80</em></p>',
                    '<p><span>高速费</span><em>¥20</em></p>',
                    '<p><span>停车费</span><em>¥20</em></p>',
                    '</li>'
                ].join('');
            }

            var l = new TipsLayer({
                title: '服用列表',
                html: [
                    '<ul class="cui-money-tips">',
                    sss,
                    '<li class="border_bot"><span>费用名称</span><em>小计(元)</em></li>',
                    '<li><span>用车费用(包含1小时25公里)</span><em>¥200</em></li>',
                    '</ul>'
                ].join('')
            });
            l.show();
            var s = '';
            window.ll = l;
        },
        setStoreHasBtn: function () {
            //模拟以上数据即可，后续补上
            var TipsLayer = WidgetFactory.create('TipsLayer');
            var l = new TipsLayer({
                title: '服用说明',
                height: 200,
                html: [
                    '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
                    '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>',
                    '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
                    '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>',
                    '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
                    '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>',
                    '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
                    '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>'
                ].join(''),
                buttons: [
                    {
                        'text': '取消',
                        'type': 'cancel',
                        'click': function () {
                            this.hide();
                        }
                    },
                    {
                        'text': '确认',
                        'click': function () {
                            alert('确认')
                            this.hide();
                        }
                    }
                ]
            });
            l.show();
            var s = '';

        },


        goBack: function () {

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
                title: 'TipsLayer API',
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
            s = null;
        }
    });

    return View;

});