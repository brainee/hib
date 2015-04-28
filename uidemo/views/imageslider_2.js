define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('imageslider_2.html'), 'cUIImageSlider'],
 function (libs, c, pageview, cUI, html, imageSlider) {
     "use strict";

     var View = pageview.extend({
         imageSlider: null,
         render: function () {
             this.$el.html(html);
         },

         onCreate: function () {
             this.injectHeaderView();
             this.render();
         },

         onLoad: function () {
             this.headerview.set({
                 title: 'imageSlider',
                 back: true,
                 view: this,
                 tel: null,

                 events: {
                     returnHandler: function () {
                         this.back('index');
                     }
                 }
             });
             //console.log(this.imageSlider);


             this.headerview.show();

             this.turning();
             //此种方式可混存图片，再次进入时，不会重新加载图片
             if (!this.imageSlider) {
                 var imageWidth = 320;
                 var imageHeight = 50;
                 this.imageSlider = new imageSlider({
                     images: [
                                { src: "http://pkgpic.ctrip.com/images2/1/2/2_14.jpg" },
                                { src: "http://res.m.ctrip.com/market/appimg/h5/20140305/3.jpg",
                                    onClick: $.proxy(function (imageInfo) {
                                        this._onSelectedImageClick(imageInfo);
                                    }, this)
                                },
                                { src: "http://res.m.ctrip.com/market/appimg/h5/20140305/2.jpg" },
                                { src: "http://res.m.ctrip.com/market/appimg/h5/20140305/1.jpg" },
                                { src: "http://images4.c-ctrip.com/target/hotel/429000/428839/99a70ae6bcae467cb6876a8bd4bdc93d_550_412.jpg"}
                              ],
                     container: $("#imageSliderDemo"),
                     //dir: "LEFT",
                     //index: 0,
                     //autoPlay: false,
                     //defaultImageUrl: "http://pic.c-ctrip.com/vacation_v2/h5/group_travel/pic_loading.png",
                     loop:true,
                     //noNeedDefault:true,
                     onImageClick: $.proxy(function (imageInfo) {
                         alert('点击图片');
                     }, this)
                 , onChanged: $.proxy(function (imageInfo, index) {
                     this._onChanged(imageInfo, index);
                 }, this)
                 , scope: this
                 , showNav: true
                 , imageSize: { height: imageHeight, width: imageWidth }
                 });
                 this.imageSlider.play();
             }
             // console.log(this.imageSlider);

         },
         onShow: function () {

         },

         onHide: function () {

         }
         , _onSelectedImageClick: function (imageInfo) {
             alert(imageInfo.src);
         }
         , _onImageClick: function (imageInfo) {
            console.log("_onImageClick");
         }
         , events: {
             "click #play": "_rePlay",
             "click #stop": "_stop",
             "click #next": "_next",
             "click #pre": "_pre"
         }
         , _rePlay: function () {
             console.log("replay");
             this.imageSlider.rePlay();
         }
         , _stop: function () {
             console.log("stop");
             this.imageSlider.stop();
         }
         , _next: function () {
             console.log("next");
             this.imageSlider.next();
         }
         , _pre: function () {
             console.log("pre");
             this.imageSlider.pre();
         }
         , _onChanged: function (imageInfo, index) {
             //console.log("changed,index: " + index + ",src:" + imageInfo.src);
         }
     });

     return View;

 });