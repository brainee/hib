"use strict"
define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('test.html')], function (libs, c, pageview, cUI, html) {
    var s = null;

    var Star = new c.base.Class(c.ui.AbstractView, {
        __propertys__: function() {
            this.count = 5;   //评分的总个数
            this.curNum = 0;   //当前选了几颗评分
            this.showInfo = true;  //是否显示对应的评价信息
            this.starInfo = null;  //评价信息
            this.tpl=null;

        },
        initialize: function($super, opts) {
            this.setOption(opts);
            $super(opts);

            //评分信息的数组，必须和星星总数对应
            this.starInfo = this.starInfo ? this.starInfo : new Array("谢谢您的评价");
            //若showInfo为true则显示信息html赋值
            var initTemp = this.starInfo.length>1?this.starInfo[this.curNum-1]:this.starInfo[0];
            this.showInfoHtml = this.showInfo? '<div class="showInfo">'+ initTemp +'</div>' : '';
            //若初始选中评分，则计算评分的长度
            this.initWidth = this.curNum ? this.curNum/this.count*100 : 0;

            this.tpl = _.template(['<span class="cui-rate"><span class="cui-rate-r1"><%for(var i=0;i<this.count;i++){%><i data-index=<%=i%>></i><%}%></span><span class="cui-rate-r2" style="width:'+this.initWidth+'%"><%for(var i=0;i<this.count;i++){%><i data-index=<%=i%>></i><%}%></span></span>' +  this.showInfoHtml].join(''));

            this.addEvent('onShow', function () {
                $(this.rootBox.selector + ' i').bind('click', $.proxy(function(e) {
                    var curNum = $(e.target).attr('data-index');
                    //选中的长度
                    $('.cui-rate-r2').css('width',(parseInt(curNum)+1)/this.count*100+'%');
                    var showIndex = (this.starInfo.length>1) ?curNum :0;

                    //是否显示评分信息
                    this.showInfo ? $('.showInfo').html(this.starInfo[showIndex]):'';

                },this));
            });

            this.show();
        },
        setOption: function(opts) {
            for(var k in opts) {
                this[k] = opts[k];
            }
        },
        createHtml: function() {
            return this.tpl();
        }

    });

    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();

            this.render();
        },

        events: {
        },

        onLoad: function () {
            this.headerview.set({
                title: '评分组件',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function () {
                        this.back('index');
                    }
                }
            });
            this.headerview.show();

            this.turning();
            if(!s) {
            	var arr = ['1星评价', '2星评价', '3星评价', '4星评价', '5星评价','6星评价'];
                s = new Star({
                    rootBox: $('.hm'),      //组件的容器
                    count: 6,                //评分的总个数
                    curNum:1,                //当前选了几颗评分
                    showInfo: true,         //是否显示对应的评价信息
                    starInfo: arr           //评价信息
                })
                s.show();
            }

        },

        onShow: function () {

        },

        onHide: function () {

        }

    });

    return View;
});