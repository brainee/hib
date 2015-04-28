/**
 * Created by huangjianhua on 14-3-5.
 */
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('citylist_2.html'), 'cUIBusinessGroupList', 'cUI', 'CarModel', 'CarStore'], function (libs, c, pageview, html, cUIBusinessGroupList, cUI, CarModel, CarStore) {
    "use strict";

    var s = null;
    var citylist = null;
    var HistorySearchCitysStore = CarStore.HistorySearchCitysStore.getInstance();
    var HistorySearchCitysData = HistorySearchCitysStore.get();

    var CurrentCityInfoStore = CarStore.CurrentCityInfoStore.getInstance();

//    console.log(HistorySearchCitysData + ' ------');
//    console.log(CurrentCityInfoStore);

    var View = pageview.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            this.headerview.set({
                title: 'citylist组件',
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

//            if(!citylist) {
//                var inter = {
//                    "D": [
//                        {
//                            "attr": 1,
//                            "ctryid": 1,
//                            "en": "Dalian",
//                            "fsten": "D",
//                            "fstpy": "D",
//                            "hot": true,
//                            "id": 6,
//                            "jp": "",
//                            "name": "大连",
//                            "py": "Dalian"
//                        }
//                    ],  "B": [
//                        {
//                            "attr": 1,
//                            "ctryid": 1,
//                            "en": "Beijing",
//                            "fsten": "B",
//                            "fstpy": "B",
//                            "hot": true,
//                            "id": 1,
//                            "jp": "",
//                            "name": "北京",
//                            "py": "Beijing"
//                        }
//                    ]
//
//                }
//
//                var inland = {
//                    "D": [
//                        {
//                            "attr": 1,
//                            "ctryid": 1,
//                            "en": "Dalian",
//                            "fsten": "D",
//                            "fstpy": "D",
//                            "hot": true,
//                            "id": 6,
//                            "jp": "",
//                            "name": "大连",
//                            "py": "Dalian"
//                        }
//                    ],  "B": [
//                        {
//                            "attr": 1,
//                            "ctryid": 1,
//                            "en": "Beijing",
//                            "fsten": "B",
//                            "fstpy": "B",
//                            "hot": true,
//                            "id": 1,
//                            "jp": "",
//                            "name": "北京",
//                            "py": "Beijing"
//                        }
//                    ]
//
//                }

//            var inlandhot = {};
//            inlandhot.name = '热门城市';
//            inlandhot.data = ['上海','北京'];
//            for (var k in inlandhot.data) {
//                inlandhot.data.push(inlandhot.data[k]);
//            }
//            //国内数据
//            var inland = [];
//            inland.push(inlandhot);
//            for (var k in inlandhot.data) {
//                var obj = {};
//                obj.name = k;
//                obj.data = inlandhot.data[k];
//                inland.push(obj);
//            }

//            var inland = {'name':'热门城市', 'data':[{'1':'上海'},{'2':'北京'}]};
//            var inter = {'name':'热门城市', 'data':[{'1':'上海'},{'2':'北京'}]};
//            var inter = {'name':'热门城市', 'data':['上海','北京']};

            /*
            var inlandhot = {};
            inlandhot.name = 'hotcity';
            inlandhot.data = ['shanghai','beijing'];
            for (var k in inlandhot.data) {
                console.log(k + ' --- ' + inlandhot.data[k]);
                inlandhot.data.push(inlandhot.data[k]);
            }
            //国内数据

            var inland = [];
            inland.push(inlandhot);
            for (var k in inlandhot.data) {
                var obj = {};
                obj.name = k;
                obj.data = inlandhot.data[k];
                inland.push(obj);

                console.log(obj.name + ' ===' + obj.data + '===');
            }

            var interhot = {};
            interhot.name = 'hotcity2';
            interhot.data = ['shanghai','beijing'];
            for (var k in interhot.data) {
                console.log(k + ' --- ' + interhot.data[k]);
                interhot.data.push(interhot.data[k]);
            }
            //国外数据

            var inter = [];
            inter.push(interhot);
            for (var k in interhot.data) {
                var obj = {};
                obj.name = k;
                obj.data = interhot.data[k];
                inter.push(obj);

                console.log(obj.name + ' ===' + obj.data + '===');
            }
            */

            var inland = [
                { name: '热门城市', id: 1, unFold: true, data: [{ "attr": 1, "ctryid": 1, "en": "Shanghai", "fsten": "S", "fstpy": "S", "hot": true, "id": 2, "jp": "", "name": "上海", "py": "Shanghai" }, { "attr": 1, "ctryid": 1, "en": "Sanya", "fsten": "S", "fstpy": "S", "hot": true, "id": 43, "jp": "", "name": "三亚", "py": "Sanya" }, { "attr": 1, "ctryid": 1, "en": "Chengdu", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "成都", "py": "Chengdu" }, { "attr": 1, "ctryid": 1, "en": "Hangzhou", "fsten": "H", "fstpy": "H", "hot": true, "id": 17, "jp": "", "name": "杭州", "py": "Hangzhou" }, { "attr": 1, "ctryid": 1, "en": "Guangzhou", "fsten": "G", "fstpy": "G", "hot": true, "id": 32, "jp": "", "name": "广州", "py": "Guangzhou" }, { "attr": 1, "ctryid": 1, "en": "Xi'an", "fsten": "X", "fstpy": "X", "hot": true, "id": 10, "jp": "", "name": "西安", "py": "Xi'an" }, { "attr": 1, "ctryid": 1, "en": "Shenzhen", "fsten": "S", "fstpy": "S", "hot": true, "id": 30, "jp": "", "name": "深圳", "py": "Shenzhen" }, { "attr": 1, "ctryid": 1, "en": "Qingdao", "fsten": "Q", "fstpy": "Q", "hot": true, "id": 7, "jp": "", "name": "青岛", "py": "Qingdao" }, { "attr": 1, "ctryid": 1, "en": "Xiamen", "fsten": "X", "fstpy": "X", "hot": true, "id": 25, "jp": "", "name": "厦门", "py": "Xiamen" }, { "attr": 1, "ctryid": 1, "en": "Wuhan", "fsten": "W", "fstpy": "W", "hot": true, "id": 477, "jp": "", "name": "武汉", "py": "Wuhan" }, { "attr": 1, "ctryid": 1, "en": "Chongqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 4, "jp": "", "name": "重庆", "py": "Chongqing" }, { "attr": 1, "ctryid": 1, "en": "Dalian", "fsten": "D", "fstpy": "D", "hot": true, "id": 6, "jp": "", "name": "大连", "py": "Dalian"}]
                },
                { name: 'B', data: [{ "attr": 1, "ctryid": 1, "en": "Baotou", "fsten": "B", "fstpy": "B", "hot": false, "id": 141, "jp": "", "name": "包头", "py": "Baotou"}] },
                { name: 'C', data: [{ "attr": 1, "ctryid": 1, "en": "Changchun", "fsten": "C", "fstpy": "C", "hot": false, "id": 158, "jp": "", "name": "长春", "py": "Changchun" }, { "attr": 1, "ctryid": 1, "en": "Changsha", "fsten": "C", "fstpy": "C", "hot": false, "id": 206, "jp": "", "name": "长沙", "py": "Changsha" }, { "attr": 1, "ctryid": 1, "en": "Changzhou", "fsten": "C", "fstpy": "C", "hot": false, "id": 213, "jp": "", "name": "常州", "py": "Changzhou" }, { "attr": 1, "ctryid": 1, "en": "Chengdu", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "成都", "py": "Chengdu" }, { "attr": 1, "ctryid": 1, "en": "Chongqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 4, "jp": "", "name": "重庆", "py": "Chongqing"}] },
                { name: 'D', data: [{ "attr": 1, "ctryid": 1, "en": "Dongguan", "fsten": "D", "fstpy": "D", "hot": false, "id": 223, "jp": "", "name": "东莞", "py": "Dongguan" }, { "attr": 1, "ctryid": 1, "en": "Dalian", "fsten": "D", "fstpy": "D", "hot": true, "id": 6, "jp": "", "name": "大连", "py": "Dalian"}] }
            ];

            var inter = [
                { name: 'B', data: [{ "attr": 1, "ctryid": 1, "en": "Baotou", "fsten": "B", "fstpy": "B", "hot": false, "id": 141, "jp": "", "name": "包头", "py": "Baotou"}] },
                { name: 'C', data: [{ "attr": 1, "ctryid": 1, "en": "Changchun", "fsten": "C", "fstpy": "C", "hot": false, "id": 158, "jp": "", "name": "长春", "py": "Changchun" }, { "attr": 1, "ctryid": 1, "en": "Changsha", "fsten": "C", "fstpy": "C", "hot": false, "id": 206, "jp": "", "name": "长沙", "py": "Changsha" }, { "attr": 1, "ctryid": 1, "en": "Changzhou", "fsten": "C", "fstpy": "C", "hot": false, "id": 213, "jp": "", "name": "常州", "py": "Changzhou" }, { "attr": 1, "ctryid": 1, "en": "Chengdu", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "成都", "py": "Chengdu" }, { "attr": 1, "ctryid": 1, "en": "Chongqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 4, "jp": "", "name": "重庆", "py": "Chongqing"}] },
                { name: 'D', data: [{ "attr": 1, "ctryid": 1, "en": "Dongguan", "fsten": "D", "fstpy": "D", "hot": false, "id": 223, "jp": "", "name": "东莞", "py": "Dongguan" }, { "attr": 1, "ctryid": 1, "en": "Dalian", "fsten": "D", "fstpy": "D", "hot": true, "id": 6, "jp": "", "name": "大连", "py": "Dalian"}] }
            ];

                citylist = new cUIBusinessGroupList({
//dom结构的容器，这个可以设置为this.$el，不然的话会放到body下
//建议放到this.$el，或者在view里面新建容器
                    rootBox: this.$('#wrapper'),

//用于搜索的字段，以","分割，搜索会按照这些字段进行搜索
                    filter: 'en,py,name,fsten',

//设置是否需要tab标签，比如说只有一个tab的场景（选择机场）
                    needTab: false,

//是否全部折叠，设置为ture的时候全部会折叠起来，默认为false
                    // foldAll: true,

//当具有折叠功能时候，是否只能展示一个，默认为false，为true时候只会展示一个
                    // unFoldOne: true,

//设置是否需要折叠功能，默认不需要，当设置全部折叠时候该属性会被强制设置为true
                    needFold: true,

//设置当前显示的标签（国内或者国际），该属性一般存储在localstorage中，需要记录上次信息
                    // groupIndex: 1,

//设置当前选择值，只设置键值，该属性一般存储于localstorage中
                    // selectedKey: 28,

//重要数据！需要各位注意
//这里传入的一定是已经处理好了的数据，框架本身不对数据进行处理
//以热门城市为例，其中的data(inland)需要自己组织，数组的第一项为热门城市，后面才行国内城市
//如果第一项有当前选择的话，也需要自己传入
                    /*
                     var inlandhot = {};
                     inlandhot.name = '热门城市';
                     inlandhot.data = [];
                     for (var k in data.inlandhot) {
                     inlandhot.data.push(data.inlandhot[k]);
                     }
                     //国内数据
                     var inland = [];
                     inland.push(inlandhot);
                     for (var k in data.inland) {
                     var obj = {};
                     obj.name = k;
                     obj.data = data.inland[k];
                     inland.push(obj);
                     }
                     */
//name为标签项，data才是具体数据
                    groupObj: [
                        { name: '国内城市', data: inland },
                        { name: '国际城市', data: inter }
                    ],
//点击每个项目时候触发的事件，data为你点击时候的数据
                    click: function (data) {
                        var s = '';
                        console.log(data);
                        //执行保存信息
                        // this.back();
                    }
                });


//            }

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