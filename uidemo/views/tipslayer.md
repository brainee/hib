##TipsLayer是一个widget组件，在下方的展示列表【store数据源】、【store数据源带按钮】中有使用，一般通过下面定义来生成：
##常用Attribute
<pre>
<code>// @param title: {string},
// @param html: {htmlString},
// @param buttons: [{'text': '取消','type': 'cancel', 'click': function () {this.hide(); }, {...}]
</code>
</pre>
###效果：
    <input type="button" id="store" value="不带按钮" style="background-color:Orange; width:135px; text-align:center" />
    <input type="button" id="storeHasBtn" value="带按钮" style="background-color:Orange; width:135px; text-align:center" />
##TipsLayer初始化：
<pre>
<code>
    var TipsLayer = WidgetFactory.create('TipsLayer');
    var l = new TipsLayer({
        title: 'xxx',
        html: 'xxxx',
        buttons: [{
            'text': '取消',
            'type': 'cancel',
            'click': function () {
                this.hide();
            }
        },
        {
            'text': '确认',
            'click': function () {
            alert('确认')
            this.hide();
        }
        }]
    });
    l.show();
</code>
</pre>