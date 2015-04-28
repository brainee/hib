define(['cUtilPath', 'cCoreInherit', 'cAbstractApp'], function(path, cCoreInherit, APP){
  return cCoreInherit.Class(APP, {
    bindEvents: function($super) {      
      $super();
      $(window).bind('hashchange', _.bind(function(e){
        if (!this.stopListening) this.loadFromRoute(this._getCurrentView(), 0); 
        Lizard.__fakeViewNode && Lizard.__fakeViewNode.remove();
      }, this));      
    },
    
    start: function()
    {
      this.loadFromRoute(this._getCurrentView(), 1);      
    },
    
    loadFromRoute: function(landingpath, landingpage)    
    {
      var localRouteRet = Lizard.localRoute.mapUrl(landingpath);
      if (localRouteRet) {
        requirejs([localRouteRet], _.bind(function(text) {
          if (landingpath == this._getCurrentView())
          {
            this.loadView(landingpath, text, {pushState: false, renderAt: Lizard.renderAt, landingpage: landingpage});  
          } else {
            console.log('fast click back!!!');
          }       
        }, this));
      }
    },
    
    _getCurrentView: function()
    {
      var landingpath = decodeURIComponent(window.location.hash);
      if (landingpath.indexOf('#') == 0)
      {
        landingpath = landingpath.substr(1);
      }
      else
      {
        landingpath = Lizard.localRoute.config.defaultView || _.first(_.keys(Lizard.localRoute.config));
      }
      return landingpath;
    },
    
    goTo: function(url, opt)
    {
      this.endObserver();      
      window.location.hash = encodeURIComponent(url); 
      if (opt && opt.viewName && Lizard.viewHtmlMap[opt.viewName])
      {
        this.loadView(url, Lizard.viewHtmlMap[opt.viewName], {pushState: false});
        return;
      }
      else
      {
        this.loadFromRoute(url, 0); 
      }
      setTimeout(_.bind(this.startObserver, this), 1);
    },
    
    goBack: function()
    {
      if (arguments.length == 0)
      {
        history.back()
      }
      else
      {
        this.goTo.apply(this, arguments);
      }
    },
    
    startObserver: function () {
      this.stopListening = false;
    },

    endObserver: function () {
      this.stopListening = true;
    },
    
    judgeForward: function(url)
    {
      if (window.location.hash)
      {
        return url == decodeURIComponent(window.location.hash).substr(1);
      }
      else
      {
        return url == (Lizard.localRoute.config.defaultView || _.first(_.keys(Lizard.localRoute.config)));
      }
    }
  })
})