"use strict"
define(['libs', 'cBasePageView', buildViewTemplatesPath('num.html'), 'cUICore'], function (libs, BasePageView, html, c) {

    var View = BasePageView.extend({
        render: function () {
            this.$el.html(html);
        },
        events: {
            'click button': 'goTo'
        },

        goTo: function () {
            this.forward('list');
        },

        onCreate: function () {
            this.render();
            this.injectHeaderView();
        },

        onLoad: function () {
            // this.headerview就是View含有的HeaderView的全局对象
            this.headerview.set({
                title: 'c.ui.num',
                view: this,
                back: true,
                home: true,
                tel: {
                    number: 4000086666
                },
                events: {
                    returnHandler: function () {
                        this.back('index');
                    },
                    homeHandler: function () {
                    }
                }
            });
            // 显示headerview
            this.headerview.show();

            //...
            this.turning();



            //      var psWrapper = this.$('#psWrapper');

            //      window.num = new CuiNum({
            //        rootBox: psWrapper,
            //        max: 20,
            //        unit: '元',
            //        //              needText: false,
            //        changeAble: function () {
            //          i++;
            //          if (i < 5) {
            //            alert('不能点击')
            //            return false;
            //          }
            //          return true;
            //        },
            //        changed: function (v) {

            //          alert(v)
            //        }

            //      });



            //测试增减插件
            var wrapper = this.$('#demo1');
            var scope = this;


            if (!this.hasUICreated) {
                this.num1 = new c.cuiNum({
                    rootBox: wrapper,
                    min: 2,
                    max: 20,
                    curNum: 3,
                    changed: function (v) {
                        scope.$('#sec1').html(v);
                    }
                });

                //demo2
                var wrapper = this.$('#demo2');
                this.num2 = new c.cuiNum({
                    rootBox: wrapper,
                    changeAble: function () {
                        if (scope.num1.getVal() == 5) {
                            return true;
                        }
                        alert('demo1 的值必须是5才可设置');
                        return false;
                    },
                    changed: function (v) {
                        scope.$('#sec2').html(v);
                    }
                });

                //demo3
                var wrapper = this.$('#demo3');
                this.num3 = new c.cuiNum({
                    rootBox: wrapper,
                    unit: '元',
                    changed: function (v) {
                        scope.$('#sec3').html(v);
                    }
                });

                //demo4
                var wrapper = this.$('#demo4');
                this.num4 = new c.cuiNum({
                    rootBox: wrapper,
                    needText: false,
                    changed: function (v) {
                        scope.$('#sec4').html(v);
                    }
                });
            }

            this.hasUICreated = true;


        },

        onShow: function () {

        },

        onHide: function () {

        }
    });

    return View;
});