/**
 * Created by huangjianhua on 14-3-5.
 */
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('tabs.html'), 'cUITab', 'cUIScroll'], function (libs, c, pageview, html, cUITab, Scroll) {
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
                title: 'tab组件',
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

            if(!tablist) {
                var data = [
                    { id: 1, name: '中国' },
                    { id: 2, name: '美国' },
                    { id: 3, name: '英国' }

                ];
                tablist = new cUITab({
                    //容器元素
                    rootBox: this.$('#wrapper'),
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

            this.headerview.show();
            this.turning();
        },

        onShow: function () {
          var self = this;
          if (!this.uiTab) {
            this.uiTab =  new cUITab({
              rootBox: this.$('.js-tab'),
              data: [
                { id: 1, name: '景点' },
                { id: 2, name: '价格' },
                { id: 3, name: '日期' }
              ],
              selectedKey: 1,
              changed: function() {
                var index = parseInt(this.selectedKey, 10) - 1;
                var width = wrapper.width();

                self.uiScroll.scrollTo(-width * index, 0, 600);
                // 不触发scrollEnd
                self.uiScroll.isInTransition = false;
              }
            });

            var wrapper = this.$('.scroll-tab');
            var scrollItems = wrapper.find('.scroll-tab-item');
            var scrollInner = wrapper.find('.scroll-tab-inner');
            // scrollItems的宽度必须动态计算
            $(window) .on('resize', function() {
              var itemWidth = wrapper.width();
              scrollInner.css('width', itemWidth * scrollItems.length + 10);
              scrollItems.css('width', itemWidth);
            }).trigger('resize');

            this.uiScroll = new Scroll({
              wrapper: wrapper,
              scrollX: true,
              scrollY: false,
              scrollbars: false,
              scrollEnd: function() {
                var width = wrapper.width();
                var x = Math.abs(this.x);
                var index = x / width;
                //滑动的比例
                var remainder = x % width / width;
                var tab = self.uiTab;
                var current = tab.selectedKey - 1;

                // 向左
                if (this.distX <= 0) {
                  if (remainder > .2) {
                    index = Math.ceil(index);
                  } else {
                    index = Math.floor(index);
                  }
                } else {
                  if (remainder > .2) {
                    index = Math.floor(index);
                  } else {
                    index = Math.ceil(index);
                  }
                }

                if (current === index) {
                  tab.changed();
                } else {
                  self.uiTab.setIndex(index);
                }
              }
            });
          }
        },

        onHide: function () {

        }

    });

    return View;

});