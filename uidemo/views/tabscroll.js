
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('tabscroll.html'), 'cUIScroll','cUITab'], function (libs, c, pageview, html,Scroll, cUITab) {
    "use strict";

    var s = null;
    var tablist = null;

    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            this.headerview.set({
                title: '可以滚动的tab',
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


            if(!tablist) {
                var wrapper = this.$(".tab-scroll-wrap");
        var scroller = wrapper.children().eq(0);
        var items = scroller.find('.js-tab-scroll-content');
        var item = items.eq(0);
        var itemWidth = item.width() + 10;
        var scrollerWidth = items.length * itemWidth ;

        scroller.css('width', scrollerWidth);

                var data = [
                    { id: 1, name: '中国' },
                    { id: 2, name: '美国' },
                    { id: 3, name: '英国' }

                ];
             this.uiScroll = new Scroll({
            wrapper: wrapper,
            scrollX: true, //横向滚动
            scrollY: false,   //竖直滚动
            scrollbars: true,
            scrollStart: function() {
              console.log('start:' + this.maxScrollX);
            }
        });
                tablist = new cUITab({
                    //容器元素
                    rootBox: this.$('#js-tab-scroll'),
                    //对应数据
                    data: data,
                    //设置选择值，必须正确
                    selectedKey: 2,
                    //改变时候触发事件
                    changed: function (data) {

                        var s = '';
                        console.log(data);
                    },
                    //扩展应用，暂时不予关注，当返回false时候设置值无效
                    changeAble: function () {
                        //          alert('不能选择')
                        //          return false;
                    }
                });
            }
        },

        onShow: function () {
           

        },

        onHide: function () {

        }

    });

    return View;

});