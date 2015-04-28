define(['cHybridFacade'], function(Facade){
  function Header() {
    this.root = this.rootBox = $('#headerview');
    this.root.hide();
  };
  
  Header.prototype = {
    set: function(headData)
    {
      this.headerData = headData;
      var events = this.headerData.events
      var head = {
        'left': [],
        'center': [],
        'centerButtons': [],
        'right': []
      }, self = headData.view || this;

      if (headData.back) {
        head.left.push({
          'tagname': 'back'
        });
        var returnCb = function () {
          events.returnHandler.call(self);
        }
        Facade.register({ tagname: Facade.METHOD_BACK, callback: returnCb });
      }
      if (headData.title) {
        head.center.push({'tagname': 'title', 'value': headData.title});
      }
      if (headData.subtitle) {
        head.center.push({'tagname': 'subtitle', 'value': headData.subtitle});
      }
      if (headData.btn) {
        if (_.isFunction(events.commitHandler)) {
          head.right.push({'tagname': 'commit','value': headData.btn.title});
          var commitCb = function () {
            events.commitHandler.call(self);
          }
          Facade.register({ tagname: Facade.METHOD_COMMIT, callback: commitCb });
        }
        if (_.isFunction(events.searchHandler)) {
          head.right.push({'tagname': 'search', 'value': headData.btn.title});
          var searchCb = function () {
            events.searchHandler.call(self);
          }
          Facade.register({ tagname: Facade.METHOD_SEARCH, callback: searchCb });
        }
      }
      if (headData.tel) {
        head.right.push({'tagname': 'call'});
      }
      if (headData.home) {
        head.right.push({'tagname': 'home'});
      }
      if (headData.citybtn) {
        var cityBynobj = {
          "tagname": "cityChoose",
          "value": headData.citybtn,
          "a_icon": "icon_arrowx",
          "i_icon": "icon_arrowx.png"
        }
        if (headData.citybtnImagePath) {
          cityBynobj.imagePath = headData.citybtnImagePath;
          if (headData.citybtnPressedImagePath) {
            cityBynobj.pressedImagePath = headData.citybtnPressedImagePath;
          } else {
            cityBynobj.pressedImagePath = cityBynobj.imagePath;
          }
        }
        if (headData.citybtnIcon) {
          cityBynobj.a_icon = cityBynobj.i_icon = headData.citybtnIcon;
        }
        head.centerButtons.push(cityBynobj);
        var cityBtnCb = function () {
          events.citybtnHandler.call(self);
        }
        Facade.register({ tagname: Facade.METHOD_CITY_CHOOSE, callback: cityBtnCb });
      }
      if (headData.share) {
        head.right.push({ 'tagname': 'share'});
      }
      if (headData.favorite) {
        head.right.push({'tagname': 'favorite'});
      }
      if (headData.favorited) {
        head.right.push({'tagname': 'favorited'});
      }
      if (headData.phone) {
        head.right.push({'tagname': 'phone'});
      }
      if (headData.moreMenus) {
        head.moreMenus = headData.moreMenus;
        head.right.push({ 'tagname': 'more'});
        _.each(headData.moreMenus,
        function(menuItem) {
          Facade['METHOD_' + menuItem.tagname.toUpperCase()] = 'METHOD_' + menuItem.tagname.toUpperCase();
          Facade.registerOne(Facade['METHOD_' + menuItem.tagname.toUpperCase()], menuItem.tagname);
        });
      }
      try {
        var headInfo = JSON.stringify(head);
        Facade.request({ name: Facade.METHOD_REFRESH_NAV_BAR, config: headInfo });
      } catch(e) {}
    },
    
    updateHeader: function (name, val)
    {
      if (val)
      {
        this.headerData[name] = val;        
      } else if (_.isObject(name)) {
        _.extend(this.headerData, name);
      }   
      var headInfo = JSON.stringify(_.omit(this.headerData, 'view'));
      Facade.request({ name: Facade.METHOD_REFRESH_NAV_BAR, config: headInfo });
    },
    
    show: function()
    {
      Facade.request({ name: Facade.METHOD_SET_NAVBAR_HIDDEN, isNeedHidden: false });
    },
    
    hide: function()
    {
      Facade.request({ name: Facade.METHOD_SET_NAVBAR_HIDDEN, isNeedHidden: true });
    }
  };
  
  return Header;
})