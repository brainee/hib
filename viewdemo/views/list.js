"use strict"
define(['libs', 'cListAdapter', 'cCommonPageFactory', buildViewTemplatesPath('list.html'), 'cCommonListPage'], function (libs, ListAdapter, CommonPageFactory, html) {

    //listView实例 用于继承
    var CommonListPageView = CommonPageFactory.create('CommonListPage');

    //集成CommonListPageView，用以列表页的展示
    var View = CommonListPageView.extend({

        /**
        * 第一次载入此view时执行
        */
        onCreate: function () {
            this.injectHeaderView();
            //载入外部html模板
            this.$el.html(html);
        },

        onLoad: function () {
            this.showHead();

            this.showList();
            //...
            this.turning();
        },

        //显示头部
        showHead: function () {
            // this.headerview就是View含有的HeaderView的全局对象
            this.headerview.set({
                title: '列表页',
                view: this,
                back: true,
                home: true,
                tel: {
                    number: 4000086666
                },
                events: {
                    returnHandler: function () {
                        this.back();
                    },
                    homeHandler: function () {
                    }
                }
            });
            // 显示headerview
            this.headerview.show();
        },

        //显示列表项
        showList: function () {
            var list = [
                { "pname": "Item1" },
                { "pname": "Item2"}];

            //listview的数据源
            this.listadapter = new ListAdapter({ data: list });
            //listView模板
            var template = '<li><%= pname %></li>';
            //保存当前this执行
            var self = this;
            //listview的配置
            var showdata = {
                container: '.cs_carmodels',             //容器
                listadapter: this.listadapter,          //数据源
                itemView: template,                     //模板
                bindItemViewEvent: function ($el) {		//列表单项点击事件处理
                    $el.on('click', function (e) {
                        alert('点击的是：' + $(e.target).html());
                    });
                },
                //可以在模板中使用类
                //origin: { cBase: c.base },
                onUpdatePrepared: function () { //加载失败的提示
                    this.noResultText = '没有数据';
                },
                onUpdateFinished: function () {        //渲染完成动作
                    self.hideLoading();
                }
            }

            // 注入ListView
            this.injectListView(showdata);
            //显示
            this.listview.show();

        },
        onShow: function () {

        },

        onHide: function () {

        }
    });

    return View;
});