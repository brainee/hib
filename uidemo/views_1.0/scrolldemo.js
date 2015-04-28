// ------------------------------
// 订单填写
// ------------------------------
define(['cUISwitch', 'libs', 'c', 'cUICore', 'cBasePageView', buildViewTemplatesPath('scrolldemo.html'), 'cWidgetFactory', 'cWidgetTipslayer', 'cLazyload' ], function ( _Switch, libs, c, cui, BasePageView, viewhtml, WidgetFactory, t, lazyload) {

    // var _templateFn = _.template($('#ctrip-page-booking').html());
    var _templateFn = _.template(viewhtml);

    var s='';

    var View = BasePageView.extend({

        render: function () {
            var html = _templateFn();
            this.$el.html(html);
        },

        events: {
            'click #port_place': 'secPlace',
            'click #port_time': 'secTime',
            'click #validity': 'validity',
            'click #store': 'setStore',
            'click #storeHasBtn': 'setStoreHasBtn',
            'click #key': 'setKey',
            'click #lazyImg': 'lazyImg',
            'click #noRecord': 'noRecord'
        },

        noRecord: function () {
            this.showHeadWarning('您还没有记录哦', '您还没有记录哦', function () {
                this.hide();
            });
        },

        lazyImg: function () {
            var el = this.$el.find('#img');
            var src = prompt("请输入src");
            el.attr('src', src);
            lazyload.lazyload(el);
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
                ].join(''),
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
        setKey: function () {
            var el = this.$el.find('#key');

            //注意此次取出存在于dom中的数据，我们可以存于内存
            var arr = el.attr('key');
            arr = arr ? arr.split(',') : [];

            var d1 = [];
            for (var i = 0; i < 50; i++) {
                d1.push({ key: (2013 + i) });
            }

            var d2 = [];
            for (var i = 0; i < 12; i++) {
                var j = i + 1;
                if (j < 10) j = '0' + j;
                if (i < 5 || i == 8) {
                    d2.push({ key: '无效', disabled: false });
                } else {
                    d2.push({ key: j });
                }
            }
            var c = new cui.ScrollRadio({
                title: '有效期',
                data: [d1, d2],
                key: arr,
                okClick: function (item) {
                    var t1 = item[0], t2 = item[1];
                    var str = t1.key + '' + t2.key;
                    var key = t1.key + ',' + t2.key;
                    el.html(str);
                    el.attr('key', key);
                }
            });
            c.show();


        },


        validity: function () {
            var validity = this.$el.find('#validity');
            var arrIndex = validity.attr('index');
            arrIndex = arrIndex ? arrIndex.split(',') : [];

            var d1 = [];
            for (var i = 0; i < 50; i++) {
                d1.push({ key: (2013 + i) });
            }

            var d2 = [];
            for (var i = 0; i < 12; i++) {
                var j = i + 1;
                if (j < 10) j = '0' + j;
                d2.push({ key: j });
            }

            var c = new cui.ScrollRadio({
                title: '有效期',
                data: [d1, d2],
                index: arrIndex,
                okClick: function (item) {
                    var t1 = item[0], t2 = item[1];
                    var str = t1.key + '' + t2.key;
                    var index = t1.index + ',' + t2.index;
                    validity.html(str);
                    validity.attr('index', index);
                }
            });
            c.show();


        },

        secPlace: function () {
            var port_place = this.$el.find('#port_place');
            var data = [];
            for (var i = 0; i < 10; i++) {
                data.push({ key: '列表选项' + (i + 1) });
            }

            var r = new cui.ScrollRadioList({
                title: '列表选项',
                index: port_place.attr('index'),
                data: data,
                itemClick: function (item) {
                    port_place.attr('index', item.index);
                    port_place.html(item.key);
                }
            });

            r.show();
        },

        secTime: function () {
            var port_time = this.$el.find('#port_time');
            var arrIndex = port_time.attr('index');
            arrIndex = arrIndex ? arrIndex.split(',') : [];

            var d1 = [];
            for (var i = 0; i < 300; i++) {
                var j = i % 7;
                d1.push({ key: '5 月 17 日 周 ' + (j + 1) });
            }
            var d2 = [];
            for (var i = 0; i < 24; i++) {
                d2.push({ key: (i + 1) });
            }
            var d3 = [];
            for (var i = 0; i < 6; i++) {
                d3.push({ key: (i + 1) * 10 });
            }

            var scope = this;
            var c = new cui.ScrollRadio({
                title: '用车时间',
                data: [d1, d2, d3],
                index: arrIndex,
                okClick: function (item) {
                    var t1 = item[0], t2 = item[1], t3 = item[2];
                    var str = t1.key + '-' + t2.key + ':' + t3.key;
                    var index = t1.index + ',' + t2.index + ',' + t3.index;
                    port_time.html(str);
                    port_time.attr('index', index);
                },

                changed: [
                function (item) {
                    this.setTips(item.key);
                }, function(item){
                    console.log(item)
                }, 
                function(item){
                    this.setTips(item.key)
                }
                ]
            });
            c.show();
            console.log(c.mask);


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