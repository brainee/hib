/**
* Ctrip H5 log组件
* 记录Ctrip H5 框架的日志
*/

define(['libs','cUtility'], function (libs,cUtility) {
  /**
  * 捕获error信息
  * @param errorMsg
  * @param errorFileUrl
  * @param lineNum
  */
//  window.onerror = function (errorMsg, errorFileUrl, lineNum) {
//    cLog.errorLog(errorMsg, errorFileUrl, lineNum)
//  };

  /**
  * onload事件,用以记录Url history
  */
  window.onload = function () {
    cLog.urlLog(window.location.href);
  };

  /**
  * onhashchange事件,用以记录url history
  */
  window.onhashchange = function () {
    cLog.urlLog(window.location.href);
  };

  var cLog = {

    //日志服务器地址
      logServerUrl: '/loggingws/LogData/SaveLog',

    logTypes: {
      ERROR_LOG: {
        type: 'danger',
        server: true,
        maxNum: 2
      }
    },
    /**
    * 检查是否打开服务端日志
    */
    checkServerLog: (function () {
      var _logFlag = false;
      var cfgStore = localStorage.getItem('H5_CFG');
      if (cfgStore) {
        _logFlag = JSON.parse(cfgStore).value.checkServerLog;
      }
      return !!_logFlag;
    })(),

    /**
    * 保存error Log信息
    * @param errorMsg
    * @param errorFileUrl
    * @param lineNum
    * @returns {boolean}
    */
    errorLog: function (errorMsg, errorFileUrl, lineNum) {
      var error = this.buildErrorObj(errorMsg, errorFileUrl, lineNum);
      this.pushLog('ERROR_LOG', error);
      return false;
    },

    /**
    * 保存url Log信息
    * @param url
    */
    urlLog: function (url) {
      if (url.indexOf('monitor') > -1 || url.indexOf('feedback') > -1) {
        return;
      }
      var data = {
        url: url,
        dt: this.getDateTime()
      };
      this.pushLog('URL_LOG', data);
    },

    /**
    * 保存restful Log
    * @param url
    * @param request
    * @param response
    */
    serverLog: function (url, request, response) {
      if (!this.checkServerLog) {
        return;
      }
      var data = {
        url: url,
        rspCode: response ? '200' : '404',
        req: request,
        rsp: response,
        dt: this.getDateTime()
      }
      this.pushLog('SERVER_LOG', data);
    },

    /**
    * 保存 App to H5 参数LOG
    * @param name
    * @param param
    */
    applog: function (name, param) {
      var logStore = localStorage.getItem('APP_LOG');
      var appLog = logStore ? JSON.parse(logStore) : {};
      appLog[name] = {
        data: param,
        dt: this.getDateTime()
      }

      if (JSON.stringify) {
        logStr = JSON.stringify(appLog);
      } else {
        logStr = eval('(' + appLog + ')');
      }

      localStorage.setItem('APP_LOG', logStr);
    },

    /**
    * 组装错误对象
    * @param errorMsg
    * @param errorFileUrl
    * @param lineNum
    * @returns {{msg: *, file: string, line: *, fullPath: *, dt: (number|*), url: string, restful: {url: string, request: string, response: string}}}
    */
    buildErrorObj: function (errorMsg, errorFileUrl, lineNum) {
      var fileName = typeof errorFileUrl == 'string' ? errorFileUrl.substr(errorFileUrl.lastIndexOf('/') + 1) : '';
      //保存Error 错误调用堆栈
      return {
        msg: errorMsg,
        file: fileName,
        line: lineNum,
        fullPath: errorFileUrl,
        dt: this.getDateTime(),
        url: window.location.href,
        restful: {
          url: '',
          request: '',
          response: ''
        }
      };
    },

    /**
    * 保存Log对象,记录在一个localstorage中,最大保存50条
    * @param logName 日志localStorage名称
    * @param logData 日志数据
    * @param maxNum 队列最大保存数据
    */
    pushLog: function (logName, logData, maxNum) {
      var logStore = localStorage.getItem(logName),
        logStr = [];
      var logStack = logStore ? JSON.parse(logStore) : [];
      maxNum = maxNum ? maxNum : 50;
      //新的记录放在数组的头部
      logStack.unshift(logData);

      //如果达到最大记录数,发到log Server
      var logType = this.logTypes[logName];
      if (logType && logType.server && logStack.length > logType.maxNum) {
        var data = {
          data: JSON.stringify(logData),
          type: logType.type
        }
        this.sendLog(logType.type, data, function () {
          localStorage.removeItem(logName);
        });
      } else {
        //如果大于50条,删除最早的记录
        if (logStack.length > maxNum) {
          logStack.splice(maxNum)
        }
        //如未达到最大记录,保存的
        if (JSON.stringify) {
          logStr = JSON.stringify(logStack);
        } else {
          logStr = eval('(' + logStack + ')');
        }
        localStorage.setItem(logName, logStr);
      }
    },

    /**
    * 格式化当前时间
    * @returns {number}
    */
    getDateTime: function () {
      var d = new Date();
      var dateTime = "";
      dateTime += d.getMonth() + 1;
      dateTime += '/';
      dateTime += d.getDate();
      dateTime += ' ';
      dateTime += d.getHours();
      dateTime += ':';
      dateTime += d.getMinutes();
      dateTime += ':';
      dateTime += d.getSeconds();

      return dateTime;
    },

    /**
    * 发送数据
    * @param type
    * @param data
    */
    sendLog: function (type, data, callback) {
      var host = location.host;
      if(cUtility.isInApp()){
        host = 'm.ctrip.com';
      }
      $.post("http://" + host + this.logServerUrl, data, function (response) {
        console.log(response)
       callback && callback();
      }, 'json')
    }
  }

  return cLog;

});