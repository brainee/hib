##slide组件，图片轮播

###主要属性如下：
<pre><code>// @param container {dom}           容器元素的dom
// @param images {Array}            要轮播的图片数组
// @param autoplay {bool}           是否自动播放
// @param loop {bool}               是否轮播
// @param isadaptive {bool}         设置是否需要自适应
</code></pre>

##使用方法

###slider的简单初始化
<pre><code class="javascript">
//给容器添加样式
$('#slidecontainer').css({
    'width': '100%',
    'margin': 'auto',
    'overflow': 'hidden',
    'position': 'relative'
})

//imgs Array的数据格式
var imgs = [];
imgs.push({
    title: 'x1',
    src: 'http://images4.c-ctrip.com/target/hotel/22000/21648/4da868bdf30b44ff894b4398a0a4bf96_300_225.jpg',
    link: 'http://www.google.com'
});
imgs.push({
    title: 'x2',
    src: 'http://images4.c-ctrip.com/target/hotel/22000/21648/5F6FB757-19CD-4D99-8C9C-77E92EB6E7DF_300_225.jpg',
    link: 'http://www.google.com'
});
imgs.push({
    title: 'x3',
    src: 'http://images4.c-ctrip.com/target/hotel/22000/21648/542d8c19b5ab4b93ad936c54d2b9453e_300_225.jpg',
    link: 'http://www.google.com'
});

//slider的初始化
var slide = new slider({
    container: $('#slidecontainer'),    //容器的dom
    images: imgs,                       //imgs的数据
    autoplay: false,                    //是否轮播
    loop: true,                         //是否循环轮播
    isadaptive: true                    // 设置是否需要自适应
});

</code></pre>