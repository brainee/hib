"use strict"
define(['libs', 'c', 'cBasePageView', 'cUI', buildViewTemplatesPath('scrollradio.html')], function (libs, c, pageview, cUI, html) {

  var s = null;
  var View = pageview.extend({
    render: function () {
      this.$el.html(html);
    },

    onCreate: function () {
      this.injectHeaderView();
      this.render();
    },

    events: {
      'click #input': 'testAction',
      'click #port_time': 'portAction',
      'click #city': function () {
        var data1 = [
          { key: 1, val: '北京' },
          { key: 2, val: '上海' },
          { key: 3, val: '四川' }
        ];

        var data2 = [
          { key: 4, val: '北京1' },
          { key: 5, val: '北京2' },
          { key: 6, val: '北京3' },
          { key: 7, val: '北京4' }
        ];

        var data3 = [
          { key: 8, val: '四川1' },
          { key: 9, val: '四川2' }
        ];

        s = new c.ui.ScrollRadio({
          title: '选择日期',
          data: [data1, data2],
          disItemNum: 3,
          cancel: 'cancel',              //按钮取消的文本
          ok: 'ok',                       //按钮确认的文本
          okClick: function (item) {      //确定回调函数
            var t1 = item[0], t2 = item[1];
            var str = t1.key + '' + t2.key;
            var index = t1.index + ',' + t2.index;
            validity.val(str);
            validity.attr('index', index);
            console.log('ok callback');
          },

          changed: [
            function (item) {
              this.scroll[1].reload(data3);
            }
          ],

          cancelClick: function () {   //取消回调函数
            console.log('cancel callback');
          }
        });
        s.show();

      }
    },

    testAction: function () {
      var validity = this.$el.find('#input');
      var arrIndex = validity.attr('index');
      arrIndex = arrIndex ? arrIndex.split(',') : [];

      var d1 = [];
      for (var i = 0; i < 50; i++) {
        d1.push({ key: (2013 + i) });
      }

      var d2 = [];
      for (var i = 0; i < 12; i++) {
        var j = i + 1;
        if (j < 10) j = '0' + j;
        d2.push({ key: j });
      }

      s = new c.ui.ScrollRadio({
        title: '选择日期',
        data: [d1, d2],
        index: arrIndex,
        disItemNum: 3,                  // scroll组件显示项目
        cancel: 'cancel',              //按钮取消的文本
        ok: 'ok',                       //按钮确认的文本
        okClick: function (item) {      //确定回调函数
          var t1 = item[0], t2 = item[1];
          var str = t1.key + '' + t2.key;
          var index = t1.index + ',' + t2.index;
          validity.val(str);
          validity.attr('index', index);
          console.log('ok callback');
        },
        cancelClick: function () {   //取消回调函数
          console.log('cancel callback');
        }
      });
      s.show();
    },


    portAction: function () {
      var port_time = this.$el.find('#port_time');
      var arrIndex = port_time.attr('index');
      arrIndex = arrIndex ? arrIndex.split(',') : [];

      var d1 = [];
      for (var i = 0; i < 300; i++) {
        var j = i % 7;
        d1.push({ key: '3月11日 周 ' + (j + 1) });
      }
      var d2 = [];
      for (var i = 0; i < 24; i++) {
        d2.push({ key: (i + 1) });
      }
      var d3 = [];
      for (var i = 0; i < 6; i++) {
        d3.push({ key: (i + 1) * 10 });
      }

      var scope = this;
      var s = new c.ui.ScrollRadio({
        title: '用车时间',
        data: [d1, d2, d3],
        index: arrIndex,
        okClick: function (item) {
          var t1 = item[0], t2 = item[1], t3 = item[2];
          var str = t1.key + '-' + t2.key + ':' + t3.key;
          var index = t1.index + ',' + t2.index + ',' + t3.index;

          port_time.val(str);
          port_time.attr('index', index);
        },
        changed: [
                    function (item) {
                      this.setTips(item.key);
                    }, function (item) {
                      //                        console.log(item);
                    }, function (item) {
                      this.setTips(item.key);
                    }
                ]
      });
      s.show();
      //            console.log(s.mask);

    },

    onLoad: function () {
      this.headerview.set({
        title: 'scrollradio组件',
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
    },

    onShow: function () {

    },

    onHide: function () {

    }
  });

  return View;
});