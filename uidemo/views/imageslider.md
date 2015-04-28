###主要属性如下：
<pre><code>// @param container {dom}            容器元素的dom
// @param images {Array}             轮播图片数组 array [object] object :{src,alt,onClick,}
// @param autoPlay {bool}            是否自动播放
// @param index {int}                当前图片索引
// @param delay {int}                自动播放延迟(单位：毫秒)
// @param dir {String}               轮播方向
// @param errorImage {String}        图片加载 失败/错误 后显示的图片
// @param lodingImage {String}       图片加载中显示的图片
// @param onChange {function}        轮播开始的事件
// @param onImageClick {function}    图片点击事件

</code></pre>

##几种方法
<pre><code class="javascript">//开始播放
imageSlider.play();
//停止播放
imageSlider.stop();
//重新播放
imageSlider.rePlay();
//跳转至下一张
imageSlider.next();
</code></pre>

##实例化对象
<pre><code>this.imageSlider = new imageSlider({
    //图片数组
    images: [ {
        //图片路径，绝对地址
        src: "http://res.m.ctrip.com/market/appimg/h5/20140305/3.jpg",
        //点击图片的事件
        onClick: $.proxy(function (imageInfo) {
            this._onSelectedImageClick(imageInfo);
        },this),
        //onClick事件的上下文
        scope: this },
            { src: "http://res.m.ctrip.com/market/appimg/h5/20140305/2.jpg"},
            { src: "http://res.m.ctrip.com/market/appimg/h5/20140305/1.jpg"}
    ],
    //容器
    container:$("#imageSliderDemo"),
    //滚动方向,默认LEFT
    dir: "LEFT",
    //默认显示的图片索引
    index: 0,
    //是否自动播放
    autoPlay: true,
    //所有图片的单击事件，如果对应的图片设置了自己的click事件，该事件则不执行
    onImageClick: $.proxy(function
    (imageInfo) { this._onImageClick(); }, this)
});
this.imageSlider.paly();
</code></pre>