/**
 * @author zsb张淑滨 <shbzhang@Ctrip.com> / ghj龚汉金 <hjgong@Ctrip.com>
 * @class cLog
 * @description 提供App在手机端的后门
 * @comment 需要zsb与新代码再核对一遍
 */
define(['cUtilityServertime', 'cUtility'], function (cUtility, cUtil) {

  /** 声明cLog命名空间 */
  var cLog = {
    serverTime:    cUtility.getServerDate().getTime(),    
    event:         {
      DOMREADY:  'JS.Lizard.Domready',
      ONLOAD:    'JS.Lizard.OnLoad',
      AJAXREADY: 'JS.Lizard.AjaxReady'
    }
  };

  /**
   * @method cLog.restlog
   * @param {string} name log的key名称
   * @param {string} param 具体写入log的信息
   * @description 重置Log
   */
  cLog.applog = cLog.appLog = function (name, param) {

  };

  /**
   * onDomReady,标记为页面第一次渲染后执行,在view.onCreate方法完成时调用
   */
  cLog.onDomReady = function (sTime) {
    this.sendCommonTrack(this.event.DOMREADY, sTime);
  };

  /**
   * onLoad,数据取回,模板渲染完毕后执行, 在view.turning方法前调用
   */
  cLog.onLoad = function (sTime) {
    this.sendCommonTrack(this.event.ONLOAD, sTime);
  };

  /**
   * ajax 请求时间统计
   * @param url 请求url
   * @param sTime 请求开始时间
   * @param eTime 请求结束时间
   * @constructor
   */
  cLog.ajaxReady = function (url, sTime, eTime) {
    if (!eTime) {
      eTime = this.getNow();
    }
    var ts = eTime - sTime;
    var param = this._createExtParam();
    param.url = url;
    param.distribution = this._chooseTimeZone(ts);
    this.sendTrack(this.event.AJAXREADY, param, ts);
  };

  /**
   * 通用事件
   * @param eventName
   * @param sTime
   */
  cLog.sendCommonTrack = function (eventName, sTime) {
    var t1 = sTime ? sTime : this.localTime;
    var t2 = this.getNow();
    var param = this._createExtParam();
    this.sendTrack(eventName, param, t2 - t1);
  };
  /**
   * 发送ubt的性能统计
   * @param name
   * @param extParam
   * @param time
   */
  cLog.sendTrack = function (name, extParam, time) {
    if (!window.__bfi) {
      window.__bfi = [];
    }
    extParam.network = cUtil.networkType || 'unknown';
    extParam.landingpage = cUtil.landing;
    //计算出服务器当前时间
    var ts = this.serverTime + (this.getNow() - this.localTime);
    console.log(name+":"+time +",ts:"+ts);
    window.__bfi.push(['_trackMatrix', name, extParam, time, ts])
  };

  /**
   * 生成ubt的参数
   * @param name
   * @param time
   * @private
   */
  cLog._createExtParam = function (name, time) {
    var tag = {
      "version": "1.1"
    }
    return tag;
  },

  /**
   * 返回当前时间的毫秒值
   */
    cLog.getNow = function () {
      return  new Date().getTime();
    },

  /**
   * 返回日期区间
   */
    cLog._chooseTimeZone = function (time) {
      var zone = "[2000,--]"
      if (time >= 5000) {
        zone = "[5000,--]";
      } else if (time >= 4000) {
        zone = "[4000,5000]";
      } else if (time >= 3000) {
        zone = "[3000,4000]";
      } else if (time >= 2000) {
        zone = "[2000,3000]";
      } else if (time >= 1000) {
        zone = "[1000,2000]";
      } else if (time >= 500) {
        zone = "[500,1000]";
      } else if (time >= 0) {
        zone = "[0,500]";
      }
      return zone;
    }
   
  cLog.localTime = ((typeof __SERVERDATE__ != 'undefined')&&__SERVERDATE__.local) ? __SERVERDATE__.local.getTime() : cLog.getNow();
  
  return cLog;

});