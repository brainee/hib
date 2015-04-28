"use strict"
define(['libs', 'c', 'cBasePageView', buildViewTemplatesPath('calendar.html'), 'cWidgetFactory', 'cWidgetCalendar', 'cWidgetCalendarPrice'], function (libs, c, BasePageView, html, WidgetFactory) {

    var Calendar = WidgetFactory.create('Calendar');
    var Calendar_Price = WidgetFactory.create('Calendar.Price');
    var calendar = null;
    var calendar_price = null;

    var View = BasePageView.extend({
        render: function () {
            this.injectHeaderView();
            this.$el.html(html);
            this.name = this.$el.find('#name');
            this.inputs = this.$el.find('.formValidate');
        },
        events: {
            'click #demo1': function () {
                if (!calendar) {
                    calendar = new Calendar({
                        date: {
                            departdate: {
                                headtitle: '选择日期',
                                title: function (date, sformat) {
                                },
                                value: new Date().getDay()
                            }
                            },
                            animatSwitch: true,

                        title: '到达日期选择',
                        callback: function (date, datename, dates, d, end) {
                            $('#demo1').next('span').html('已选择日期：' + c.utility.Date.format(date, 'Y/m/d'));
                            this._hide();
                        },
                        Months: 6,
                        onShow: $.proxy(function () {
                            this.headerview.updateHeader('title', '选择日期');
                        }, this),
                        onHide: $.proxy(function () {
                        }, this)
                    });
                }

                calendar.show();
            },

            'click #demo2': function () {
                this.forward('calendarprice');
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
                title: '日历组件',
                back: true,
                view: self,
                events: {
                    returnHandler: function () {
                        self.back('index');
                        if (calendar_price) calendar_price.hide();
                        if (calendar) calendar.hide();
                    }
                }
            });
            var geturl = null;
            if(geturl=self.request.query) {
                $('#demo2').next('span').html('已选择日期：' + c.utility.date + ",票价：￥" + geturl.price);
            }

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