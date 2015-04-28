define([
  'cBasePageView',
  'cCalendar',
  'cHolidayCalendar',
  'cHolidayPriceCalendar',
  buildViewTemplatesPath('newcalendar.html')
], function(BasePageView, Calendar, HolidayCalendar, HolidayPriceCalendar, newCalendarTemplate) {
  function debug(obj) {
    alert(JSON.stringify(obj));
  }
  var calendar1;
  var View = BasePageView.extend({
    events: {
      'click #demo1': function() {
        if (!calendar1) {
          calendar1 = new Calendar({
            appendElement: '.calendar-wrap',
            animateSwitch: false,
            days: 'short',
            monthsNum: 2,
            header: false,
            callback: function(date, dateStyle, target) {

              this.$el.find('.cui_cld_daycrt').removeClass('cui_cld_daycrt');
              target.addClass('cui_cld_daycrt');
              debug(date.toLocaleString());
              debug(dateStyle);
              this.hide();
            },
            onShow: function() {
              console.log('show');
              window.scrollTo(0, 0);
            },
            onHide: function() {
              console.log('hide');
            }
          });
        }
        calendar1.show();
      },
      'click #demo2': function() {
        var calendar = new HolidayCalendar({
          monthsNum: 13,
          header: {
            title: '中国节日插件'
          },
          callback: function(date, dateStyle, target) {
            target.addClass('cui_cld_daycrt');
            debug(dateStyle);
            this.hide();
          },
          onShow: function() {
            console.log('show');
          },
          onHide: function() {
            console.log('hide');
            //日历销毁
            this.remove();
          }
        });
        calendar.show();
      },
      'click #demo3': function() {
        var calender = new HolidayCalendar({
          monthsNum: 14,
          animateSwitch: 'left',
          solarHoliday: {
            '1225': '圣诞节',
            '1001': '国庆节',
            '0909': '中秋节',
            '0701': '回归纪念日',
            '0602': '端午节',
            '0506': '佛诞',
            '0501': '劳动节',
            '0421': '复活节',
            '0419': '受难节翌日',
            '0418': '受难节',
            '0405': '清明节',
            '0203': '年初四',
            '0201': '年初二',
            '0131': '年初一',
            '0101': '元旦' 
          },
          lunarHoliday: false,
          callback: function(date, dateStyle, target) {
            this.hide();
          },
          onShow: function() {
          },
          onHide: function() {
            this.remove();
          }
        });
        calender.show();
      },
      'click #demo4': function() {
        var calender = new HolidayPriceCalendar({
          monthsNum: 11,
          voidInvalid: false, //没有价格的日期是否有效可点,false可点
          priceDate: [
            { date: new Date('2014/4/2 0:00:00'), price: 25 },
            { date: new Date('2014/4/3 0:00:00'), price: 45 },
            { date: new Date('2014/5/1 0:00:00'), price: 0 },
            { date: new Date('2014/5/2 0:00:00'), price: 0 },
            { date: new Date('2014/5/3 0:00:00'), price: 35 },
            { date: new Date('2014/5/4 0:00:00'), price: 36 },
            { date: new Date('2014/5/5 0:00:00'), price: 37 },
            { date: new Date('2014/5/6 0:00:00'), price: 0 },
            { date: new Date('2014/5/7 0:00:00'), price: 14 },
            { date: new Date('2014/6/1 0:00:00'), price: 30 },
            { date: new Date('2014/6/2 0:00:00'), price: 30 },
          ],
          onShow: function() {
            //找出最低价
            this.findMinPrice();
          },
          onHide: function() {
          },
          callback: function(date, dateStyle, target) {
            this.$el.find('.cui_cld_valid').removeClass('cui_cld_daycrt');
            target.addClass('cui_cld_daycrt');
            this.hide();
          }
        });
        calender.show();
      },
      'click #demo5': function() {
        var calender = new HolidayPriceCalendar({
          title: '价格日历',
          startPriceTime: new Date(2014, 4, 2),
          monthsNum: 11,
          priceDate: [
            { date: new Date('2014/4/30 0:00:00'), price: 25 },
            { date: new Date('2014/5/1 0:00:00'), price: 35 },
            { date: new Date('2014/5/2 0:00:00'), price: 30 },
            { date: new Date('2014/5/3 0:00:00'), price: 35 },
            { date: new Date('2014/5/4 0:00:00'), price: 36 },
            { date: new Date('2014/5/5 0:00:00'), price: 37 },
            { date: new Date('2014/5/6 0:00:00'), price: 30 },
            { date: new Date('2014/6/1 0:00:00'), price: 30 },
            { date: new Date('2014/6/2 0:00:00'), price: 30 }
          ],
          onShow: function() {
            //找出最低价
            this.findMinPrice();
          },
          onHide: function() {
            this.remove();
          },
          callback: function(date, dateStyle, target) {
            this.$el.find('.cui_cld_valid').removeClass('cui_cld_daycrt');
            target.addClass('cui_cld_daycrt');
            this.hide();
          }
        });
        calender.show();
      }
    },
    onCreate: function() {
      this.injectHeaderView();
      this.$el.html(newCalendarTemplate);
    },
    onLoad: function() {
      var self = this;
      console.log(this.hide);
      this.headerview.set({
          title: '新日历组件',
          back: true,
          view: this,
          events: {
              returnHandler: function () {
                  self.back('index');
              }
          }
      });
      this.headerview.show();
      this.turning();
    },
    onShow: function() {

    },
    onHide: function() {

    }
  });
  return View; 
});