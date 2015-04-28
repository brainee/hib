/**
 * @author wliao廖伟 <wliao@ctrip.com>
 * @requires HolidayCalendar
 * @class HolidayPriceCalendar
 * @description 中国节日价格日历,参数会继承于中国节日插件
 * @example
  var calender = new HolidayPriceCalendar({
    rootElement: '.calendar-wrap',
    monthsNum: 5,
    animatSwitch: 'top',
    startPriceTime: null,
    priceDate: [
      { date: new Date('2014/5/1 0:00:00'), price: 25 },
      { date: new Date('2014/5/2 0:00:00'), price: 30 },
      { date: new Date('2014/5/3 0:00:00'), price: 35 },
      { date: new Date('2014/5/4 0:00:00'), price: 36 },
      { date: new Date('2014/5/5 0:00:00'), price: 37 },
      { date: new Date('2014/6/1 0:00:00'), price: 30 },
      { date: new Date('2014/6/2 0:00:00'), price: 30 },
    ],
    callback: function(date) {
      
    },
    onShow: function() {
      this.findMinPrice();
    }
  });
  calender.show();
 */
define([
  'cHolidayCalendar'
], function(HolidayCalendar) { 'use strict';
  //节日价格日历默认参数,扩展于节日参数
  var defaults = _.defaults({
    unit: '¥',                      //价格单位
    lowestCls: 'price_lowest',      //当月最低价格类
    monthTemplate: 
      '<section class="cui_cldunit">' +
        '<h1 class="cui_cldmonth"><%= monthFormate %></h1>' + 
        '<ul class="cui_cld_daybox">' +
          '<% _.each(month, function(day) { %>' +
          '<li <% if (day.price) { %> data-price="<%= day.price %>" <% } %> data-date="<%= day.format %>" class="<% if (day.invalid) { print("cui_cld_invalid cui_cld_daypass"); } else { print("cui_cld_valid"); } if(day.desc) { print(" cui_cld_day_havetxt"); } if (day.cls) { print(" " + day.cls); } %>">' +
            '<em><%= day.value %></em>' +
            '<% if (day.desc) { %>' +
            '<i><%= day.desc %></i>' +
            '<% } %>' +
          '<% }); %>' +
        '</ul>' +
      '</section>',
    priceDate: [],                 //价格日期
    startPriceTime: false          //价格开始时间
  }, HolidayCalendar.defaults);

  var HolidayPriceCalendar = HolidayCalendar.extend({
    initialize: function(options) {
      this.options = $.extend(true, {}, defaults, options);
    },
    generateMonthModel: function(year, month) {
      var days = HolidayCalendar.getDaysInMonth(year, month);
      var monthModel = [];
      var priceDate = _.filter(this.options.priceDate, function(item) {
        return item.date.getMonth() === month;
      });
      var firstPriceDay = 0;
      var endPriceDay = 0;
      var echoEmptyPrice = function(day) {
        temporaryTime = new Date(year, month, day);
        temporaryDay = { invalid: true, value: i };
        _.extend(temporaryDay, this.getDateDesc(temporaryTime));
        monthModel.push(temporaryDay);
      };
      var temporaryTime, temporaryDay, temporaryDayDesc;

      if (priceDate.length) {
        firstPriceDay = priceDate[0].date.getDate();
        endPriceDay = priceDate[priceDate.length - 1].date.getDate();
      }
      //有价格的前面几天
      for (var i = 1; i < firstPriceDay; i++) {
       echoEmptyPrice.call(this, i);
      }
      //价格日期
      _.each(priceDate, _.bind(function(item) {
        temporaryTime = item.date;
        temporaryDay = {
          invalid: !this.isPriceValidTime(temporaryTime),
          desc: this.options.unit + item.price,
          price: item.price,
          format: HolidayCalendar.dateFormat(temporaryTime, 'Y-m-d')
        };
        temporaryDayDesc = this.getDateDesc(temporaryTime);
        temporaryDay.value = temporaryDayDesc.desc || temporaryTime.getDate();
        temporaryDay.cls = temporaryDayDesc.cls;
        monthModel.push(temporaryDay);
      }, this));

      //后几天
      for (i = endPriceDay + 1; i <= days; i++) {
        echoEmptyPrice.call(this, i);
      }

      return monthModel;
    },
    isPriceValidTime: function(date) {
      var startPriceTime = this.options.startPriceTime;
      if (startPriceTime) {
        return date.getTime() - startPriceTime.getTime() >= 0;
      } else {
        return true;
      }
    },
    findMinPrice: function() {
      var months = this.$el.find('.cui_cld_daybox');
      var lowestCls = this.options.lowestCls;

      months.each(function() {
        var days = $(this).find('[data-price]');
        var prices = [];
        var min;
        days.each(function() {
          prices.push(parseInt(this.getAttribute('data-price'), 10));
        });
        min = Math.min.apply(null, prices);
        days.each(function() {
          var item = $(this);
          var price = parseInt(item.attr('data-price'), 10);
          if (price === min) {
            item.addClass(lowestCls);
          }
        });
      });
    }   
  });

  return HolidayPriceCalendar;
});