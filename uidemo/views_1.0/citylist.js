// ------------------------------
// 选择用车城市
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('citylist.html'), 'cUIBusinessGroupList'], function (libs, c, CarModel, CarStore, BasePageView, viewhtml, cUIBusinessGroupList) {

    var HistorySearchCitysStore = CarStore.HistorySearchCitysStore.getInstance();
    //    var CurrentCityInfoStore = CarStore.CurrentCityInfoStore.getInstance();
    var citylist = null;

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
                title: '测试城市列表',
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


            this.updatePage();

            this.turning();


        },

        updatePage: function (callback, error) {
            var that = this;
            //历史记录，以及当前标签
            var HistorySearchCitysData = HistorySearchCitysStore.get();
            this.CRT_TAB = HistorySearchCitysData ? HistorySearchCitysData.crt || 0 : 0;

            var SearchCitysModel = CarModel.PickonSearchCitysModel.getInstance();

            SearchCitysModel.excute(function (data) {
                var cityObj = storeinstance.get();


                if (!citylist) {

                    //这里开始操作，取出当前选项
                    //历史选项
                    //热门数据
                    //国内数据
                    //国际数据
                    var secKey = null;
                    var inland = [];

                    var currentcity = {};
                    currentcity.name = '当前城市';
                    currentcity.data = [{ name: '正在定位....', id: '-1'}];

                    if (cityObj) {
                        secKey = cityObj.id;
                        //当前城市
                        currentcity = {};
                        currentcity.name = '当前城市';
                        currentcity.data = [cityObj];
                        console.log(currentcity);
                    }

                    inland.push(currentcity);


                    //热门城市
                    var inlandhot = {};
                    inlandhot.name = '热门城市';
                    inlandhot.data = [];
                    for (var k in data.inlandhot) {
                        inlandhot.data.push(data.inlandhot[k]);
                    }
                    //国内数据

                    inland.push(inlandhot);

                    for (var k in data.inland) {
                        var obj = {};
                        obj.name = k;
                        obj.data = data.inland[k];
                        inland.push(obj);
                    }


                    //国际数据
                    var inter = [];
                    for (var k in data.inter) {
                        var obj = {};
                        obj.name = k;
                        obj.data = data.inter[k];
                        inter.push(obj);
                    }

                    console.log(inland);

                    citylist = new cUIBusinessGroupList({
                        rootBox: this.$('#wrapper'),
                        filter: 'en,py,name,fsten',
                        //  needTab: false,
                        selectedKey: secKey,
                        needFold: true,

                        //            unFoldOne: true,
                        //          foldAll: true,
                        //        groupIndex: 1,
                        //        selectedKey: 28,

                        groupObj: [
                            { name: '国内城市', data: inland },
                            { name: '国际城市', data: inter }
                        ],
                        click: function (data) {

                            var s = '';
                            console.log(data);

                            storeinstance.set(data)

                            that.forward('selectcity');
                            //执行保存信息
                            //            this.back();

                        }

                    });
                }  
                    if (cityObj) {
                        secKey = cityObj.id;
                        //当前城市
                        var currentcity = {};
                        currentcity.name = '当前城市';
                        currentcity.data = [cityObj];
                        console.log(currentcity);
                        citylist.updateAllTabGroup(0, currentcity);
                    }

                


                var s = '';

            }, function () {
                error && error.call(this);
            }, false, this);
        },

        onShow: function () {

        },

        onHide: function () {

        }
    });
    return View;
});