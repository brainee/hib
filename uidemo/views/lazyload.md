##lazyload组件，图片延迟加载

##使用方法

###lazyload的简单初始化
<pre><code class="javascript">
var el = this.$el.find('#img');         //获取图片的dom
var src = prompt("请输入src");          //输入图片的src
el.attr('src', src);                    //重置图片的src属性
lazyload.lazyload(el);                  //执行延迟加载

</code></pre>
