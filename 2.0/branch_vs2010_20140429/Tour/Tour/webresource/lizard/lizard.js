/**
* @author 魏晓军 / l_wang王磊 <l_wang@Ctrip.com>
* @class lizard
* @description 框架入口，将会引导至各个view

整体逻辑分为：
① 加载库文件
② 解析模板生成静态html
③ 实例化view，绑定事件
④ 

*/


/**
注意：标准l_wang的地方是我拿不准的，需要各位看看

需要晓军确定的点：
① 文件加载为何不使用requireJS
② 现在引用系统级的东西没有使用cfg配置，打包如何处理
③ 
④ parser中使用Lizard命名空间不太合理，请斟酌是否应该采用AMD模式引入
⑤ 

*/


(function () {

  /**
  * @method utils
  * @description 静态工具操作类，暂时用于lizard，不会用于其它地方
  */
  var utils = {};

  // @description 全局可能用到的变量
  var arr = [];
  var slice = arr.slice;

  /**
  * @description inherit方法，js的继承，默认为两个参数
  * @param {function} supClass 可选，要继承的类
  * @param {object} subProperty 被创建类的成员
  * @return {function} 被创建的类
  */
  utils.inherit = function () {

    // @description 参数检测，该继承方法，只支持一个参数创建类，或者两个参数继承类
    if (arguments.length === 0 || arguments.length > 2) throw '参数错误';

    var parent = null;

    // @description 将参数转换为数组
    var properties = slice.call(arguments);

    // @description 如果第一个参数为类（function），那么就将之取出
    if (typeof properties[0] === 'function')
      parent = properties.shift();
    properties = properties[0];

    // @description 创建新类用于返回
    function klass() {
      //      if (_.isFunction(this.initialize))
      if (typeof this.initialize == 'function')
        this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;
    // parent.subclasses = [];

    if (parent) {
      // @description 中间过渡类，防止parent的构造函数被执行
      var subclass = function () { };
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass();
      // parent.subclasses.push(klass);
    }

    var ancestor = klass.superclass && klass.superclass.prototype;
    for (var k in properties) {
      var value = properties[k];

      //满足条件就重写
      if (ancestor && typeof value == 'function') {
        var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(value.toString())[1].replace(/\s/i, '').split(',');
        //只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）
        if (argslist[0] === '$super' && ancestor[k]) {
          value = (function (methodName, fn) {
            return function () {
              var scope = this;
              var args = [function () {
                return ancestor[methodName].apply(scope, arguments);
              } ];
              return fn.apply(this, args.concat(slice.call(arguments)));
            };
          })(k, value);
        }
      }

      klass.prototype[k] = value;
    }

    if (!klass.prototype.initialize)
      klass.prototype.initialize = function () { };

    klass.prototype.constructor = klass;

    return klass;
  };

  //判断是否为seo访问
  utils.isSeo = function () {
    return /\/html5\//i.test(location.href.replace(/[\?#].+$/, ''));
  };

  //获取lizard框架的引用路径，由于系统要求只使用
  utils.getLizardDir = function () {
    var scripts = document.getElementsByTagName('script') || [];
    var reg = /lizard\.js/ig;
    var src, i, len;

    for (i = 0, len = scripts.length; i < len; i++) {
      src = scripts[i].getAttribute("src");
      if (src && reg.test(src)) {
        return src.replace(reg, '')
      }
    }
    return null;
  };

  //l_wang 业务性操作，需要调整
  //如果是seo的情况需要特殊处理
  utils.handleSeo = function () {
    if (!utils.isSeo()) return;

    //为seo增加基础标签
    var head = document.getElementsByTagName('head')[0];
    var base = document.createElement('base');
    base.href = location.href.replace(/\/html5\//i, '/webapp/');
    if (head.firstChild) {
      head.insertBefore(base, head.firstChild);
    } else {
      head.appendChild(base);
    }
  };

  //一些验证操作
  utils.verify = function () {
    if (!utils.getLizardDir()) {
      throw '没有引入lizard.js文件';
    }
  };

//  //l_wang 与require冲突，缺少错误处理，不明意图，需要晓军确认
//  //加载script标签
//  utils.loadScript = function (url, callback) {
//    var script = document.createElement("script")
//    script.type = "text/javascript";
//    script.onload = function (e) {
//      callback(e);
//    };
//    script.src = url;
//    document.body.appendChild(script);
//  };

//  // 多script加载，需要在全部依赖js加载结束才运行回调
//  utils.mutileLoad = function (scripts, callback) {
//    var i, len, no = 0;
//
//    //由于此处no为一个闭包所以每次script标签加载结束后加1是共享的，所以最后才会执行回调
//    for (i = 0, len = scripts.length; i < len; i++) {
//      utils.loadScript(scripts[i], function () {
//        no++;
//        if (no >= len) callback();
//      });
//    }
//  };


  //判断是否webwork访问
  utils.isServer = function () {
    var isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
    return !isBrowser;
  };

  utils.isSupportPushState = function () {
    return !!(window.history && window.history.pushState && window.history.replaceState);
  };

  utils.getPageUrl = function () {
    return window.location.href;
  };

  utils.getPageContent = function () {
    var html = document.body.innerHTML;
    return html.replace(/amp;/g, '');
  };

  //框架核心操作类
  Lizard.APP = utils.inherit({
    //初始化默认属性
    initProperty: function () {
      //首次pushState时候的信息
      //{id:id,url:url,ts:showView.ts=+new Date()}
      this.firstState = null;

      this.mainRoot = $('#main');
      this.header = $('header');
      this.viewport = this.mainRoot.find('.main-viewport');

      //当前view
      this.curView = null;
      //上一次访问的view
      this.lastView = null;

      //状态机，用于手动发起跳转时，不触发pushState的逻辑，比如首次进入一个页面
      //l_wang 暂时无用
      this.openPushState = true;


      //保存views，可以不要，此处应该为一个hash对象
      this.views = {};

      //该动画接口释放出来由各BU实现
      this.animAPIs = {};

      this.animForwardName = 'slideleft';
      this.animBackwardName = 'slideright';
      this.animNoName = 'noAnimate';
      //动画名
      this.animatName = this.animNoName;

    },

    handleOptions: function (options) {
      if (_.isObject(options)) _.extend(this, options);
    },

    initialize: function (opts) {
      this.initProperty();
      this.handleOptions(opts);

      //加载系统级框架并执行回调，这里会根据是否为爬虫走不同的逻辑
      //      this.loadSystemModule(this.sysModule, this.start);

      this.start();

    },

    //框架入口
    start: function () {
      //根据是否为webworker选择不同的实例化方式
      if (utils.isServer()) {
        this.initWebWorker();
      } else {
        this.initApp();
      }
    },

    //爬虫实例化方式
    initWebWorker: function () {
      //l_wang 加入css等操作略去
      //      addPageViewStyle(pageViewStyle);
      //      addLoader();
      //      showLoader();

      this.bindEvents();

      this.loadView();

    },

    //webapp实例化
    initApp: function () {
      this.bindEvents();

      //依赖parser 根据url，当前页面的配置解析data生成静态html
      //这是首次加载的逻辑
      this.loadView(utils.getPageUrl(), utils.getPageContent());

    },

    //点击a标签，或者触发pushState时候触发的事件，该事件会引起跳转
    //l_wang 此处起名要再斟酌
    showPageByHref: function (url) {
      console.log('showPageByHref');

      $.post(url, {}, $.proxy(function (text) {

        console.log('跳转新页面，数据请求成功');

        this.loadView(url, text);

      }, this));

    },


    //根据参数，加载view
    loadView: function (url, text) {

      this.closeObserve();

      this.parsePage(url, text, $.proxy(function (ret) {
        var key, $el;
        var id = ret.id;

        $el = $(ret.viewport);

        //清空当前view，准备承载新的
        //        this.viewport.html('');
        //        this.viewport.html($el);
        $el.appendTo(this.viewport)

        $el.hide();

        //l_wang 由于此处不是闭包，可能有BUG
        var state = {
          id: ret.id,
          header: ret.header,
          viewport: ret.viewport,
          url: utils.getPageUrl()
        };

        //若是 firstState 不存在便为其赋值
        if (!this.firstState) {
          this.firstState = {};
          for (key in state) {
            this.firstState[key] = state[key];
          }
        }

        //解析页面配置的view，将之取出实例化
        this.loadController($el, $.proxy(function (View) {
          //加载view后没有保存起来，这里有问题
          //l_wang ！！！！！！！！！！！！！！！
          //如果存在的话就不必重复初始化，此处有问题
          if (View) {
            //首次为null
            this.lastView = this.curView;

            this.curView = new View({ el: $el });
            this.curView.app = this;

            //l_wang 此处有问题，应该采用队列的方式
            this.views[id] = (this.curView);
          }

          //          this.showView(state);

          this.switchView(this.curView, this.lastView)


          //手动触发pushState
          //l_wang 此处有问题考虑replace
          history.pushState(state, url, url);

          this.openObserve();

        }, this));

      }, this));

    },

    //绑定需要的事件
    bindEvents: function () {

      //此处还应注册其它事件，暂时不予理会
      //l_wang ......................
      console.log('绑定其它事件点')

      //l_wang 此处有问题
      $('body').on('click', function (e) {
        if (e.target.nodeName == 'A' || e.target.nodeName == 'I') {
          if (utils.isSupportPushState()) {
            for (var i = 0, len = tapHandlers.length; i < len; i++) {
              var handler = tapHandlers[i];

              var supported = handler.isSupported(e);

              if (supported) {
                var flag = handler.fn(e);
                return flag;
              }
            }
          }
        }
      });

      //**************华丽的分割线******************

      this.bindPopstate();

    },

    closeObserve: function () {
      this.openPushState = false;
    },

    openObserve: function () {
      this.openPushState = true;
    },

    bindPopstate: function () {
      if (!utils.isSupportPushState()) return;

      $(window).bind('popstate', $.proxy(function (e) {
        //手动触发的时候需要关闭pushState
        if (!this.openPushState) return;

        console.log('popstate')

        //l_wang 此处操作需要调整
        //以现在的做法，此法意义反而不大，此处有问题
        var data = e && e.state;
        this.showView(data);

      }, this));
    },


    //显示一个view
    //l_wang ccd思路此处需要进行dom移除操作，所以一些操作上有多出入
    //l_wang 此处有问题！！！！！！！！！！！！！！！！！！！！
    //这里当前view是保存在lizardapp或者由pushState取出需要再斟酌
    showView: function (data) {
      console.log('showView')
      data = data || this.firstState;

      var view = this.views[data.id];
      this.lastView = this.curView;
      this.curView = view;

      //l_wang 这里有个问题是，返回过程中一般不会有新的view产生，我们根据键值取出
      //而标识存于data中，没有就会回到firstState中

      //暂时如此
      this.switchView(this.curView, this.lastView)

    },

    switchView: function (inView, outView) {
      //动画切换时执行的回调
      var switchFn;

      //此处有问题，如果inView不再的话，应该由firstState生成默认页面
      if (!inView) throw 'inview 未被实例化';

      //outView不存在的情况下就不释放动画接口
      if (outView) {
        switchFn = this.animAPIs[this.animatName];
        //未定义的话便使用默认的无动画
        if (_.isFunction(switchFn)) {
          switchFn(inView, outView);
        } else {
          inView.show();
          outView.hide();
        }

      } else {
        //这里开始走view的逻辑，我这里不予关注
        inView.show();
      }
    },

    //根据viewid判断一个view是否存在
    viewExsit: function (id) {

      return true;
    },

    //解析页面view
    loadController: function (el, callback) {
      var controllers = $('script[type="text/controller"]', el);
      if (controllers.length > 0) {
        var path = $(controllers[0]).attr('data-src');
        requirejs([path], function (View) {
          _.isFunction(callback) && callback(View);
        });
      } else {
        _.isFunction(callback) && callback();
      }
    },

    //以parser为基础解析页面
    parsePage: function (url, html, callback) {

      //获取model数据
      var models = JSON.parse(Lizard.getModels(url, html));

      this._getData(models, function (datas) {
        var text = Lizard.render(url, html, datas);
        if (_.isFunction) callback(text);
      });

    },

    //传入解析的models数组，全部解析成功后，执行回调
    //l_wang 此处调用作用域需要作用域
    _getData: function (models, callback) {
      var i;
      var len = models.length;
      var ajaxLen = 0;
      var ret = [];

      var end = function () {
        ajaxLen++;
        if (ajaxLen >= len) {
          callback(ret);
        }
      };

      //若是model为空，直接调用回调
      if (len == 0) {
        end();
        return;
      }

      for (i = 0; i < len; i++) {
        $.ajax({ type: 'post',
          crossDomain: true,
          contentType: 'application/json; charset=utf-8',
          url: models[i].url,
          data: JSON.stringify(models[i].postdata),
          success: function (data) {
            ret.push(data)
            end();
          }
        });
      } //for

    },

    //实现跳转
    //l_wang 建议改成forward
    goTo: function (url) {
      this.showPageByHref(url);
    },

    goBack: function () {
      history.back();
    }

  });

  var lizard_dir = utils.getLizardDir();

//  var sysModule = [
//
//	    lizard_dir + 'config.js',
//        lizard_dir + 'parser.js'
//      ];
//
//  //将基础库文件加载结束后，便执行系统级加载逻辑
//  utils.mutileLoad([
//     lizard_dir + '3rdlibs/require.min.js',
//	  lizard_dir + '3rdlibs/zepto.js',
//	  lizard_dir + '3rdlibs/underscore.js',
//      lizard_dir + '3rdlibs/backbone.js',
//      lizard_dir + 'parser.js'
//  ], function () {
//    utils.mutileLoad([
//     lizard_dir + 'config.js'
//    ], function () {
//      var app = new LizardAPP();
//
//    });
//  });

  window.utils = utils;


})();


Lizard.appBaseUrl=(function(){
	var ret='/';
	var metas=document.getElementsByTagName('meta');
	for (var i=0;i<metas.length;i++){
		if (metas[i].getAttribute('name')=='appBaseUrl'){
			ret=metas[i].getAttribute('content');
			break;
		}
	}
	return ret;
})();

Lizard.webresourceBaseUrl=(function(){
	var ret='/';
	var metas=document.getElementsByTagName('meta');
	for (var i=0;i<metas.length;i++){
		if (metas[i].getAttribute('name')=='webresourceBaseUrl'){
			ret=metas[i].getAttribute('content');
			break;
		}
	}
	return ret;
})();

