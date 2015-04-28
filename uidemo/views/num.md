##这里是c.ui.num的使用，该插件提供一个加减按钮供选择，并且提供文本框供设置，下面是几个例子：

##基本参数说明

<pre><code>// @param rootBox {dom}            控件的容器
// @param changed {function}       点击加号，减号触发的函数
// @param changeAble {bool}        按钮是否可点击,
// @param unit {String}            控件的计量单位
// @param needText {bool}          文本框是否可是输入
</code></pre>

##demo1：基本状态
<pre><code>define(['app/ui/c.ui.num'], function(num){
    // --------------------
    // 初始化num控件
    var scope = this;
    var num = new c.cuiNum({
        rootBox: this.$('#demo1'),             //控件的容器
        max: 20,                               //最大值
        min: 2,                                //最小值
        curNum: 3,                             //当前值
        changed: function(v){                 //控件点击时触发的函数
            scope.$('#sec1').html(v);
        }
    });

});
</code></pre>

##demo2：设置现在，需要demo1，选项是5的情况下才能设置

<pre><code>define(['app/ui/c.ui.num'], function(num){
    // --------------------
    // 初始化num控件
    var scope = this;
    var num = new c.cuiNum({
        rootBox: this.$('#demo2'),             //控件的容器
        changeAble: function () {
        if (scope.num1.getVal() == 5) {
            return true;
        }
        alert('demo1 的值必须是5才可设置');
            return false;
        },
        changed: function(v){                  //控件点击时触发的函数
            scope.$('#sec1').html(v);
        }
    });

    });
</code></pre>


##demo3：设置单位
<pre><code>define(['app/ui/c.ui.num'], function(num){
    // --------------------
    // 初始化num控件
    var scope = this;
    var num = new c.cuiNum({
        rootBox: this.$('#demo3'),             //控件的容器
        unit: '元',                            //控件的单位计量
        changed: function(v){                  //控件点击时触发的函数
            scope.$('#sec1').html(v);
        }
    });

    });
</code></pre>

##demo4：文本框不可用
<pre><code>define(['app/ui/c.ui.num'], function(num){
    // --------------------
    // 初始化num控件
    var scope = this;
    var num = new c.cuiNum({
        rootBox: this.$('#demo4'),             //控件的容器
        needText: false,                       //文本框是否可以键入
        changed: function(v){                  //控件点击时触发的函数
            scope.$('#sec1').html(v);
        }
    });

});
</code></pre>