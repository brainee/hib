/**
 * Created by huangjianhua on 14-3-6.
 */

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('demo_c.html'), 'cUIBusinessGroupList'], function(libs, c, CarModel, CarStore, BasePageView, viewhtml, cUIBusinessGroupList) {
    var HistorySearchCitysStore = CarStore.HistorySearchCitysStore.getInstance();

    var View = BasePageView.extend({
        pageid: '',
        CAR_TAB: 0,
        PAGE_TYPE: null,

        render: function() {
            this.$el.html(viewhtml);
        },

        events: {

        },

        onCreate: function() {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function() {
            var self = this;

            this.headerview.set({
                title: 'test citylist',
                back: true,
                view: self,
                tel: null,
                home: null,
                events: {
                    returnHandler: function() {
                        this.back('index');
                    }
                }
            });

            this.headerview.show();
            this.updatePage();
            this.turning();

        },

        updatePage: function(callback, error) {
            var HistorySearchCitysData = HistorySearchCitysStore.get();
            this.CAR_TAB = HistorySearchCitysData ? HistorySearchCitysData.crt || 0 : 0;

            var SearchCitysModel = CarModel.PickonSearchCitysModel.getInstance();

            SearchCitysModel.excute(function(data) {
                var inlandhot = {};
                inlandhot.name = '热门城市';
                inlandhot.data = [];
                for(var k in data.inlandhot) {
                    inlandhot.data.push(data.inlandhot[k]);
                    console.log(data.inlandhot[k]);
                }
                //国内数据
                var inland = [];
                inland.push(inlandhot);

                for(var k in data.inland) {
                    var obj = {};
                    obj.name = k;
                    obj.data = data.inland[k];
                    inland.push(obj);
                }

                //国际数据
                var inter = [];
                for(var k in data.inter) {
                    var obj = {};
                    obj.name = k;
                    obj.data = data.inter[k];
                    inter.push(obj);
                }

                window.citylist = new cUIBusinessGroupList({
                   rootBox: this.$('#wrapper'),
                    filter: 'en,py,name,fsten',
                    needFold: true,

                    groupObj: [
                        { name: '国内城市', data: inland },
                        { name: '国际城市', data: inter }
                    ],
                    click: function() {
                        var s = '';
                        console.log(data);
                    }
                });
                var s = '';

            }, function() {
                error && error.call(this);
            }, false, this);
        },

        onShow: function() {

        },

        onHide: function() {

        }

    });
    return View;
});