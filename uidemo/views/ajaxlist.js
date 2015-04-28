// ------------------------------
// 选择用车城市
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('ajaxlist.html'), 'cUIBusinessGroupList', 'cGeoService'], function (libs, c, CarModel, CarStore, BasePageView, viewhtml, cUIBusinessGroupList, GeoService) {

  var HistorySearchCitysStore = CarStore.HistorySearchCitysStore.getInstance();
  var qqlist = null;

  var GeoKeyword = GeoService.GeoKeyword;

  var StoreCase = new c.base.Class(c.store, {
    __propertys__: function () {
      this.key = 'STORAGE_EXAMPLE', //设置在localstorage中的key值
                this.lifeTime = '2D'            //生产
    },
    initialize: function ($super, options) {
      $super(options);
    }
  });

  var storeinstance = StoreCase.getInstance();

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
        title: '携程在线聊天',
        back: true,
        view: self,
        tel: null,
        home: null,
        events: {
          returnHandler: function () {
            this.back('selectqq');
          }
        }
      });

      //将HeaderView显示出来
      this.headerview.show();

      this.updatePage();

      this.turning();

    },

    updatePage: function (callback, error) {
      var that = this;
      //历史记录，以及当前标签
      var HistorySearchCitysData = HistorySearchCitysStore.get();
      this.CRT_TAB = HistorySearchCitysData ? HistorySearchCitysData.crt || 0 : 0;

      var SearchCitysModel = CarModel.PickonSearchCitysModel.getInstance();

      var data = {};
      data.inland = { "朋友": [{ "attr": 1, "ctryid": 1, "en": "Wanglei", "fsten": "W", "fstpy": "W", "hot": false, "id": 158, "jp": "", "name": "王磊", "py": "Wanglei" }, { "attr": 1, "ctryid": 1, "en": "Liuyan", "fsten": "L", "fstpy": "L", "hot": false, "id": 206, "jp": "", "name": "刘燕", "py": "Liuyan" }, { "attr": 1, "ctryid": 1, "en": "Changqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "常青", "py": "Changqing" }, { "attr": 1, "ctryid": 1, "en": "Huangchunhua", "fsten": "H", "fstpy": "H", "hot": true, "id": 4, "jp": "", "name": "黄春华", "py": "Huangchunhua"}] };

      if (!qqlist) {

        var secKey = null;
        var inland = [];

        for (var k in data.inland) {
          var obj = {};
          obj.name = k;
          obj.data = data.inland[k];
          inland.push(obj);
        }


        var inter = [];
        for (var k in data.inter) {
          var obj = {};
          obj.name = k;
          obj.data = data.inter[k];
          inter.push(obj);
        }
        window.qqlist = new cUIBusinessGroupList({
          showFnBtn: true,
          fnBtnCallback: function () {
            alert('');
          },
          fnBtnTxt: '测试',
          rootBox: this.$('#wrapper'),
          needTab: false,
          filter: 'en,py,name,fsten',
          selectedKey: secKey,
          itemTemplate: '<div><%=itemData.name%><br/><%=itemData.en%></div>',
          groupObj: [
            { name: '好友列表', data: inland }
          ],
          isAjax: true,
          //这里需要一个特别的操作，就是每次请求数据成功后在手动调用
          //keyword为搜索文本框当前的值，会用于ajax的参数
          ajaxCallBack: function (keyword) {
            scope = this;

            //地图定位
            GeoKeyword.Subscribe(keyword, '上海', function (data) {

              scope.ajaxDataHandle(data);

            });

          },
          click: function (data) {
            console.log(data);
            return;
            storeinstance.set(data)
            that.forward('selectqq');
          }

        });
      }
    },

    onShow: function () {

    },

    onHide: function () {

    }
  });
  return View;
});