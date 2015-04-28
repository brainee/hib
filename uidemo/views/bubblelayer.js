// ------------------------------
// 选择用车城市
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('bubbleLayer.html')], function (libs, c, CarModel, CarStore, BasePageView, viewhtml) {

  var View = BasePageView.extend({

    pageid: '',
    //当前选中TAB
    CRT_TAB: 0,
    //pickon : 接机/接火车 hotline：热门线路 seeoff：送机/送火车 rent：日租/时租
    PAGE_TYPE: null,

    render: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click #filter': function (e) {
        var self = this;
        this.showBubbleLayer({
          dir: 'up',
          triggerEl: $(e.currentTarget),
          click: function (data) {
            self.showMessage(JSON.stringify(data));
          },
          itemTemplate: '<%=itemData.name%>',
          data: [
                        { name: '价格/星级' },
                        { name: '位置区域' },
                        { name: '品牌' },
                        { name: '入住有效期' }
                    ]
        });

      },
      'click #orderBy': function (e) {
        var self = this;
        this.showBubbleLayer({
          dir: 'up',
          triggerEl: $(e.currentTarget),
          click: function (data) {
            self.showMessage(JSON.stringify(data));
          },
          itemTemplate: '<%=itemData.name%>',
          data: [
                        { name: '默认排序' },
                        { name: '最新开团' },
                        { name: '销量从高到低' },
                        { name: '折扣从高到低' },
                        { name: '价格从高到低' }
                    ]
        });

      },
      'click .ttt2>li': function (e) {
        var self = this;
        this.showBubbleLayer({
          dir: 'down',
          triggerEl: $(e.currentTarget),
          click: function (data) {
            self.showMessage(JSON.stringify(data));
          },
          itemTemplate: '<%=itemData.name%>',
          data: [
                        { name: '默认排序' },
                        { name: '最新开团' },
                        { name: '销量从高到低' },
                        { name: '折扣从高到低' },
                        { name: '价格从高到低' }
                    ]
        });

      },

      'click #demo1': function (e) {
        var self = this;
        self.showBubbleLayer({
          dir: 'up',
          triggerEl: $(e.currentTarget),
          click: function (data) {
            self.showMessage(JSON.stringify(data));
          },
          itemTemplate: '<%=itemData.name%>：<%=itemData.data%>',
          data: [
                        { name: '价格', data: '￥35' },
                        { name: '评分', data: 80 },
                        { name: '级别', data: 5 }
                    ]
        });

      }
    },

    onCreate: function () {
      this.injectHeaderView();
      this.render();
    },

    onLoad: function () {

      var self = this;

      //对HeaderView设置数据
      this.headerview.set({
        //title: '用车城市',
        title: '冒泡浮层',
        back: true,
        view: self,
        tel: null,
        home: null,
        events: {
          returnHandler: function () {
            this.back('index');
          }
        }
      });

      //将HeaderView显示出来
      this.headerview.show();


      this.turning();

    },

    onShow: function () {

    },

    onHide: function () {

    }
  });
  return View;
});