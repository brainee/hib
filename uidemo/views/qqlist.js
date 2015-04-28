// ------------------------------
// 选择用车城市
// ------------------------------

define(['libs', 'c', 'CarModel', 'CarStore', 'cBasePageView', buildViewTemplatesPath('qqlist.html'), 'cUIBusinessGroupList'], function (libs, c, CarModel, CarStore, BasePageView, viewhtml, cUIBusinessGroupList) {

    var HistorySearchCitysStore = CarStore.HistorySearchCitysStore.getInstance();
    var qqlist = null;

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
			data.friends = {"朋友":[{"attr":1,"ctryid":1,"en":"Wanglei","fsten":"W","fstpy":"W","hot":false,"id":158,"jp":"","name":"王磊","py":"Wanglei","img":"http://face1.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=196203…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">给诺基亚一个面子，试下诺基亚X</span>"},{"attr":1,"ctryid":1,"en":"Liuyan","fsten":"L","fstpy":"L","hot":false,"id":206,"jp":"","name":"刘燕","py":"Liuyan","img":"http://face1.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=715453…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">宝贝儿快快退烧吧</span>"},{"attr":1,"ctryid":1,"en":"Changqing","fsten":"C","fstpy":"C","hot":true,"id":28,"jp":"","name":"常青","py":"Changqing","img":"http://face2.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=447917…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">~</span>"},{"attr":1,"ctryid":1,"en":"Huangchunhua","fsten":"H","fstpy":"H","hot":true,"id":4,"jp":"","name":"黄春华","py":"Huangchunhua","img":"http://face8.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=191928…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">胖寶貝&amp;豬囡囡~NMS~~~~2012.8.13</span>"}],"家人":[{"attr":1,"ctryid":1,"en":"Baba","fsten":"b","fstpy":"b","hot":false,"id":21268,"jp":"","name":"爸爸","py":"Baba","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=360963…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">不是在万达广场，就是在去万达广场的路上......</span>"},{"attr":1,"ctryid":1,"en":"Mama","fsten":"M","fstpy":"M","hot":true,"id":6,"jp":"","name":"妈妈","py":"Mama","img":"http://face2.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=372180…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">一念花开，一念花谢</span>"}],"同学":[{"attr":1,"ctryid":1,"en":"Wangdawei","fsten":"W","fstpy":"W","hot":false,"id":33,"jp":"","name":"王大伟","py":"Wangdawei","img":"http://face1.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=301032…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    "},{"attr":1,"ctryid":1,"en":"Xiexingfang","fsten":"X","fstpy":"X","hot":false,"id":38,"jp":"","name":"谢杏芳","py":"Xiexingfang","img":"http://face9.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=420944…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    "},{"attr":1,"ctryid":1,"en":"Zhangshiming","fsten":"Z","fstpy":"Z","hot":true,"id":32,"jp":"","name":"张世明","py":"Zhangshiming","img":"http://face4.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=230939…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    "}],"同事":[{"attr":1,"ctryid":1,"en":"Wangfei","fsten":"W","fstpy":"W","hot":false,"id":5,"jp":"","name":"王菲","py":"Wangfei","img":"http://face5.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=234173…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">道路寻宝人工结算只结算到3月18日，3月19日提交的自助结算。自助结算平台19日上线</span>"},{"attr":1,"ctryid":1,"en":"Zhouxi","fsten":"Z","fstpy":"Z","hot":false,"id":42,"jp":"","name":"周锡","py":"Zhouxi","img":"http://face7.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=305608…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">深刻体会到了尽早发现缺陷才能降低修复的成本</span>"},{"attr":1,"ctryid":1,"en":"Tianyuan","fsten":"T","fstpy":"T","hot":false,"id":278,"jp":"","name":"田元","py":"Tianyuan","img":"http://face6.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=112772…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">何曾想过如何立足于天地之间。。。</span>"},{"attr":1,"ctryid":1,"en":"Wangshutong","fsten":"W","fstpy":"W","hot":false,"id":103,"jp":"","name":"王舒同","py":"Wangshutong","img":"http://face9.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=423999…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    "},{"attr":1,"ctryid":1,"en":"Yangfan","fsten":"Y","fstpy":"Y","hot":true,"id":17,"jp":"","name":"杨帆","py":"Yangfan","img":"http://face8.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=190610…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    "},{"attr":1,"ctryid":1,"en":"Sunlaohu","fsten":"S","fstpy":"S","hot":false,"id":144,"jp":"","name":"孙老虎","py":"Sunlaohu","img":"http://face3.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=291512…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    "},{"attr":1,"ctryid":1,"en":"Zhangxin","fsten":"Z","fstpy":"Z","hot":false,"id":91,"jp":"","name":"张新","py":"Zhangxin","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=199162…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">刚刚帐号被盗了</span>"},{"attr":1,"ctryid":1,"en":"Tongyan","fsten":"T","fstpy":"T","hot":false,"id":350,"jp":"","name":"童言","py":"Tongyan","img":"http://face8.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=939632…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">/sjb/上当不是别人太狡猾，而是自己太贪，是因为自己才会上当~~~.</span>"},{"attr":1,"ctryid":1,"en":"Zhangshubin","fsten":"Z","fstpy":"Z","hot":true,"id":37,"jp":"","name":"张树斌","py":"Zhangshubin","img":"http://face2.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=107989…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">学会学习，学会生存！</span>"},{"attr":1,"ctryid":1,"en":"Zhangxiaofan","fsten":"Z","fstpy":"Z","hot":false,"id":370,"jp":"","name":"张小凡","py":"Zhangxiaofan","img":"http://face3.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=367034…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">感时花溅泪，恨别鸟惊心</span>"},{"attr":1,"ctryid":1,"en":"Huangjinjin","fsten":"H","fstpy":"H","hot":false,"id":12,"jp":"","name":"黄津津","py":"Huangjinjin","img":"http://face6.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=294773…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">包容与理解是互通。凡事没有对错，问心无愧则万事倘然。</span>"},{"attr":1,"ctryid":1,"en":"Limiaoying","fsten":"L","fstpy":"L","hot":false,"id":380,"jp":"","name":"李淼英","py":"Limiaoying","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=295902…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">雪成暮丝青如朝</span>"},{"attr":1,"ctryid":1,"en":"Xushuai","fsten":"X","fstpy":"X","hot":false,"id":375,"jp":"","name":"许帅","py":"Xushuai","img":"http://face8.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=360608…30c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33","status":"\n    \n    <span class=\"member_state\">[在线]</span>\n    \n    \t\n    <span class=\"member_signature\">Keep Aggressive!连续上班一个月！！</span>"}]} ;
            data.group = {"我的好友群":[{"attr":1,"ctryid":1,"en":"HTML5taolunqun","fsten":"H","fstpy":"H","hot":false,"id":158,"jp":"","name":"HTML5taolunqun","py":"Changchun","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"},{"attr":1,"ctryid":1,"en":"Xiechengwuxian","fsten":"X","fstpy":"X","hot":false,"id":206,"jp":"","name":"携程无线","py":"Xiechengwuxian","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"},{"attr":1,"ctryid":1,"en":"AngularJs","fsten":"A","fstpy":"A","hot":true,"id":28,"jp":"","name":"AngularJs","py":"AngularJs","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"},{"attr":1,"ctryid":1,"en":"Seajs","fsten":"S","fstpy":"S","hot":true,"id":4,"jp":"","name":"Seajs","py":"Seajs","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"}],"同学群":[{"attr":1,"ctryid":1,"en":"Naxienian","fsten":"N","fstpy":"N","hot":false,"id":21268,"jp":"","name":"那些年","py":"Naxienian","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"},{"attr":1,"ctryid":1,"en":"Gaosan21ban","fsten":"G","fstpy":"G","hot":true,"id":6,"jp":"","name":"高三21班","py":"Gaosan21ban","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"}],"旅游群":[{"attr":1,"ctryid":1,"en":"XiechengLvyouwang","fsten":"X","fstpy":"X","hot":false,"id":33,"jp":"","name":"携程旅游网","py":"XiechengLvyouwang","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"},{"attr":1,"ctryid":1,"en":"Zhongguoguolv","fsten":"Z","fstpy":"Z","hot":false,"id":38,"jp":"","name":"中国国旅","py":"Zhongguoguolv","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"},{"attr":1,"ctryid":1,"en":"Lvyou","fsten":"L","fstpy":"L","hot":true,"id":32,"jp":"","name":"驴友","py":"Lvyou","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"}],"游戏群":[{"attr":1,"ctryid":1,"en":"Dotazu","fsten":"D","fstpy":"D","hot":false,"id":5,"jp":"","name":"Dota组","py":"Dotazu","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"},{"attr":1,"ctryid":1,"en":"Moshoushijie","fsten":"M","fstpy":"M","hot":false,"id":42,"jp":"","name":"魔兽世界","py":"Moshoushijie","img":"http://face0.web.qq.com/cgi/svr/face/getface?cache=1&type=4&f=40&uin=4224737240&t=1395210011&vfwebqq=c0471530c123f38251a37899173f575ad4e05d1411990c5f5cfcd0f0a8aa38b51a322a6f4ae02a33"}]};

            if (!qqlist) {

                var secKey = null;
                var friends = [];

                for (var k in data.friends) {
                    var obj = {};
                    obj.name = k;
                    obj.data = data.friends[k];
                    friends.push(obj);
                }

                console.log(friends)
                var group = [];
                for (var k in data.group) {
                    var obj = {};
                    obj.name = k;
                    obj.data = data.group[k];
                    group.push(obj);
                }

                qqlist = new cUIBusinessGroupList({
                    rootBox: this.$('#wrapper'),
                    filter: 'en,py,name,fsten',
                    selectedKey: secKey,
                    itemTemplate: '<img style="float: left; margin-right: 10px;" src="' + '<%=itemData.img%>' + '"/><p style="margin-top: 0px;"><%=itemData.name%><br><span style="color: #aaa;"><%=itemData.status%></span></p>',
                    groupObj: [
                        { name: '好友列表', data: friends },
                        { name: '群列表', data: group }
                    ],
                    click: function (data) {
                        storeinstance.set(data)
                        that.forward('selectqq');
                    }

                });

            }
        },

        onShow: function () {

            $('cui-city-n').find('li').css('line-height', '100%');

        },

        onHide: function () {

        }
    });
    return View;
});