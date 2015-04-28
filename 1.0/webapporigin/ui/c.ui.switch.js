/**
* @author l_wang王磊 <l_wang@Ctrip.com>
* @class cUISwitch
* @description 提供开关阀
*/
define(['cBase', 'cUIAbstractView'], function (cBase, AbstractView) {

  var options = {};

  var _config = {
    prefix: 'cui-'
  };

  options.__propertys__ = function () {

    /** 鼠标各个位置信息，主要针对touchstart与touchend */
    this.mouseData = {
      sX: 0,
      eX: 0,
      sY: 0,
      eY: 0
    };
  };

  /** 可以传入rootBox已经changed两个参数，一个是控件所处位置，一个是选项改变时候需要触发的事件 */
  options.initialize = function ($super, opts) {
    this.bindEvent();
    this.allowsConfig.changed = true; //开启changed

    $super(opts);

    this.show();

    if (opts.checked) this.checked();
    else this.unChecked();

  };

  /**
  * @method bindEvent
  * @description 事件绑定
  */
  options.bindEvent = function () {

    this.addEvent('onShow', function () {
      var scope = this;

      this.el = this.root.find('.cui-switch');
      this.switchBar = this.el.find('.cui-switch-bg');

      var isTouch = 'ontouchstart' in document.documentElement;

      this.start = isTouch ? 'touchstart' : 'mousedown';
      this.move = isTouch ? 'touchmove' : 'mousemove';
      this.end = isTouch ? 'touchend' : 'mouseup';

      this.startFn = function (e) {
        scope._touchStart.call(scope, e);
      };
      this.moveFn = function (e) {
        scope._touchMove.call(scope, e);
      };
      this.endFn = function (e) {
        scope._touchEnd.call(scope, e);
      };

      //滑动事件
      this.el[0].addEventListener(this.start, this.startFn, false);
      this.el[0].addEventListener(this.move, this.moveFn, false);
      this.el[0].addEventListener(this.end, this.endFn, false);
    });
  };

  /**
  * @method createHtml
  * @description 重写抽象类结构dom
  */
  options.createHtml = function () {
    return [
        '<div class="cui-switch">',
          '<div class="cui-switch-bg"></div>',
          '<div class="cui-switch-scroll"></div>',
        '</div>'
      ].join('');
  };

  options._touchStart = function (e) {
    var pos = (e.changedTouches && e.changedTouches[0]) || e
    this.mouseData.sX = pos.pageX;
    this.mouseData.sY = pos.pageY;

    e.preventDefault();

  };

  options._touchMove = function (e) {
    if (this.res) clearTimeout(this.res);
    var pos = (e.changedTouches && e.changedTouches[0]) || e
    //    this._switchMove(pos);
    e.preventDefault();

  };

  options._touchEnd = function (e) {
    if (this.res) clearTimeout(this.res);

    var pos = (e.changedTouches && e.changedTouches[0]) || e
    this.mouseData.eX = pos.pageX;
    this.mouseData.eY = pos.pageY;

    //移动状态，默认乱移动
    var dir = 'move';

    if (this.mouseData.sX == this.mouseData.eX && this.mouseData.sY == this.mouseData.eY) {
      dir = 'tap';
    } else {
      if (Math.abs(this.mouseData.eY - this.mouseData.sY) < Math.abs(this.mouseData.eX - this.mouseData.sX)) {
        dir = this._getLRDir();
      }
    }

    if (dir == 'tap') {
      if (this.el.hasClass('current')) {
        this.unChecked();
      } else {
        this.checked();
      }
      return;
    }

    if (dir == 'left') {
      this.unChecked();
    } else if (dir == 'right') {
      this.checked();
    }

  };

  /**
  * @method _getLRDir
  * @description 计算左右方向
  */
  options._getLRDir = function () {
    if (this.mouseData.eX - this.mouseData.sX > 0) return 'right';
    if (this.mouseData.eX - this.mouseData.sX < 0) return 'left';
  };

  /**
  * @method unChecked
  * @description 将控件置为非选择状态
  */
  options.unChecked = function () {
    this.el.removeClass('current');
    this.switchBar.removeClass('current');
    this._triggerChanged();
  };

  /**
  * @method checked
  * @description 将控件置为选择状态
  */
  options.checked = function () {
    this.el.addClass('current');
    this.switchBar.addClass('current');
    this._triggerChanged();
  };

  options._triggerChanged = function () {
    if (typeof this.changed == 'function') this.changed.call(this);
  }

  /**
  * @method getStatus
  * @description 获得当前控件是否选择
  */
  options.getStatus = function () {
    return this.el.hasClass('current');
  }

  return new cBase.Class(AbstractView, options);

});