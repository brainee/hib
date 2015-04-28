/**
 * Created by jp_wang on 2014/11/20.
 */
define(['UIDemoView', 'UICalendar', 'cCoreInherit', 'cStore'], function (UIDemoView, UICalendar, Inherit, AbstractStore) {

  var DepartDate = Inherit.Class(AbstractStore, {
    __propertys__: function () {
      this.key = 'demo21_UI_depart_date';
      this.lifeTime = '1D';
    },
    initialize: function ($super, options) {
      $super(options);
    }
  });

  var depateDate = DepartDate.getInstance();

  var View = UIDemoView.extend({
    events: {
      'click .js_demo03': 'demo03',
      'click .js_demo03_value': 'demo03',
      'click .js_demo01_btn': 'demo01_action'
    },

demo01_action: function () {
  if (!this.calendar01) return;
  this.calendar01.handleDay(this.$('.js_demo01_day').val(), function (el) {
    this.$('li').removeClass('selected-departdate');
    el.addClass('selected-departdate');
  });
},

    onCreate: function () {
    },
    onShow: function () {
      this.header.set({
        view: this,
        title: '各种日历情况的的使用',
        back: true
      });

      var d = new Date();

      this.$('.js_demo01_day').val(d.getFullYear() + '-' + d.getMonth() + '-'+ d.getDate());

      this.demo01();
      this.demo02();

    },

    //机酒价格日历
    demo01: function () {
      var scope = this;
      if (!this.calendar01) {
        this.calendar01 = new UICalendar({
          datamodel: {
            displayMonthNum: 2
          },
          wrapper: this.$el.find('.js_demo01_wrapper'),
          onItemClick: function (date, el, e) {

          }
        });
      }
      this.calendar01.show();
    },

    demo02: function () {
      var data = { "ResponseStatus": { "Timestamp": "\/Date(1417074614843+0800)\/", "Ack": "Success", "Errors": [], "Build": "", "Version": "1.0", "Extension": [{ "Id": "auth" }, { "Id": "CLOGGING_TRACE_ID", "Value": "2674767108920677994" }] }, "DailyPrices": [{ "Date": "\/Date(1417190400000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417276800000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417363200000-0000)\/", "MinPrice": { "Current": 4155, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417449600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417536000000-0000)\/", "MinPrice": { "Current": 0, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417622400000-0000)\/", "MinPrice": { "Current": 4485, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417708800000-0000)\/", "MinPrice": { "Current": 7175, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417795200000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417881600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417968000000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418054400000-0000)\/", "MinPrice": { "Current": 4145, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418140800000-0000)\/", "MinPrice": { "Current": 4835, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418227200000-0000)\/", "MinPrice": { "Current": 3735, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418313600000-0000)\/", "MinPrice": { "Current": 3735, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418400000000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418486400000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418572800000-0000)\/", "MinPrice": { "Current": 3875, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418659200000-0000)\/", "MinPrice": { "Current": 3875, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418745600000-0000)\/", "MinPrice": { "Current": 3605, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418832000000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418918400000-0000)\/", "MinPrice": { "Current": 3735, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419004800000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419091200000-0000)\/", "MinPrice": { "Current": 3605, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419177600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419264000000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419350400000-0000)\/", "MinPrice": { "Current": 4075, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419436800000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419523200000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419609600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419696000000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419782400000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419868800000-0000)\/", "MinPrice": { "Current": 3875, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419955200000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420041600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420128000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420214400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420300800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420387200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420473600000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420560000000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420646400000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420732800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420819200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420905600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420992000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421078400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421164800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421251200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421337600000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421424000000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421510400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421596800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421683200000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421769600000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421856000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421942400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422028800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422115200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422201600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422288000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422374400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422460800000-0000)\/", "MinPrice": { "Current": 4405, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422547200000-0000)\/", "MinPrice": { "Current": 4405, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422633600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }] };

      //获取所有的价格
      this.calendr_price02 = data.DailyPrices;

      this.loadCalendar02(2);

      setTimeout($.proxy(function () {
        //这里有个缺陷，不能再次传入数据，再次传入数据的话需要对源数据做处理
        //所以这里搞一个小技巧，将数据引用做传递
        //注意这里的数据源引用，这个很关键
        this.calendr_price02 = { "ResponseStatus": { "Timestamp": "\/Date(1417154614286+0800)\/", "Ack": "Success", "Errors": [], "Build": "", "Version": "1.0", "Extension": [{ "Id": "auth" }, { "Id": "CLOGGING_TRACE_ID", "Value": "6251252004072888108" }] }, "DailyPrices": [{ "Date": "\/Date(1417449600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417536000000-0000)\/", "MinPrice": { "Current": 0, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417622400000-0000)\/", "MinPrice": { "Current": 4485, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417708800000-0000)\/", "MinPrice": { "Current": 7175, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417795200000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417881600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1417968000000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418054400000-0000)\/", "MinPrice": { "Current": 4145, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418140800000-0000)\/", "MinPrice": { "Current": 4835, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418227200000-0000)\/", "MinPrice": { "Current": 3735, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418313600000-0000)\/", "MinPrice": { "Current": 3735, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418400000000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418486400000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418572800000-0000)\/", "MinPrice": { "Current": 3875, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418659200000-0000)\/", "MinPrice": { "Current": 3875, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418745600000-0000)\/", "MinPrice": { "Current": 3605, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418832000000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1418918400000-0000)\/", "MinPrice": { "Current": 3735, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419004800000-0000)\/", "MinPrice": { "Current": 3465, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419091200000-0000)\/", "MinPrice": { "Current": 3605, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419177600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419264000000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419350400000-0000)\/", "MinPrice": { "Current": 4075, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419436800000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419523200000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419609600000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419696000000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419782400000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419868800000-0000)\/", "MinPrice": { "Current": 3875, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1419955200000-0000)\/", "MinPrice": { "Current": 3325, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420041600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420128000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420214400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420300800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420387200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420473600000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420560000000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420646400000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420732800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420819200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420905600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1420992000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421078400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421164800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421251200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421337600000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421424000000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421510400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421596800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421683200000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421769600000-0000)\/", "MinPrice": { "Current": 4400, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421856000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1421942400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422028800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422115200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422201600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422288000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422374400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422460800000-0000)\/", "MinPrice": { "Current": 4405, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422547200000-0000)\/", "MinPrice": { "Current": 4405, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422633600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422720000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422806400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422892800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1422979200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423065600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423152000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423238400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423324800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423411200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423497600000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423584000000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423670400000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423756800000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423843200000-0000)\/", "MinPrice": { "Current": 4395, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1423929600000-0000)\/", "MinPrice": { "Current": 4403, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1424016000000-0000)\/", "MinPrice": { "Current": 4405, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1424102400000-0000)\/", "MinPrice": { "Current": 5828, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1424188800000-0000)\/", "MinPrice": { "Current": 5828, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1424275200000-0000)\/", "MinPrice": { "Current": 0, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1424361600000-0000)\/", "MinPrice": { "Current": 0, "Original": 0, "Save": 0, "Rate": 0 } }, { "Date": "\/Date(1424448000000-0000)\/", "MinPrice": { "Current": 0, "Original": 0, "Save": 0, "Rate": 0 } }] }.DailyPrices;

        //加两个月显示
        //this.addCalendar02(2);
        this.calendar02.datamodel.displayMonthNum = this.calendar02.datamodel.displayMonthNum + 2;
        this.calendar02.refresh();

        this.$('.js_demo02_loading').hide();
      }, this), 10000);

    },

    addCalendar02: function (displayMonth) {
      if (!this.calendar02 || this.calendar02.datamodel.displayMonthNum > 2) return;

      this.calendar02.addDisplayMonth(displayMonth);

    },

    loadCalendar02: function (displayMonth) {
      var scope = this;

      if (!this.calendar02) {
        this.calendar02 = new UICalendar({
          datamodel: {
            displayMonthNum: displayMonth
          },
          wrapper: this.$el.find('.js_demo02_wrapper'),
          //定制化每一个日期项目的显示
          dayItemAction: function (dayObj, year, month, day, dateObj, difftime) {
            //这里与价格日历做一个映射即可
            var _time = dateObj.getTime();
            //var _mappingTime = '/Date(' + _time + '+0800)/';

            //找出映射项目
            var _dayPrice = _.find(scope.calendr_price02, function (item) {
              return item['Date'].indexOf(_time) != -1;
            });

            if (_dayPrice) {
              dayObj.dayprice = _dayPrice.MinPrice;
            }

            var dateStr = '';

            //如果有阳历节日，则优先
            dateStr = dayObj.lunarHoliday || dayObj.lunarHoliday || dayObj.day1 || dayObj.day;
            if (dayObj.dayprice) {
              if (dayObj.dayprice.Current > 0) {
                dateStr += '<i>￥' + dayObj.dayprice.Current + '</i>';
              } else if (dayObj.dayprice.Current == 0) {
                dateStr += '<i>实时计价</i>';
              }
            }

            return '<em>' + dateStr + '</em>';

          },
          onItemClick: function (date, el, e) {

          }
        });
      }

      this.calendar02.show();

    },

    demo03: function () {
      var scope = this;
      if (!scope.calendar03) {
        scope.calendar03 = new UICalendar({
          datamodel: {
            selectDate: depateDate.get() && (new Date(depateDate.get()))
          },

          //这段代码非常关键，属于本view的calendar实例，其包裹层却指向特殊弹出层view
          //wrapper: this.$el,
          onItemClick: function (date, el, e) {
            scope.$('.js_demo03_value').html(date.toLocaleDateString());
            depateDate.set(date);
            this.datamodel.selectDate = date;
            Lizard.hideHisCtnrView();
          },
        });
      } else {
        scope.calendar03.refresh();
      }
      

      Lizard.showHisCtnrView(function () {
        if (!scope.calendar03) return;

        this.header.set({
          title: '选择出发日期',
          back: true
        });

        scope.calendar03.wrapper = this.$el;
        
        scope.calendar03.show();
      }, function () {

      }, {
        isAnim: true
      });

     

    },

    onHide: function () {

    }
  });

  return View;
});