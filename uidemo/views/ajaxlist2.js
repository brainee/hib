// ------------------------------
// 选择用车城市
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('ajaxlist2.html'), 'cUIBusinessGroupList', 'cGeoService'], function (libs, c, CarModel, CarStore, BasePageView, viewhtml, cUIBusinessGroupList, GeoService) {

    var HistorySearchCitysStore = CarStore.HistorySearchCitysStore.getInstance();
    var ajaxlist = null;

    var GeoKeyword = GeoService.GeoKeyword;

    var StoreCase = new c.base.Class(c.store, {
        __propertys__: function () {
            this.key = 'STORAGE_EXAMPLE', //设置在localstorage中的key值
                this.lifeTime = '2D'       //生产
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
                title: '用车城市',
//                title: '携程在线聊天',
                back: true,
                view: self,
                tel: null,
                home: null,
                events: {
                    returnHandler: function () {
                        this.back('ajaxselect');
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

            var curList = {};  //update list 存放数组
            curList.name = '历史记录';
            var data = {};
//            data.inland = { "朋友": [{ "attr": 1, "ctryid": 1, "en": "Wanglei", "fsten": "W", "fstpy": "W", "hot": false, "id": 158, "jp": "", "name": "王磊", "py": "Wanglei", "info":"hello world" }, { "attr": 1, "ctryid": 1, "en": "Liuyan", "fsten": "L", "fstpy": "L", "hot": false, "id": 206, "jp": "", "name": "刘燕", "py": "Liuyan", "info":"hello world" }, { "attr": 1, "ctryid": 1, "en": "Changqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "常青", "py": "Changqing", "info":"hello world" }, { "attr": 1, "ctryid": 1, "en": "Huangchunhua", "fsten": "H", "fstpy": "H", "hot": true, "id": 4, "jp": "", "name": "黄春华", "py": "Huangchunhua", "info":"hello world"}] };
            data.inland = {"历史记录": storeinstance.getAttr('hisList')||[]};

            if (!ajaxlist) {
                var secKey = null;
                var inland = [];
                var hisSel = ''; //历史城市
                var hisHtml = null;

                for (var k in data.inland) {
                    var obj = {};
                    obj.name = k;
                    obj.data = data.inland[k];
                    inland.push(obj);
                }

                ajaxlist = new cUIBusinessGroupList({
                    showFnBtn: true,
                    fnBtnCallback: function () {
                        curList.data = [];
                        ajaxlist.updateAllTabGroup(0,curList);
                        storeinstance.remove();
                    },
                    fnBtnTxt: '清除历史',
                    rootBox: this.$('#wrapper'),
                    needTab: false,
                    filter: 'en,py,name,fsten',
                    selectedKey: secKey,
                    itemTemplate: '<div><%=itemData.name%><br/></div>',
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

                        //add store
                        that.addHistory(data);
                        storeinstance.setAttr('showHisName', data);   //当前城市
                        that.forward('ajaxselect');
                    }
                });
            } else {
                //storeName 存在则更新secKey
                secKey = storeinstance.getAttr('showHisName') ? storeinstance.getAttr('showHisName').id : null;
//                console.log(secKey);

                curList.data = storeinstance.getAttr('hisList') || [];
                //若store数据存在  则跟新列表
                curList.data ? ajaxlist.updateAllTabGroup(0,curList):'';
            }
        },

        addHistory: function(data) {
            if(data.name) {
                var list = storeinstance.getAttr('hisList') || [];
                var iflag = -1;
                for(var i= 0, len=list.length;i<len; i++) {
                    if(list[i].name == data.name) {
                        iflag = i;
                        break;
                    }
                }

                iflag >= 0 ? '': list.unshift(data);

                storeinstance.set({ hisList:list });
            }
        },

        onShow: function () {

        },

        onHide: function () {

        }
    });
    return View;
});