define(['UIDemoView', 'UIGroupList'], function (UIDemoView, UIGroupList) {

  var View = UIDemoView.extend({
    events: {
    },
    onCreate: function () {
    },
    onShow: function () {

      console.log(this.$('.cui-citys-bd'));
      this.header.set({
        title: 'UI',
        back: true,
        right: [
          {
            tagname: 'login', value: '登录', callback: function () {
             alert(1)
        }}
        ],
        events: {
          returnHandler: function () {
            Lizard.goBack();
          }
        }
      });

      this.header.show();

      this.initGoupList();
    },
    onHide: function () {

    },
    initGoupList: function () {
      if (this.groupList) return;
      var scope = this;

      //header的使用
      var groupList1 = [
        { 'uiname': 'header', 'name': '基本用法·兼容老接口' },
        { 'uiname': 'new_header', 'name': '基本用法·带子标题（推荐）-subtitle' },
        { 'uiname': 'header_sidebar', 'name': 'header配合侧边栏-slidebar' },
        { 'uiname': 'header_select', 'name': '头部城市列表选择-select' },
        { 'uiname': 'header_tabs', 'name': '头部筛选功能-tabs' },
        { 'uiname': 'header_share', 'name': '头部分享功能-调用native接口-share' }
      ];

      //提示类
      var groupList2 = [
        { 'uiname': 'alert', 'name': '警告框的使用' },
        { 'uiname': 'toast', 'name': 'toast提示框的使用' },
        { 'uiname': 'loading', 'name': 'loading框' },
        { 'uiname': 'bubble_layer', 'name': '气泡组件' },
        { 'uiname': 'layer_list', 'name': '底部弹出的组件' },
        { 'uiname': 'user_defined_layer', 'name': '用户自定义弹出层-弹出层概述，重要' }

      ];

      //常用组件
      var groupList3 = [
        { 'uiname': 'calendar', 'name': '日历的各种用法' },
        { 'uiname': 'identity', 'name': '身份证键盘' },
        { 'uiname': 'image_slider', 'name': '图片轮播' },
        { 'uiname': 'num', 'name': '数字组件' },
        { 'uiname': 'select', 'name': 'select组件' },
        { 'uiname': 'switch1', 'name': 'switch组件' },
        { 'uiname': 'tab', 'name': 'tab组件' }
      ];

      var groupList3 = [
        { 'uiname': 'calendar', 'name': '日历的各种用法' },
        { 'uiname': 'identity', 'name': '身份证键盘' },
        { 'uiname': 'num', 'name': '数字组件' },
        { 'uiname': 'switch1', 'name': 'switch组件' },
        { 'uiname': 'tab', 'name': 'tab组件' }
      ];

      var groupList4 = [
        { 'uiname': 'slider', 'name': '横向滚动slider' },
        { 'uiname': 'image_slider', 'name': '图片轮播组件' },
        { 'uiname': 'scroll_list', 'name': 'radiolist组件，弹出滚动列表' },
        { 'uiname': 'group_select', 'name': 'select组件组合应用-groupSelect' },

        { 'uiname': 'select', 'name': 'select组件' },
        { 'uiname': 'scrolllayer', 'name': '通用竖直滚动' },
        { 'uiname': 'scroll', 'name': 'IScroll区域滚动库' },

      ];

      var uidata = [
        { name: '框架Header的使用', data: groupList1 },
        { name: '框架弹出层提示类组件', data: groupList2 },
        { name: '常用组件', data: groupList3 },
        { name: '滚动类组件/API', data: groupList4 }
      ];
      this.groupList = new UIGroupList({
        datamodel: {
          data: uidata,
          filter: 'uiname,name'
        },
        wrapper: this.$('.cui-citys-bd'),
        onItemClick: function (item, groupIndex, index, e) {
          Lizard.goTo(Lizard.appBaseUrl + 'ui/' + item.uiname);

        }
      });


      this.groupList.show();
    }
  });

  return View;
});