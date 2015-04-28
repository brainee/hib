define(function(){
    /*ubt性能采集*/
    function Performance() {
      this.performance = {};
      var isapp = Lizard.isHybrid ? 1 : 0;
      this.defaults = {
        "Domready":       {
          "name": "JS.Lizard.Domready",
          "tags": {
            "version": Lizard.version,
            "isapp":   isapp,
          }
        },
        "Onload":         {
          "name": "JS.Lizard.Onload",
          "tags": {
            "version": Lizard.version,
            "isapp":   isapp
          }
        },
        "AjaxReady":      {
          "name": "JS.Lizard.AjaxReady",
          "tags": {
            "version":      Lizard.version,
            "isapp":        isapp,
            "url":          "",
            "distribution": "200-800"
          }
        },
        "TemplateRender": {
          "name": "JS.Lizard.TemplateRender",
          "tags": {
            "version":      Lizard.version,
            "isapp":        isapp,
            "url":          "",
            "distribution": "200-800"
          }
        },
        "GeoRequest": {
          "name": "JS.Lizard.GeoRequest",
          "tags": {
            "version":      Lizard.version,
            "isapp":        isapp,
            "distribution": "200-800"
          }
        }
      }
      this.uuid = 0;
    }
    
    if (!window.__bfi) {
      window.__bfi = [];
    }
    Performance.prototype = {
      send:     function (name, tag, value, ts) {
        var sendKey = ['_trackMatrix', name, tag, value, ts];
        window.__bfi.push(sendKey);
      },
      group:    function (id, opt) {
        opt.startTime = (new Date).getTime();
        opt.network = Lizard.networkType || 'unknown';
        this.performance[id] = opt;
      },
      groupEnd: function (id) {
        var opt = this.performance[id] || {};

        var defaults = this.defaults
        var def = defaults[opt.name];
        var tags = def.tags;
        var matrixName = def.name;
        var matrixTag = {};
        for (var key in tags) {
          matrixTag[key] = opt[key] || tags[key];
        }
        //matrixTag = { url: 'http://mubt.test.sh.ctriptravel.com/index.html', distribution: "200-800" }
        var ts = (new Date).getTime();
        var matrixValue = ts - opt["startTime"];
        if (matrixTag.distribution) {
          matrixTag.distribution = this.distribution(matrixValue);
        }
        this.send(matrixName, matrixTag, matrixValue, ts)
      },
      getUuid:  function () {
        return "Performance_" + (++this.uuid);
      },
      
      distribution: function (time) {
        var ret = "";
        if (0 <= time & time <= 500) {
          ret = '[0,500]';
        } else if (501 <= time & time <= 1000) {
          ret = '[501,1000]';
        } else if (1001 <= time & time <= 2000) {
          ret = '[1001,2000]';
        } else if (2001 <= time & time <= 3000) {
          ret = '[2001,3000]';
        } else if (3001 <= time & time <= 4000) {
          ret = '[3001,4000]';
        } else if (4001 <= time) {
          ret = '[4001,--]';
        }
        return ret + "(ms)";
      }
    }
    
    return Performance; 
});