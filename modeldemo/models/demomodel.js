
define(['cModel', 'cUtility', 'cBase','DemoStore'], function (AbstractModel, cUtility, cBase,DemoStore) {
    var DemoModel = DemoModel || {};


    //业务Model,此类作用是重写url指向
    var BusinessModel = new cBase.Class(AbstractModel, {
        __propertys__: function () {

        },
        initialize: function ($super, options) {
        },


        buildurl: function () {
            var baseurl = this.baseurl();
            var tempUrl = this.protocol + '://' + (baseurl.domain) + '/' + (baseurl.path) + (typeof this.url === 'function' ? this.url() : this.url);
            return tempUrl;
        },

        baseurl: function (protocol) {
            var host = location.host;
            var domain = 'm.ctrip.com';
            var path = 'restapi';
            //app环境
            if (cUtility.isInApp()) {
                if (cUtility.isPreProduction() == '1') {   // 定义堡垒环境
                    if (protocol == "https") {
                        domain = 'restful.m.ctrip.com';
                    } else {
                        domain = 'm.ctrip.com';
                    }
                } else if (cUtility.isPreProduction() == '0') {   // 定义测试环境
                    if (protocol == "https") {
                        domain = 'restful.waptest.ctrip.com';
                    } else {
                        domain = 'waptest.ctrip.com';
                    }
                    path = 'restapi2';
                } else {
                    if (protocol == "https") {
                        domain = 'restful.m.ctrip.com';
                    } else {
                        domain = 'm.ctrip.com';
                    }
                }
            } else if (host.match(/^m\.ctrip\.com/i)) {
                //生产环境
                domain = 'm.ctrip.com';
            } else if (host.match(/^(localhost|172\.16|127\.0)/i)) {
                //本地环境
                if (protocol == "https" || location.protocol == "https") {
                    domain = 'restful.waptest.ctrip.com';
                } else {
                    domain = 'waptest.ctrip.com';
                }
                path = 'restapi3';
            } else if (host.match(/^10\.8\.2\.111/i)) {
                //堡垒环境
                domain = '10.8.2.111';
            } else if (host.match(/^waptest\.ctrip|^210\.13\.100\.191/i)) {
                //测试环境
                if (protocol == "https" || location.protocol == "https") {
                    domain = 'restful.waptest.ctrip.com';
                    path = 'restapi2';
                } else {
                    domain = 'waptest.ctrip.com';
                    path = 'restapi2';
                } 
            }else {
                domain = 'm.ctrip.com';
            }
            return {
                'domain': domain,
                'path': path
            }
        }
    });


    //noStoreModel
    DemoModel.noStoreModel = new cBase.Class(BusinessModel, {
        __propertys__: function () {
            //请求Url
            this.url = '/Taxi/MarketingInfo/Query';
            //参数
            this.param = {
                "btype": [{ "cardrvtype": 16 }, { "cardrvtype": 32 }, { "cardrvtype": 1 }, { "cardrvtype": 2 }, { "cardrvtype": 4}],
                "ver": 0
            };
            //参数
            //this.param = ParamStore.getInstance();
            //this.result = resultStore.getInstance();
        },
        initialize: function ($super, options) {
            $super(options);
        }
    });


  //StoreModel实例
 DemoModel.StoreModel = new cBase.Class(BusinessModel, {
    __propertys__: function () {
      //请求Url
      this.url = '/Taxi/MarketingInfo/Query';
      //参数
      this.param = {
        "btype": [{ "cardrvtype": 16 }, { "cardrvtype": 32 }, { "cardrvtype": 1 }, { "cardrvtype": 2 }, { "cardrvtype": 4}],
        "ver": 0
      };
      //结果
      this.result = DemoStore.ModelDemoStore.getInstance();
    },
    initialize: function ($super, options) {
      $super(options);
    }
  });
    return DemoModel;
});
