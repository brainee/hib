"use strict"
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('calendarprice.html'), 'cWidgetFactory', 'cWidgetCalendar', 'cWidgetCalendarPrice'], function (libs, c, BasePageView, html, WidgetFactory) {

  var Calendar_Price = WidgetFactory.create('Calendar.Price');
  var calendar_price = null;

  var View = BasePageView.extend({
    render: function () {
      this.injectHeaderView();
      this.$el.html(html);
      this.name = this.$el.find('#name');
      this.inputs = this.$el.find('.formValidate');
    },
    events: {

      'click #demo2': function () {

      }
    },
    homeUrl: (function () {
      return '/html5';
    })(),
    onCreate: function () {
      this.render();
    },
    ajaxRequest: function (onloadCall) {

    },
    onLoad: function () {
      var self = this;
      this.headerview.set({
        title: '价格日历',
       
        back: true,
        view: self,
        events: {
          returnHandler: function () {
            self.back('calendar');
            if (calendar_price) calendar_price.hide();
          }
        }
      });

      if (!calendar_price) {
        var num = 10; //要显示的可选日期天数
        var months = 1; //日历控件默认显示一个月
        var prices = [];
        var tody = c.utility.Date.format(new Date(), 'Y/m/d');
        var nextDay = null;

        for (var i = 0; i < num; i++) {
          nextDay = this.getOverData(tody, i);
          prices.push({
            date: nextDay + ' 0:00:00',
            inventory: 9999,
            price: 35
          });
        }
        for (var validDates = [], i = 0, s = prices.length; s > i; i++) {
          validDates[i] = {
            date: c.base.Date.parse(prices[i].date).valueOf(),
            price: prices[i].price
          };
        }
        var endDate = prices[prices.length - 1]['date'];
        // 判断是否跨月显示日历控件
        if (Number(endDate.split('/')[1]) !== Number(tody.split('/')[1])) {
          months = 2;
        }
        calendar_price = new Calendar_Price({
          title: '测试',
           returnCallback: function () {
          alert();
        },
          date: {
            start: {
              title: function (date, sformat) { return sformat(date); }
            }
          },
          validEndDate: c.base.Date.parse(endDate).valueOf(),
          curDate: 'start',
          Months: months,
          validDates: validDates,
          showChineseHoliday: true,
          showHoliday: true,
          callback: function (date, price, timename, any) {
            //                        $('#demo2').next('span').html('已选择日期：' + c.utility.Date.format(date, 'Y/m/d') + ",票价：￥" + price);
            self.back('calendar?date=' + c.utility.Date.format(date, "Y/m/d") + '&price=' + price);
            if (calendar_price) calendar_price.hide();
          }
        });
      }

      calendar_price.show();

      this.headerview.show();
      this.turning();
    },
    onShow: function () {
    },
    onHide: function () {
    },
    getOverData: function (overTime, num) {
      var mydata;
      var days = 28;
      var flag = false;
      var MonthThirtyOne = [1, 3, 5, 7, 8, 10, 12];
      var MonthThirty = [4, 6, 9, 11];
      if (overTime != null) {
        var dataArr = overTime.split("/");
        var year = +dataArr[0];
        var month = +dataArr[1];
        var day = +dataArr[2];

        for (var i = 0; i < MonthThirtyOne.length; i++) {
          if (month == MonthThirtyOne[i]) {
            days = 31;
            flag = true;
            break;
          }
        }
        if (!flag) {
          for (var i = 0; i < MonthThirty.length; i++) {
            if (month == MonthThirty[i]) {
              days = 30;
              break;
            }
          }
        }
        if (days == 28 && ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)) {
          days = 29;
        }
        mydata = this.calcData(year, month, day, days, num);
        return mydata;
      }
    },

    calcData: function (year, month, day, days, num) {
      if (day < (days - num)) {
        return year + "/" + month + "/" + (day + num + 1);
      } else {
        day = day + num + 1 - days;
        month = month + 1;
        if (month > 12) {
          month = month - 12;
          year = year + 1;
        }
        return year + "/" + month + "/" + day;
      }
    }
  });

  return View;
});