##这里是c.ui.star的使用，该插件提供一个加减按钮供选择，并且提供文本框供设置，下面是几个例子：

##基本参数说明

<pre><code>// @param rootBox {dom}               控件的容器
// @param count {int}                 评分的总个数
// @param curNum {int}                当前选了几颗评分,
// @param showInfo {bool}             是否显示对应的评价信息
// @param starInfo {Array}            评价信息
</code></pre>

<pre><code>define(['app/ui/c.ui.test'], function(test){
    // --------------------
    // 初始化评分控件
    var arr = ['1星评价', '2星评价', '3星评价', '4星评价', '5星评价','6星评价'];
    s = new cUI.cuiTest({
        rootBox: $('.hm'),       //组件的容器
        count: 6,                //评分的总个数
        curNum:1,                //当前选了几颗评分
        showInfo: true,          //是否显示对应的评价信息
        starInfo: arr            //评价信息
    });
});
</code></pre>