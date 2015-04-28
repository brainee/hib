"use strict"
define(['libs', 'cBase', 'cBasePageView','cImgLazyload', buildViewTemplatesPath('myimglazyload_2.html')], function (libs, cBase, BasePageView, cImgLazyload,html) {

    var viewhtml = '<h1>我是首页</h1><div><button>点击我去list</button></div>';
    var firstCreate = true;
    var s1 = null;
    var View = BasePageView.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();
            this.$el.html(html);
            this.render();
           // var list = this.$el.find('#list');

        },

        events: {
            "click #append_img":function(e){
                var str = "<li class='js_hotel_detail' data-hotelid='439749'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/65000/64164/1684EC16-8A01-4B39-814C-C4C4537CF790_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='439749'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/65000/64164/1684EC16-8A01-4B39-814C-C4C4537CF790_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+             
                          "<li class='js_hotel_detail' data-hotelid='534982'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/17000/16393/0a36fcbbed604f5793d736f20d4ef327_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+                                
                          "<li class='js_hotel_detail' data-hotelid='393916'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/1000/634/3732a505564540c888f8ef7cba0ce0bc_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='435639'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/1000/717/f51bb87a188c4fb6b35e3928f49605af_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='480779'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/6000/5835/61336F71252F460792EE5B3B20293BCE_130_130.Jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='436248'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/1000/709/50F737E2-425E-422A-8E47-4D82F52E1949_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='430852'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/22000/21329/a81715e00d5244d4bee8273e82ae0fae_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='434019'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/49000/48895/C975B2F1-4E00-4F86-886D-DFD416EE34FD_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='486701'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/23000/22573/9afb0b0259ae473082737198ff664a27_130_130.jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>"+
                          "<li class='js_hotel_detail' data-hotelid='433934'><div class='hotel-g-proimg'><img data-src='http://images4.c-ctrip.com/target/hotel/57000/56556/C4F864561FE74BABA5DD7EF9F1BD52C0_130_130.Jpg' width='96' height='96' ></div><div class='hotel-g-cbd'><h4 class='ellips'>上海宝安大酒店</h4><div class='list-c'><span class='price-num fr'><b class='num'><small>¥</small>428</b>起</span><span class='rate-num'><b>4.2</b>分</span><i class='hotel-icon-wifi'></i><i class='hotel-icon-park'></i></div><div class='list-c'><span class='cgray'>四星级酒店</span><span class='ico-txt fr'><em class='ico-2'>礼</em><em class='ico-1'>APP专享</em></span></div><div class='list-c'><span class='cgray fr'>4.8公里</span><span class='cgray'>浦东陆家嘴金融贸易区</span></div></div></li>";                    
                $("#img_list").append($(str));  
                var imgs = this.$('#img_list li img');
                s1 = new cImgLazyload({
                      imgs: imgs
                });
                //s1.refresh();
            
            }
        },

        onLoad: function () {
            this.headerview.set({
                title: '延迟加载',
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

            var imgs = this.$('#img_list li img');
            console.log(imgs);
            if(!s1) {
                s1 = new cImgLazyload({
                   imgs: imgs
                });
            }

        },

        onShow: function () {

        },

        onHide: function () {
            if(s1) {
               s1.destroy();
               //s1 = null;
            }

        }

    });

    return View;

});
