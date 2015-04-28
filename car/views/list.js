// ------------------------------
// 用车列表
// ------------------------------
define(['libs', 'c', 'CarModel', 'CarStore', 'cListAdapter', 'cCommonPageFactory', 'cWidgetFactory', buildViewTemplatesPath('list.html'), 'cLazyload', 'cCommonListPage'], function (libs, c, CarModel, CarStore, ListAdapter, CommonPageFactory, WidgetFactory, viewhtml, lazyload) {


    var CommonListPageView = CommonPageFactory.create('CommonListPage');  //listView实例 用于继承

    var View = CommonListPageView.extend({
        pageid: '',
        hasAd: true,
        productList: CarModel.ProductListModel.getInstance(),  // 用车产品列表查询Model

        productListParamStore: CarStore.ProductListParamStore.getInstance(),  //用车产品列表查询参数Store        
        carBookingDetailsModel: CarModel.ProductDetailModel.getInstance(),  //用车产品详情查询Model
        productDetailsStore: CarStore.ProductDetailStore.getInstance(),        
        sTitle: '选择车型',
        cid: '',

        onCreate: function () {		//创建page
            this.injectHeaderView();      //注入HeaderView实例

            this.$el.html(viewhtml);
        },

        onLoad: function (refer) {		//加载数据
            var self = this;
            this.showLoading();

            this.refer = refer || "";

            if(this.refer === "booking" && this.isRedirect){    //如果点过去,没有刷新回退，直接turning
                this.hideLoading();
                this.showHead();
                if(_.isEmpty(this.request.query)){
                    var reqObj = this.productListParamStore.get();
                    window.location.hash += '?' + $.param(reqObj);
                }
                this.turning();
            }else{
                this.ajaxRequest();
                this.isRedirect = false; 
            }          
        },

        showHead :function () {
            //head
            this.headerview.set({
                title: this.sTitle,
                back: true,
                view: this,
                tel: { number: 56973144 },
                home: true,
                events: {
                    returnHandler: function () {
                        this.back('rent');
                    },
                    homeHandler: function () {
                        this.jump('/html5/');
                    }
                }
            });

            // 将HeaderView显示出来
            this.headerview.show();
        },

        ajaxRequest: function () {   //请求数据
            var self = this;

            if(!_.isEmpty(this.request.query)){
                var reqObj = this.request.fullhash.replace(/#[^\?]*\?/, ''); 
                this.productList.setParamStore($.deparam(reqObj))   //设置请求参数
            } else {
                var cachedParam = this.productListParamStore.get();
                window.location.hash += '?' + $.param(cachedParam );
            }
            this.productList.excute(function (data) {

                var list = data.cars;

                //处理模板数据
                _.each(list, function (n) {		//处理获取的数据
                    n.showText = '';

                    n.cap = n.cap && n.cap.replace(/人$/, '');

                    n.scourseSlen = (n.scourse + (n.slen && n.scourse ? '，' : '') + n.slen).replace(/<\/br>|<br>/g, '');
                    n.aarea = n.aarea.split('</br>')[0];
                    n.darea = n.darea.split('</br>')[0];

                    n.issvr = data.issvr;
                    n.rmtype = data.rmtype;
                    n.showText = n.aarea || n.scourseSlen;

                })

                self.cid = data.cid;
                self.sTitle = '选择服务';

                //加载list模板
                self.appendList(list, '没有找到符合条件的结果，</br>请修改条件重新查询');

                //处理图片加载失败
                var el = self.$el.find('.carimg img');
                //延迟加载图片
                lazyload.lazyload(el);

            }, function (e) {                
                self.showWarning404(function () {
                    self.hideWarning404();
                    self.onLoad();
                });
                self.appendList([], '加载失败，请重试'); //使用空数组，触发ListView的错误提示
                self.$el.find('p.js_feeInfo').hide();
                self.$el.find('p.js_feeInfo').html('')
                self.hideLoading();
            }, false, this, function () {

            });            
        },

        appendList: function (list, errText) {
            this.listadapter = new ListAdapter({ data: list });
            //aarea 接机  darea 送机  issvr true=服务 接送优先  false=车型 里程优先
            var template = '<li data-pid="<%= pid %>"><div class="carimg cui-item-img"><img src="<%= pimg %>" /></div>' +
                            '<hgroup><h4 class="ellips"> <%= issvr ? pname : ptag + "车型" %></h4>' +
                            '<h5 class="ellips"><span><dfn>&yen;</dfn><%=price + (rmtype == 2 ? "/人" : "起") %></span><div class="ellips"><%=issvr ? cap && "可坐" + cap + "人" : pname %></div></h5>' +
                            '<h5 class="ellips js_text"><%= showText %><i class="js_space"></i></h5>' +
                            '</hgroup></li>';

            var self = this;
            var showdata = {
                //workspace: this.$el.find('section .cs_carmodels'),
                container: '.cs_carmodels',
                listadapter: this.listadapter,
                itemView: template,
                bindItemViewEvent: function ($el) {		//事件处理

                    $el.on('click', function (e) {		//列表单项点击
                        if ($(e.target).hasClass('cblue_a')) {
                            return;
                        }

                        var getPa = self.productListParamStore.get();
                        getPa.cid = self.cid;
                        getPa.pid = $(e.currentTarget).data('pid');

                        var pUrl = 'booking?' + $.param(getPa)
                        self.isRedirect = true;
                        self.forward(pUrl);

                    });


                },
                origin: { cBase: c.base },
                onUpdatePrepared: function () {
                    this.noResultText = errText;    //加载失败的提示
                },
                onUpdateFinished: function () {
                    self.hideLoading();
                }
            }

            // 注入ListView
            this.injectListView(showdata);

            this.listview.show()

            this.showHead();           

            this.turning();
        },
        onShow: function () {

            if (this.refer === 'booking') {
                this.restoreScrollPos();    //记录位置
            }
        },

        onHide: function () {
            //this.showNoHeadWarning()
            this.hideLoading();
            this.hideWarning404();
        }

    });

    return View;

});
