"use strict"
define(['libs', 'cBasePageView', buildViewTemplatesPath('index.html'), 'cUIBusinessGroupList'], function (libs, BasePageView, html, cUIBusinessGroupList) {
    var viewhtml = '<h1>我是首页</h1><div><button>点击我去list</button></div>';
    var firstCreate = true;

    var View = BasePageView.extend({
        render: function () {
            this.$el.html(html);
        },

        onCreate: function () {
            this.injectHeaderView();

            this.render();
            var list = this.$el.find('#list');


//            for (var i = 0, len = listArr.length; i < len; i++) {
//                list.append($('<li class="li" data-key="' + listArr[i]['uiname'] + '"><a href="javascript:;" >' + listArr[i]['name'] + '</a></li>'));
//            }
        },

        events: {
            'click #list li': function (e) {

                this.forward($(e.currentTarget).attr('data-key'));
            }
        },

        onLoad: function () {
            this.headerview.set({
                title: 'demo列表',
                back: false,
                view: this,
                tel: null
            });
            this.headerview.show();

            this.turning();

            if(firstCreate) {
                //测试链接
                var groupList0 =[
                    {'uiname':'testLink','name':'测试文档'},
                ];
                //常用插件
                var groupList1 = [
                    {'uiname':'inputclear','name':'input清除'},
                    {'uiname':'switch','name':'switch切换'},
                    {'uiname':'num','name':'数字插件'},
                    {'uiname':'tabs','name':'tabs标签插件'},
                    {'uiname':'flip','name':'flip手势工具'},
                    {'uiname':'inputvalidator','name':'input验证'},
                    {'uiname':'inputvalidator_2','name':'input验证_2'},
                    {'uiname':'map','name':'map'},
                    {'uiname':'imageslider','name':'canvas图片轮播'},
                    {'uiname':'lazyload','name':'图片延迟加载'},
                    {'uiname':'test','name':'星星点评'},
                    {'uiname':'bubbleLayer','name':'bubbleLayer气泡提示插件'},
                    {'uiname':'newcalendar','name':'日历'},
                    {'uiname':'myimglazyload','name':'一次性加载50张图片'},
                    {'uiname':'myimglazyload_2','name':'间接加载10张'},
                    {'uiname':'horizontalscroll','name':'横向滚动'},
                    {'uiname':'imageslider_2','name':'图片滚动测试'}
                ];

                //分组列表
                var groupList2 = [
                    {'uiname':'selectcity','name':'城市列表'},
                    {'uiname':'qqlist','name':'qq列表'},
                    {'uiname':'ajaxselect','name':'城市列表ajax'}
                ];

                //带滚动条的弹出层
                var groupList3 = [
                    { 'uiname':'scrollradio','name':'scrollRadio用车时间/时间'},
                    { 'uiname':'scrollradiolist','name':'scrollRadioList插件'},
                    { 'uiname':'tipslayer','name':'tipslayer插件/装载html结构'},
                    { 'uiname':'mask','name':'mask组件/自定义html弹窗'}
                ];

                //提示类
                var groupList4 = [
                    {'uiname':'alert','name':'警告框'},
                    {'uiname':'confirm','name':'确认框'},
                    {'uiname':'toast','name':'toast框'},
                    {'uiname':'loading','name':'loading框'},
                    {'uiname':'warning404','name':'warning404'},
                    {'uiname':'headwarning','name':'带头部警告'}
                ];

                //动态加上id

                var id = 1;
                for(var i=0;i<groupList0.length;i++){
                    groupList0[i]['id'] = id++;
                }
                for(var i=0;i<groupList1.length;i++) {
                    groupList1[i]['id'] = id++;
                }
                for(var i=0;i<groupList2.length;i++) {
                    groupList2[i]['id'] = id++;
                }
                for(var i=0;i<groupList3.length;i++) {
                    groupList3[i]['id'] = id++;
                }
                for(var i=0;i<groupList4.length;i++) {
                    groupList4[i]['id'] = id++;
                }

                var uidata = [
                    { name: '测试文档',data:groupList0},
                    { name: '常用插件', data:groupList1 },
                    { name: '分组列表', data:groupList2 },
                    { name: '带滚动条的弹出层', data:groupList3 },
                    { name: '提示类', data:groupList4 }
                ];

                var modeldata = [
                    { name:'model插件', data: [{id:id++,name:'正在建设中...'}]}
                ];
                var viewdata = [
                    { name:'view插件', data: [{id:id++,name:'正在建设中...'}]}
                ];

                var scope= this;
                var apiList = new cUIBusinessGroupList({
                    rootBox: this.$('#wrapper'),
                    filter: 'py,name,fsten',
                    needFold: true,
                    groupObj: [
                        { name:'UI库',data: uidata },
                        { name:'Model',data: modeldata },  //modeldata
                        { name:'View',data: viewdata }      //viewdata

                    ],
                    click: function(data) {
//                        console.log(data);
                        scope.forward(data.uiname);
                    }
                });
                firstCreate = false;
            }
        },

        onShow: function () {

        },

        onHide: function () {

        }

    });

    return View;

});
