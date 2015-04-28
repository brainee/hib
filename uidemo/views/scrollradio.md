##Attribute
<pre><code>// @param title {dom}              标题dom
// @param content {dom}            内容区dom
// @param changed {array}          各个scroll的回调函数，数组装的是回调函数，当scroll组件发生变化时触发
// @param mask {Mask}              蒙版遮盖层
// @param scroll {array}           滚轮集合（数组）
// @param data {array}             各个scroll组件数据源
// @param index {array}            各个scroll组件索引
// @param key {array}              各个scroll组件当前键值（优先级比index高）
// @param disItemNum {int}         scroll组件显示项目
// @param tips {dom}               提示区dom
// @param btCancel {dom}           取消按钮dom
// @param btOk {dom}               确定按钮dom
// @param cancel {String}          取消文本
// @param ok{String}               确定文本
// @param cancelClick {function}   取消回调函数
// @param okClick {function}       确定回调函数
</code></pre>

##Method

###public setTips

<pre><code>// @param str {String}        tip区域要显示的内容
    setTips: function (str) { ... }
</code></pre>

##使用方法

##STEP 2: 初始化ScrollRadio

<pre><code>define(['app/ui/c.ui.scroll.radio'], function(ScrollRadio){
    var scroll = new ScrollRadio({
        title: '选择日期',
        data: [d1, d2],
        index: arrIndex,
        disItemNum: 3,                  // scroll组件显示项目
        cancel: 'cancel',              //按钮取消的文本
        ok: 'ok',                       //按钮确认的文本
        okClick: function (item) {      //确定回调函数
            var t1 = item[0], t2 = item[1];
            var str = t1.key + '' + t2.key;
            var index = t1.index + ',' + t2.index;
            validity.val(str);
            validity.attr('index', index);
            console.log('ok callback');
        },
        cancelClick: function() {   //取消回调函数
            console.log('cancel callback');
        }
    });
});

于是便可初始化组件，点击蒙版，或者选择项目组件会自动关闭
</code></pre>