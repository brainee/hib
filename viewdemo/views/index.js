"use strict"
define(['libs', 'cBasePageView'], function (libs, BasePageView) {
    //Html模板，实际开发中从外部载入
    var viewhtml = '<h1>我是首页</h1><div><button>点击我去list</button></div>';

    //BasePageView用与普通页面的展示
    var View = BasePageView.extend({

        //事件绑定
        events: {
            'click button': 'goTo'
        },

        /**
        * 事件处理动作
        */
        goTo: function () {
            //跳转到list页面
            this.forward('list');
        },

        /**
        * 第一次载入此view时执行
        */
        onCreate: function () {
            //this.$el元素指向当前view的根节点
            this.$el.html(viewhtml);
            this.injectHeaderView();
        },

        /**
        * 每次切换到此view时都会执行
        */
        onLoad: function () {
            // this.headerview就是View含有的HeaderView的全局对象
            this.headerview.set({
                //view标题
                title: '导航',
                view: this,
                back: true,
                home: true,
                tel: {
                    number: 4000086666
                },
                events: {
                    //back处理
                    returnHandler: function () {
                    },
                    //home处理
                    homeHandler: function () {
                    }
                }
            });
            // 显示headerview
            this.headerview.show();

            //启动转场
            this.turning();
        },


        /**
        * 当前view 显示后调用
        */
        onShow: function () {

        },

        /**
        * 当前view 后调用
        */
        onHide: function () {

        }
    });

    return View;
});