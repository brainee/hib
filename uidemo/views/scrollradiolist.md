##Attribute

<pre><code>// @param title {dom}             标题dom
// @param content {int}            内容区dom
// @param itemClick {function}     回调函数
// @param mask {Mask}              蒙版遮盖层
// @param scroll {ScrollList}      滚轮组件
// @param data {array}             数据源
// @param index {int}              scroll组件选择索引
// @param key {String}             scroll当前键值（优先级比index高）
// @param disItemNum {int}         scroll组件显示项目
</code></pre>

##使用方法
###初始化ScrollRadioList

<pre><code>define(['app/ui/c.ui.scroll.radio.list'], function(ScrollRadioList){
    var scroll = new ScrollRadioList({
        title: '列表选项',
        index: port_place.attr('index'),          //默认定位到第几个item上
        data: data,                               //要展示到item的数组
        content: 1,
        disItemNum: 3,                            //显示的item数量
        itemClick: function (item) {              //选中item触发的事件
            port_place.attr('index', item.index);
            port_place.val(item.key);
            console.log('------');
        }
    });
});

初始化组件，点击蒙版，或者选择项目组件会自动关闭
</code></pre>

