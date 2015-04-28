/**********************************
 * @author:       cmli@Ctrip.com
 * @description:  组件Guider
 * @see: http://git.dev.sh.ctripcorp.com/cmli/ctrip-h5-document/blob/master/widget/t.widget.guider.md
 *
 */
define(['cUtilityHybrid', 'cWidgetFactory', 'cHybridFacade'], function (Util, WidgetFactory, Facade) {
    "use strict";

    var WIDGET_NAME = 'Guider';

    var HybridGuider = {
        jump: function (options) {
            var model = {
                refresh: function () {
                    Facade.request({ name: Facade.METHOD_OPEN_URL, targetMode: 0, title: options.title });
                },
                app: function () {
                    if (options && options.module) {
                        var openUrl = Facade.getOpenUrl(options);
                        Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: openUrl, targetMode: 1, title: options.title });
                    } else if (options && options.url) {
                        Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 1, title: options.title });
                    }
                },
                h5: function () {
                    if (options && options.url) {
                        Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 2, title: options.title });
                    }
                },
                browser: function () {
                    if (options && options.url) {
                        Facade.request({ name: Facade.METHOD_OPEN_URL, openUrl: options.url, targetMode: 3, title: options.title });
                    }
                }
            };

            if (typeof model[options.targetModel] === 'function') {
                model[options.targetModel]();
            }
        },

        apply: function (options) {
            options.hybridCallback();
        },

        call: function (options) {
            return false;
        },

        init: function (options) {
            if (options && window.parseFloat(options.version) < 5.2) {
                Facade.request({ name: Facade.METHOD_ENTRY, callback: options.callback });
            } else {
                Facade.request({ name: Facade.METHOD_INIT, callback: options.callback });
            }
        },

        log: function (options) {
            Facade.request({ name: Facade.METHOD_LOG_EVENT, event_name: options.name });
        },

        print: function (options) {
          Facade.request({ name: Facade.METHOD_NATIVE_LOG, log: options.log, result: options.result });
        },

        callService: function () {
            Facade.request({ name: Facade.METHOD_CALL_SERVICE_CENTER });
        },

        backToLastPage: function (options) {
            var param = options ? options.param : '';
            Facade.request({ name: Facade.METHOD_BACK_TO_LAST_PAGE, param: param });
        },

        checkUpdate: function () {
            Facade.request({ name: Facade.METHOD_CHECK_UPDATE });
        },

        recommend: function () {
            Facade.request({ name: Facade.METHOD_RECOMMEND_APP_TO_FRIEND });
        },

        addWeixinFriend: function () {
            Facade.request({ name: Facade.METHOD_ADD_WEIXIN_FRIEND });
        },

        showNewestIntroduction: function () {
            Facade.request({ name: Facade.METHOD_SHOW_NEWEST_INTRODUCTION });
        },

        register: function (options) {
            if (options && options.tagname && options.callback) {
                Facade.register({ tagname: options.tagname, callback: options.callback });
            }
        },

        create: function () {
            Facade.init();
        },

        home: function () {
            Facade.request({ name: Facade.METHOD_BACK_TO_HOME });
        },

        jumpHotel: function (options) {
            Facade.request({ name: Facade.METHOD_GO_TO_HOTEL_DETAIL, hotelId: options.hotelId, hotelName: options.name, cityId: options.cityId, isOverSea: options.isOverSea });
        },

        injectUbt: function () {
            var content = '!function () { var a, b, c, d, e, f, g, i; if (true) { for (a = document.getElementsByTagName("script") || [],' +
        ' b = /_bfa\.min\.js/i, c = 0; c < a.length; c++) if (b.test(a[c].src)) return; if (!(window.$_bf || window.$LAB || window.CtripJsLoader))' +
        ' { d = new Date, e = "?v=" + d.getFullYear() + d.getMonth() + "_" + d.getDate() + ".js", f = document.createElement("script"),' +
        ' f.type = "text/javascript", f.charset = "utf-8", f.async = !0; try { g = "https:" == document.location.protocol } catch (h) ' +
        '{ g = "https:" == document.URL.match(/[^:]+/) + ":" } f.src = g ? "https://s.c-ctrip.com/_bfa.min.js" + e : "http://webresource.c-ctrip.com' +
        '/code/ubt/_bfa.min.js" + e, i = document.getElementsByTagName("script")[0], i.parentNode.insertBefore(f, i) } } } ();';

            var s = $('<script>' + content + '//<' + '\/scrtip>');
            $('body').append(s);
        },

        checkAppInstall: function (options) {
            Facade.request({ name: Facade.METHOD_CHECK_APP_INSTALL, url: options.url, package: options.package, callback: options.callback });
        },

        callPhone: function (options) {
            Facade.request({ name: Facade.METHOD_CALL_PHONE, tel: options.tel });
        },

        cross: function (options) {
            Facade.request({ name: Facade.METHOD_CROSS_JUMP, param: options.param, path: options.path });
        },

        refreshNative: function (options) {
            Facade.request({ name: Facade.METHOD_REFRESH_NATIVE, package: options.package, json: options.json });
        },

        copyToClipboard: function (options) {
            Facade.request({ name: Facade.METHOD_COPY_TO_CLIPBOARD, content: options.content });
        },

        readFromClipboard: function (options) {
            Facade.request({ name: Facade.METHOD_READ_FROM_CLIPBOARD, callback: options.callback });
        },

        shareToVendor: function (options) {
            Facade.request({ name: Facade.METHOD_SHARE_TO_VENDOR, imgUrl: options.imgUrl, text: options.text });
        },

        downloadData: function (options) {
            Facade.request({ name: Facade.METHOD_DOWNLOAD_DATA, url: options.url, callback: options.callback, suffix: options.suffix });
        },

        encode: function (options) {
          if (options && options.mode === 'base64') {
            Facade.request({ name: Facade.METHOD_ENCRYPT_BASE64, callback: options.callback, info: options.info });
          }
        }
    };

    HybridGuider.file = {

        isFileExist: function(options) {
            Facade.request({ name: Facade.METHOD_CHECK_FILE_EXIST, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
        },

        deleteFile: function(options) {
            Facade.request({ name: Facade.METHOD_DELETE_FILE, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
        },

        getCurrentSandboxName: function(options) {
            Facade.request({ name: Facade.METHOD_GET_CURRENT_SANDBOX_NAME, callback: options.callback });
        },

        getFileSize: function(options) {
            Facade.request({ name: Facade.METHOD_GET_FILE_SIZE, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
        },

        makeDir: function(options) {
            Facade.request({ name: Facade.METHOD_MAKE_DIR, callback: options.callback, dirname: options.dirname, relativeFilePath: options.relativeFilePath });
        },

        readTextFromFile: function(options) {
            Facade.request({ name: Facade.METHOD_READ_TEXT_FROM_FILE, callback: options.callback, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
        },

        writeTextToFile: function(options) {
            Facade.request({ name: Facade.METHOD_WRITE_TEXT_TO_FILE, callback: options.callback, text: options.text, isAppend: options.isAppend, fileName: options.fileName, relativeFilePath: options.relativeFilePath });
        }
    };

    HybridGuider.pipe = {

      /**
       * @param options.serviceCode 需要发送服务的服务号
       * @param options.header 服务的header
       * @param options.data 服务所需要的数据部分，各个服务都不同
       * @param options.callback 服务请求的回调
       */
      socketRequest: function (options) {
        Facade.request({ name: Facade.METHOD_SEND_H5_PIPE_REQUEST, callback: options.callback, serviceCode: options.serviceCode, header: options.header, data: options.data, sequenceId: Date.now() });
      },

      /**
       * @param options.url  HTTP请求发送的URL地址
       * @param options.method HTTP请求方式GET/POST/DELETE/PUT
       * @param options.header HTTP请求的头部
       * @param options.param HTTP请求参数
       * @param options.retry { timeout: "", retry:"", retryInterval:"" }
       * @param options.callback HTTP请求回调
       * @return sequenceId
       */
      httpRequest: function (options) {
        var timestamp = Date.now();
        Facade.request({ name: Facade.METHOD_SEND_HTTP_PIPE_REQUEST, callback: options.callback, target: options.url, method: options.method, header: options.header, queryData: options.param, retryInfo: options.retry, sequenceId: timestamp });
        return timestamp;
      },

      /**
       * @param options.id 需要取消的服务id
       */
      abortRequest: function(options) {
        Facade.request({ name: Facade.METHOD_ABORT_HTTP_PIPE_REQUEST, sequenceId: options.id });
      }

    };

    HybridGuider.pay = {

      /**
       * @see  http://jimzhao2012.github.io/api/classes/CtripPay.html#method_app_check_pay_app_install_status
       * @param options.callback 检查支付之后的回调 function(param){}
       * @example callback返回数据实例
       *    {
       *       platform:"iOS", //Android
       *       weixinPay:true,
       *       aliWalet:true,
       *       aliQuickPay:true,
       *    }
       */
      checkStatus: function (options) {
        Facade.request({ name: Facade.METHOD_CHECK_PAY_APP_INSTALL_STATUS, callback: options.callback });
      },

      /**
       * @see http://jimzhao2012.github.io/api/classes/CtripPay.html#method_app_check_pay_app_install_status
       * @param payAppName 支付App的URL，暂固定为以下4个， aliWalet/aliQuickPay/wapAliPay/weixinPay(微信支付暂未支持)
       * @param payURL 服务器返回的支付URL
       * @param successRelativeURL 支付成功跳转的URL
       * @param detailRelativeURL 支付失败或者支付
       */
      payOut: function (options) {
        Facade.request({ name: Facade.METHOD_OPEN_PAY_APP_BY_URL, payAppName: options.payAppName, payURL: options.payURL, successRelativeURL: options.successRelativeURL, detailRelativeURL: options.detailRelativeURL });
      }
    };

    var Guider = {
        jump: function (options) {
            if (options && options.url && typeof options.url === 'string') {
                window.location.href = options.url;
            }
        },

        apply: function (options) {
            if (options && options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        },

        call: function (options) {
            var $caller = document.getElementById('h5-hybrid-caller');

            if (!options || !options.url || !typeof options.url === 'string') {
                return false;
            } else if ($caller && $caller.src == options.url) {
                $caller.contentDocument.location.reload();
            } else if ($caller && $caller.src != options.url) {
                $caller.src = options.url;
            } else {
                $caller = document.createElement('iframe');
                $caller.id = 'h5-hybrid-caller';
                $caller.src = options.url;
                $caller.style.display = 'none';
                document.body.appendChild($caller);
            }
        },

        init: function () {
            return false;
        },

        log: function (options) {
            if (window.console) {
                window.console.log(options.name);
            }
        },

        print: function(options){
          return console.log(options.log, options.result);
        },

        callService: function () {
            window.location.href = 'tel:4000086666';
        },

        backToLastPage: function () {
            window.location.href = document.referrer;
        },

        checkUpdate: function () {
            return false;
        },

        recommend: function () {
            return false;
        },

        addWeixinFriend: function () {
            return false;
        },

        showNewestIntroduction: function () {
            return false;
        },

        register: function () {
            return false;
        },

        create: function () {
            return false;
        },

        home: function () {
            window.location.href = '/';
        },

        jumpHotel: function () {
            return false;
        },

        injectUbt: function () {
            return false;
        },

        checkAppInstall: function () {
            return false;
        },

        callPhone: function () {
            return false;
        },

        cross: function () {
            return false;
        },

        refreshNative: function () {
            return false;
        },

        copyToClipboard: function (options) {
            return false;
        },

        readFromClipboard: function (options) {
            return false;
        },

        shareToVendor: function (options) {
            return false;
        },

        downloadData: function (options) {
            return false;
        },

        encode: function (options) {
          return false;
        }
    };

    // @notation 是不是可以用filereader做这个功能
    Guider.file = {

        isFileExist: function(options) {
            return false;
        },

        deleteFile: function(options) {
            return false;
        },

        getCurrentSandboxName: function(options) {
            return false;
        },

        getFileSize: function(options) {
            return false;
        },

        makeDir: function(options) {
            return false;
        },

        readTextFromFile: function(options) {
            return false;
        },

        writeTextToFile: function(options) {
            return false;
        }
    };

    Guider.pipe = {

      socketRequest: function () {
        return false;
      },

      httpRequest: function () {
        return false;
      },

      abortRequest: function() {
        return false;
      }
    };

    Guider.pay = {
      checkStatus: function () {
        return false;
      },

      payOut: function () {
        return false;
      }
    };

    WidgetFactory.register({
        name: WIDGET_NAME,
        fn: Util.isInApp() ? HybridGuider : Guider
    });
});
