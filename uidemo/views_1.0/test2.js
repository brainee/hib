// ------------------------------
// 订单填写
// ------------------------------

define(['libs', 'c', 'cUIBusinessGroupList', 'cUICore', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('test2.html'), 'cWidgetFactory', ], function (libs, c, cUIBusinessGroupList, cui, CarModel, CarStore, BasePageView, viewhtml, WidgetFactory) {
    window.log = window.alert;

    window.alert = function (msg) {
        $('body').append('<div>' + msg + '</div>')
        console.log(msg);
    };

    var _templateFn = _.template(viewhtml);

    var View = BasePageView.extend({
        hasAd: true,
        render: function () {
            var html = _templateFn();
            this.$el.html(html);
        },

        events: {

        },

        native: function () {


        },


        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            var self = this;

            //对HeaderView设置数据
            this.headerview.set({
                title: '滚轮demo',
                back: null,
                view: self,
                tel: null,
                home: null
            });

            this.headerview.show();
            this.turning();


            //分组列表相关
            var glWrapper = this.$('#grouplistWrapper');
            var gldata = [
                { name: '热门城市', id: 1, unFold: true, data: [{ "attr": 1, "ctryid": 1, "en": "Shanghai", "fsten": "S", "fstpy": "S", "hot": true, "id": 2, "jp": "", "name": "上海", "py": "Shanghai" }, { "attr": 1, "ctryid": 1, "en": "Sanya", "fsten": "S", "fstpy": "S", "hot": true, "id": 43, "jp": "", "name": "三亚", "py": "Sanya" }, { "attr": 1, "ctryid": 1, "en": "Chengdu", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "成都", "py": "Chengdu" }, { "attr": 1, "ctryid": 1, "en": "Hangzhou", "fsten": "H", "fstpy": "H", "hot": true, "id": 17, "jp": "", "name": "杭州", "py": "Hangzhou" }, { "attr": 1, "ctryid": 1, "en": "Guangzhou", "fsten": "G", "fstpy": "G", "hot": true, "id": 32, "jp": "", "name": "广州", "py": "Guangzhou" }, { "attr": 1, "ctryid": 1, "en": "Xi'an", "fsten": "X", "fstpy": "X", "hot": true, "id": 10, "jp": "", "name": "西安", "py": "Xi'an" }, { "attr": 1, "ctryid": 1, "en": "Shenzhen", "fsten": "S", "fstpy": "S", "hot": true, "id": 30, "jp": "", "name": "深圳", "py": "Shenzhen" }, { "attr": 1, "ctryid": 1, "en": "Qingdao", "fsten": "Q", "fstpy": "Q", "hot": true, "id": 7, "jp": "", "name": "青岛", "py": "Qingdao" }, { "attr": 1, "ctryid": 1, "en": "Xiamen", "fsten": "X", "fstpy": "X", "hot": true, "id": 25, "jp": "", "name": "厦门", "py": "Xiamen" }, { "attr": 1, "ctryid": 1, "en": "Wuhan", "fsten": "W", "fstpy": "W", "hot": true, "id": 477, "jp": "", "name": "武汉", "py": "Wuhan" }, { "attr": 1, "ctryid": 1, "en": "Chongqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 4, "jp": "", "name": "重庆", "py": "Chongqing" }, { "attr": 1, "ctryid": 1, "en": "Dalian", "fsten": "D", "fstpy": "D", "hot": true, "id": 6, "jp": "", "name": "大连", "py": "Dalian"}]
                },
                { name: 'B', data: [{ "attr": 1, "ctryid": 1, "en": "Baotou", "fsten": "B", "fstpy": "B", "hot": false, "id": 141, "jp": "", "name": "包头", "py": "Baotou"}] },
                { name: 'C', data: [{ "attr": 1, "ctryid": 1, "en": "Changchun", "fsten": "C", "fstpy": "C", "hot": false, "id": 158, "jp": "", "name": "长春", "py": "Changchun" }, { "attr": 1, "ctryid": 1, "en": "Changsha", "fsten": "C", "fstpy": "C", "hot": false, "id": 206, "jp": "", "name": "长沙", "py": "Changsha" }, { "attr": 1, "ctryid": 1, "en": "Changzhou", "fsten": "C", "fstpy": "C", "hot": false, "id": 213, "jp": "", "name": "常州", "py": "Changzhou" }, { "attr": 1, "ctryid": 1, "en": "Chengdu", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "成都", "py": "Chengdu" }, { "attr": 1, "ctryid": 1, "en": "Chongqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 4, "jp": "", "name": "重庆", "py": "Chongqing"}] },
                { name: 'D', data: [{ "attr": 1, "ctryid": 1, "en": "Dongguan", "fsten": "D", "fstpy": "D", "hot": false, "id": 223, "jp": "", "name": "东莞", "py": "Dongguan" }, { "attr": 1, "ctryid": 1, "en": "Dalian", "fsten": "D", "fstpy": "D", "hot": true, "id": 6, "jp": "", "name": "大连", "py": "Dalian"}] }
            ];

            var gldata1 = [
                { name: 'B', data: [{ "attr": 1, "ctryid": 1, "en": "Baotou", "fsten": "B", "fstpy": "B", "hot": false, "id": 141, "jp": "", "name": "包头", "py": "Baotou"}] },
                { name: 'C', data: [{ "attr": 1, "ctryid": 1, "en": "Changchun", "fsten": "C", "fstpy": "C", "hot": false, "id": 158, "jp": "", "name": "长春", "py": "Changchun" }, { "attr": 1, "ctryid": 1, "en": "Changsha", "fsten": "C", "fstpy": "C", "hot": false, "id": 206, "jp": "", "name": "长沙", "py": "Changsha" }, { "attr": 1, "ctryid": 1, "en": "Changzhou", "fsten": "C", "fstpy": "C", "hot": false, "id": 213, "jp": "", "name": "常州", "py": "Changzhou" }, { "attr": 1, "ctryid": 1, "en": "Chengdu", "fsten": "C", "fstpy": "C", "hot": true, "id": 28, "jp": "", "name": "成都", "py": "Chengdu" }, { "attr": 1, "ctryid": 1, "en": "Chongqing", "fsten": "C", "fstpy": "C", "hot": true, "id": 4, "jp": "", "name": "重庆", "py": "Chongqing"}] },
                { name: 'D', data: [{ "attr": 1, "ctryid": 1, "en": "Dongguan", "fsten": "D", "fstpy": "D", "hot": false, "id": 223, "jp": "", "name": "东莞", "py": "Dongguan" }, { "attr": 1, "ctryid": 1, "en": "Dalian", "fsten": "D", "fstpy": "D", "hot": true, "id": 6, "jp": "", "name": "大连", "py": "Dalian"}] }
            ];

            window.citylist = new cUIBusinessGroupList({
                rootBox: this.$('#wrapper'),
                filter: 'py,name,fsten',
                groupObj: [
                    { name: '国内城市', data: gldata },
                    { name: '国际城市', data: gldata1 }

                ],
//        groupIndex: 1,
//        selectedKey: 28,
                click: function (data) {

                    var s = '';
                    console.log(data);
                },

//                needTab:false

            });


        },

        onShow: function () {

        },

        onHide: function () {
        }
    });

    return View;

});