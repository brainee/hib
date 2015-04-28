// ------------------------------
// 用车首页
// ------------------------------
define(['libs', 'c',  'cBasePageView', buildViewTemplatesPath('index.html'), 'cUtility', 'CommonStore', 'cWidgetFactory', 'cGeoService', 'cWidgetGuider'], function (libs, c, BasePageView, viewhtml, cUtility, CommonStore, WidgetFactory, cGeoService) {
    "use strict";
    var cBase = c.base;
    var GeoLocation = cGeoService.GeoLocation;
    var Guider = WidgetFactory.create('Guider');
    var cObject = cUtility.Object;

    var View = BasePageView.extend({
        pageid: '214244',
        hasAd: true,
        render: function () {
            this.$el.html(viewhtml);
        },
        events: {
            'click .list_st_border li': 'goTo',
            'click #adview': 'openAd'
        },

        goTo: function (e) {
            var viewId = $(e.currentTarget).data('hash');
            this.forward(viewId);
        },

        onCreate: function () {
            this.injectHeaderView();
            this.render();
        },

        onLoad: function () {
            this.showView();
            this.turning();
        },

        showView: function () {
            var self = this;
            this.headerview.set({
                title: '用车',
                view: this,
                openAds: true,
                back: true,
                home: true,
                tel: {
                    number: 4000086666
                },
                events: {
                    returnHandler: function () {
                        Guider.apply({
                            hybridCallback: function () {
                                Guider.backToLastPage();
                            },
                            callback: function () {
                                self.jump('/html5/');
                            }
                        });
                        return true;
                    },
                    homeHandler: function () {
                        Guider.apply({
                            hybridCallback: function () {
                                Guider.home();
                            },
                            callback: function () {
                                self.jump('/html5/');
                            }
                        });
                        return true;
                    }
                }
            });

            Guider.print({ log: '#index -- clear position' });
            GeoLocation.ClearPosition();

            setTimeout(function () {
                Guider.print({ log: '#index -- subscribe position' });
                GeoLocation.Subscribe('taxi/index', {
                    onStart: function () {
                        //console.log('start');
                    },
                    onComplete: function () {
                        //console.log('complete');
                    },
                    onError: function () {
                        //console.log('error');
                    }
                }, self);
            }, 1000);


            this.headerview.show();

            this.turning();
        },

        onShow: function () { },
        onHide: function () {
            GeoLocation.UnSubscribe('taxi/index');
        }
    });
    return View;
});
