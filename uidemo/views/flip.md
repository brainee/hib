##Attribute
<pre><code>// @param arg1 {dom}               手势容器的dom
// @param arg2 {String}            手势的方向,分别为'left,right,up,down'
// @param arg3 {function}          手势后要做的change
</code></pre>

##使用方法

###STEP 1: 项目所有页面已默认require ,c.business.app.js ，所以flip事件能直接调用

<pre><code>
    var el = this.$('#el');     //获取容器

    //左滑动
    $.flip(el, 'left', function () {
        el.val('left')
    });

    //右滑动
    $.flip(el, 'right', function () {
        el.val('right')
    });

    //上滑动
    $.flip(el, 'up', function () {
        el.val('up')
    });

    //下滑动
    $.flip(el, 'down', function () {
        el.val('down')
    });
</code></pre>