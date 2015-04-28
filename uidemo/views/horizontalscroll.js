define([
  'cBasePageView',
  'cUIScroll',
  buildViewTemplatesPath('horizontalscroll.html')
], function(BasePageView,Scroll,newScrollTemplate) {
  //alert("123");
  var view = BasePageView.extend({
    /*events:{
      "resize #scroller":'resizeScroll',
      
    },
    resizeScroll:function(){
      this.uiScroll = new Scroll({})
      this.uiScroll.refresh(); //当滑动框的高度或者宽度变化的时候，调用这个方法
      
      

    },*/
    events: {
      'click .js-scroll': 'scrollToAction'
    },
    onCreate:function(){
      this.injectHeaderView();
            this.$el.html(newScrollTemplate);

    },
    onLoad:function(){
      this.headerview.set({
                title: '横向滚动',
                back: true,
                view: this,
                events: {
                    returnHandler: function () {
                        this.back('index');
                    }
                }
           });

        
      this.turning();



      this.headerview.show();
           

    },
    onShow: function() {
      if (!this.uiScroll) {
        var wrapper = this.$('#wrapper');
        var scroller = wrapper.children().eq(0);
        var items = scroller.find('li');
        var item = items.eq(0);
        var itemWidth = item.width() + 10;
        var scrollerWidth = items.length * itemWidth;

        scroller.css('width', scrollerWidth);
        this.uiScroll = new Scroll({
            wrapper: wrapper,
            scrollX: true, //横向滚动
            scrollY: false,   //竖直滚动
            scrollbars: true,
            scrollStart: function() {
              console.log('start:' + this.maxScrollX);
            }
        });

         
      }
    
    },
    onHide:function(){
      //scroll.destroy();
      
    },
    scrollToAction: function() {
      //x, y, time, easing
      var x = this.uiScroll.x;
      
      this.uiScroll.scrollTo(x - 300, 0, 500);
    }
  });
    return view;
});