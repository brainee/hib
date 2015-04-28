define(['libs', 'c'], function (libs, c) {
    var cBase = c.base,
        cDate = cBase.Date,
        cui = c.ui;

    TaxiWidget = {};

    //简单的Radio     
    TaxiWidget.Radio = new cBase.Class(cui.EventListener, {
        __propertys__: function () {
            //数据
            this.data;
            //单个模板
            this.itemTpl = '<span data-index="<%=__index__%>" data-value="<%=value%>" class="<%if(typeof __selected__ != "undefined" && __selected__){%>current<%}%>"><%=title%></span>';
            this.rootbox;
            //当前值
            this.value;
            //当前索引
            this.index;
            //对每个元素处理
            this.itemHandle;
            //回调的上下文
            this.scope;
            this._itemTpld;
            this._root;
            this._current;
            this._list;
            this._lastValue;
            //是否失效
            this._invalid = false;
        },
        initialize: function ($super, ops) {
            $super();
            this._setOption(ops);
            this._initDefaut();
            this._createHtml();
            this._buildEvent();
            this._reload();
        },
        _setOption: function (ops) {
            ops = ops || {};
            for (var i in ops) {
                switch (i) {
                    case 'onChange':
                        this.addEvent('onChange', ops[i]);
                        break;
                    case 'itemHandle':
                    case 'data':
                    case 'rootbox':
                    case 'current':
                    case 'scope':
                        this[i] = ops[i];
                        break;
                }
            }
        },
        _initDefaut: function () {
            this.index = (function (list) {
                for (var i = 0, len = list.length; i < len; i++) if (list[i].selected) return i;
            })(this.data);
            this.value = this.data[this.index].value;
        },
        _createHtml: function () {
            this.root = $('<span class="money-box"></span>');
            this._itemTpld = _.template(this.itemTpl);
        },
        _buildEvent: function () {
            this.root.delegate('span', 'click', $.proxy(this._itemOnClick, this));
            this.rootbox.append(this.root);
        },
        _itemOnClick: function (e) {
            if (this._invalid) return;
            var dom = $(e.currentTarget),
                curValue = parseInt(dom.attr('data-value')),
                curIndex = parseInt(dom.attr('data-index'));
            if (curValue === this._lastValue) return;
            this.index = curIndex;
            this.setValue(curValue);
            var data = this.getValue();
            this.trigger('onChange', [data], this.scope || this);

            this._lastValue = curValue;
        },
        _reload: function () {
            this.root.hide();
            this.root.empty();
            var width = this.data.length ? parseInt(100 / this.data.length) : 100,
                v,
                dom;
            for (var i = 0, len = this.data.length; i < len; i++) {
                v = _.clone(this.data[i]);
                v.__index__ = i;
                v.__selected__ = this.data[i].value === this.value;
                dom = typeof this.itemHandle === 'function' ? this.itemHandle($(this._itemTpld(v)), v, i, this.data) : $(this._itemTpld(v));
                this.root.append(dom);
            }
            this.root.show();
        },
        setData: function (data) {
            this.data = data;
            this._reload();
        },
        getValue: function () {
            return this.data[this.index];
        },
        setValue: function (value, tryChange) {
            var cur = this.root.find('span[data-value="' + value + '"]');
            if (cur.length) {
                this.value = value;
                this.root.find('span').removeClass('current');
                this.index = parseInt(cur.attr('data-index'));
                cur.addClass('current');
                var data = this.getValue();
                if (tryChange) this.trigger('onChange', [data], this.scope || this);
            }
        },
        disable: function () {
            this._invalid = true;
            this.root.addClass('widget-disabled');
        },
        valid: function () {
            this._invalid = false;
            this.root.removeClass('widget-disabled');
        }
    });

    return TaxiWidget;
});