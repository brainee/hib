// ------------------------------
// 订单填写
// ------------------------------

define(['libs', 'c', 'cUINum', 'cUIGroupList', 'cUICore', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('scrolldemo.html'), 'cWidgetFactory', 'cWidgetTipslayer', 'cLazyload'], function (libs, c, CuiNum, cUIGroupList, cui, CarModel, CarStore, BasePageView, viewhtml, WidgetFactory, t, lazyload) {
    window.log = window.alert;

    window.alert = function (msg) {
        $('body').append('<div>' + msg + '</div>')
//        console.log(msg);
    };


    //    setTimeout(function () {
    //      $('#Datetime1').focus();
    //    }, 1000)


    // var _templateFn = _.template($('#ctrip-page-booking').html());
    var _templateFn = _.template(viewhtml);

    var View = BasePageView.extend({
        hasAd: true,
        render: function () {
            var html = _templateFn();
            this.$el.html(html);
        },

        events: {
            'click .anchor': 'goTo',
            'click #port_place': 'secPlace',
            'click #port_time': 'secTime',

            'click #validity': 'validity',
            'click #city': 'setCity',

            'click #store': 'setStore',
            'click #storeHasBtn': 'setStoreHasBtn',
            'click #key': 'setKey',
            'click #lazyImg': 'lazyImg',
            'click #noRecord': 'noRecord',
            'click #native': 'native'

        },

        native: function () {


        },


        noRecord: function () {

            this.showHeadWarning('您还没有记录哦', '您还没有记录哦', function () {
                this.hide();
            });
        },

        lazyImg: function () {
            var el = this.$el.find('#img');
            var src = prompt("请输入src")
            el.attr('src', src);
            lazyload.lazyload(el);
        },

        setStore1: function () {
            //模拟以上数据即可，后续补上
            var TipsLayer = WidgetFactory.create('TipsLayer');
            var sss = '<li class="border_bot"><span>费用名称</span><em>小计(元)</em></li>';

            for (var i = 0; i < 100; i++) {
                sss += '<li class="border_bot"><span>费用名称</span><em>小计(元)</em></li>';
            }

            var l = new TipsLayer({
                title: '服用说明11',
                width: '80%',
                height: 400,
                html: [
                    '<ul class="cui-money-tips" style="display: none; ">',
                    '<li class="border_bot"><span>费用名称</span><em>小计(元)</em></li>',
                    '<li><span>用车费用(包含1小时25公里)</span><em>¥200</em></li>',
                    '<li>',
                    '<span>二次付费</span><em>¥120</em>',
                    '<p><span>超时租费(2小时*40元/时)</span><em>¥120</em></p>',
                    '<p><span>超公里费(20公里*4元/公里)</span><em>¥80</em></p>',
                    '<p><span>高速费</span><em>¥20</em></p>',
                    '<p><span>停车费</span><em>¥20</em></p>',
                    '</li>',
                    '<li class="border_bot"></li>',
                    '<li class="t_r">订单金额合计 <dfn>¥320</dfn></li>',
                    sss,
                    '</ul>'
                ].join('')
            });
            l.show();
            var s = '';
        },

        setStore: function () {
//            console.log('123');
            //模拟以上数据即可，后续补上
            var TipsLayer = WidgetFactory.create('TipsLayer');

            var sss = '<li class="border_bot"><span>费用名称</span><em>小计(元)</em></li>';

            for (var i = 0; i < 10; i++) {
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
                title: '服用说明',
                width: $(window).width() * 0.8,
                scrollbars: false,
                height: 400,
                html: [
                    '<div style="height: 100px; ">head-------------</div>',
                    '<ul class="cui-money-tips">',
                    sss,
                    '<li class="border_bot"><span>费用名称</span><em>小计(元)</em></li>',
                    '<li><span>用车费用(包含1小时25公里)</span><em>¥200</em></li>',
                    '<li class="border_bot"><lable><input type="text" value="我是input">ssss</lable></li>',
                    '<li><lable><textarea>fdsddf</textarea></lable></li>',
                    '</ul>'
                ].join(''),
                footer: this.$('#in_footer')
            });
            l.show();
            var s = '';
            window.ll = l;
        },
        setStoreHasBtn: function () {
            //模拟以上数据即可，后续补上
            var TipsLayer = WidgetFactory.create('TipsLayer');
            var l = new TipsLayer({
                showTitle: false,
                title: '服用说明',
                html: [
                    '<ul class="cui-money-tips" >',

                    '<li class="border_bot">444</li>',
                    '<li class="border_bot">dddddd</li>',
                    '<li class="border_bot">777</li>',
                    '<li class="border_bot">888</li>', '<li class="border_bot">444</li>',
                    '<li class="border_bot">dddddd</li>',
                    '<li class="border_bot">777</li>',
                    '<li class="border_bot">888</li>', '<li class="border_bot">444</li>',
                    '<li class="border_bot">dddddd</li>',
                    '<li class="border_bot">777</li>',
                    '<li class="border_bot">888</li>', '<li class="border_bot">444</li>',
                    '<li class="border_bot">dddddd</li>',
                    '<li class="border_bot">777</li>',
                    '<li class="border_bot">888</li>', '<li class="border_bot">444</li>',
                    '<li class="border_bot">dddddd</li>',
                    '<li class="border_bot">777</li>',
                    '<li class="border_bot">888</li>', '<li class="border_bot">444</li>',
                    '<li class="border_bot">dddddd</li>',
                    '<li class="border_bot">777</li>',
                    '<li class="border_bot">888</li>',
                    '</ul>'
                ].join(''),
                buttons: [
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
        setCity: function () {
            var port_place = this.$el.find('#port_place');
            var data = [];
            for (var i = 0; i < 13; i++) {
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

        secPlace: function () {
            var port_place = this.$el.find('#port_place');
            var data = [];
            for (var i = 0; i < 3; i++) {
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

                changed: [function (item) {
                    this.setTips(item.key);

                } ]
            });
            c.show();


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
                back: null,
                view: self,
                tel: null,
                home: null
            });

            //            this.headerview.addEvent('beforeShow', function () {
            //              alert('111');
            //            });
            //            this.headerview.addEvent('afterShow', function () {
            //              alert('222');
            //            });

            //             this.headerview.addEvent('beforeHide', function () {
            //              alert('333');
            //            });
            //            this.headerview.addEvent('afterHide', function () {
            //              alert('4444');
            //            });


            // 将HeaderView显示出来
            this.headerview.show();

            this.turning();

            var i = 0

            window.cui = cui;
            window.scope = this;
            window.header = this.headerview;

            //测试增减插件
            var psWrapper = this.$('#psWrapper');

            window.num = new CuiNum({
                rootBox: psWrapper,
                max: 20,
                unit: '元',
                //              needText: false,

                changed: function (v) {

                }

            });


            //分组列表相关
            var glWrapper = this.$('#grouplistWrapper');
            var gldata = [
                { name: '中国', id: 1, data: [] }
            ];

            window.groupList = new cUIGroupList({
                rootBox: glWrapper,
                data: gldata


            });






        },

        onShow: function () {



            setTimeout(function () {
                $('#dl_app img').hide();
            }, 100);



            window.res = null;
            var i = 0;



        },

        onHide: function () {
        }
    });

    return View;

});