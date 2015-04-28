/**
 * @author cmli@ctrip.com
 * @class cUtilityHybrid
 */
define([], function () {
  /** @namespace Util */
  var Util = {};

  /**
  * @public
  * @method isInApp
  * @returns {boolean}
  */
  Util.isInApp = function () {

    /** 首先检查UserAgent是不是含有了ctripwireless */
    var useragent = window.navigator.userAgent;
    if (useragent.indexOf('CtripWireless') > -1) {
      return true;
    }

    /** 旧版本 */
    var oldData = window.localStorage.getItem('isInApp');
    if (oldData) {
      return oldData == '1' ? true : false;
    }

    /** 新版本 */
    var data = window.localStorage.getItem('ISINAPP');
    if (data) {
      return data == '1' ? true : false;
    }
  };

  /**
  * @public
  * @method isInApp
  * @returns {boolean}
  */
  Util.isInWeichat = function () {

    /** 首先检查UserAgent是不是含有了ctripwireless */
    var useragent = window.navigator.userAgent;
    if (useragent.indexOf('MicroMessenger') > -1) {
      return true;
    }
    return false;
  };

  /**
  * @public
  * @method isPreProduction
  * @returns {string}
  */
  Util.isPreProduction = function () {
    return window.localStorage.getItem('isPreProduction');
  };

  return Util;
});