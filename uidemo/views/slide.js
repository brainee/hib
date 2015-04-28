define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('slide.html'), 'cWidgetFactory', 'cWidgetSlide'], function (libs, c, pageview, html, factory) {

    var slider = factory.create('Slide');

    var View = pageview.extend({
        render: function() {
            this.$el.html(html);
        },

        onCreate: function() {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function() {
            this.headerview.set({
                title: '图片轮播',
                back: true,
                view: this,
                tel: null,
                events: {
                    returnHandler: function() {
                        this.back('index');
                    }
                }
            });

            this.headerview.show();

            this.turning();

        },

        onShow: function() {

            $('#slidecontainer').css({
                'width': '100%',
                'margin': 'auto',
                'overflow': 'hidden',
                'position': 'relative'
            })


            var imgs = [];
            imgs.push({title: 'x1', src: 'http://images4.c-ctrip.com/target/hotel/22000/21648/4da868bdf30b44ff894b4398a0a4bf96_300_225.jpg', link: 'http://www.google.com'});
            imgs.push({title: 'x2', src: 'http://images4.c-ctrip.com/target/hotel/22000/21648/5F6FB757-19CD-4D99-8C9C-77E92EB6E7DF_300_225.jpg', link: 'http://www.google.com'});
            imgs.push({title: 'x3', src: 'http://images4.c-ctrip.com/target/hotel/22000/21648/542d8c19b5ab4b93ad936c54d2b9453e_300_225.jpg', link: 'http://www.google.com'});

            var slide = new slider({
                container: $('#slidecontainer'),
                images: imgs,
                autoplay: true,
                loop: true,
                isadaptive: true  // 设置是否需要自适应
            });
        },

        onHide: function() { }
    });

    return View;
});
