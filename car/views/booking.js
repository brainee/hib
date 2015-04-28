// ------------------------------
// 订单填写
// 这个页面本来要根据海内海外，拼车包车／日租时租以及租车模式（接机/送机/日租时租)动态的显示输入和显示元素，所以结构略显负责，为了
// demo目的，暂时去掉了除日租时租以外其他的模式判断。
// ------------------------------

define(['libs', 'cBase', 'c', 'cUtility', 'CommonStore', 'CarModel', 'CarStore', 'cBasePageView', 'cLazyload', buildViewTemplatesPath('booking.html'), 'cWidgetFactory', 'cWidgetGuider', 'cWidgetMember'],
  function (libs, cBase, c, cUtility, cs, CarModel, CarStore, BasePageView, lazyload, viewhtml, WidgetFactory) {

      var carBookingParamsStore = CarStore.BookingParamStore.getInstance(),        
        carBookingDetailsModel = CarModel.ProductDetailModel.getInstance(),
        carProductDetialParamStore = CarStore.ProductDetailParamStore.getInstance(),
        userStore = cs.UserStore.getInstance(),
        addressStore = CarStore.AddressStore.getInstance(),
        salesStore = cs.SalesObjectStore.getInstance(),
        unionStore = cs.UnionStore.getInstance(),
        productDetailsStore = CarStore.ProductDetailStore.getInstance(),
        productListStore = CarStore.ProductListStore.getInstance(),
        headParamObj = cs.HeadStore.getInstance();
        //TaxiAddressStore = TaxiStore.AddressStore.getInstance();

      var Guider = WidgetFactory.create('Guider');
      var Member = WidgetFactory.create('Member');
      var cDate = c.base.Date;
      var backAlert;

      var View = BasePageView.extend({

          pageid: '',

          ENTRANCES: {
              PICKUP: 2,   //接机
              SEEOFF: 4,   //送机
              RENT: 1,     //日租/时租
              HOTROUTE: 8  //热门线路
          },
          // rent :1, pool: 2
          // international : 4 ; doemsntic  8;
          COUNTRY: {
              DOMESTIC: 1,   //  国内
              INTERNATIONAL: 2  // 国外
          },

          TYPE: {
              RENT: 1,    // 包车
              DAY: 1,     // 日租
              HOUR: 2,    // 时租
              POOL: 2     // 拼车
          },

          isReqErr: false,

          render: function () {
              this.$el.html(viewhtml);

              this.viewdata.req = this.request;

              // 记录包含模板的元素
              this.els = {
                  booking: this.$el.find('#bookingSection'),
                  booking_tpl: this.$el.find('#booking_tpl')
              };

              this.elHTML = _.template(this.els.booking_tpl.html());              
          },

          /**
           * 显示所有的输入元素（比如联系人，手机，送达到达地点等）
           */
          showInputElements: function () {
              var requiredFields = this.config.input.required,
                  optionalFields = this.config.input.optional;

              var requiredContainer = this.$el.find('#requiredFieldsSection'),
                  optionalContainer = this.$el.find('#optionalFieldsSection');

              this.patchAdd(requiredContainer, requiredFields);
              this.patchAdd(optionalContainer, optionalFields);

              // 填充缓存的数据
              var nodesToRecover = ['contactName', 'mobileNumber', 'flightNumber'];
              for (var i = 0; i < nodesToRecover.length; i++) {
                  var input = this.lazyFindNodeById(nodesToRecover[i]).find('input');
                  var key = input.data('hash');
                  input.val(this.data[key]);
              }

              // 重置数量控制控件
              var countNode = this.lazyFindNodeById('carCount');
              if (!countNode.length) {
                  countNode = this.lazyFindNodeById('personCount');
              }

              var valueNode = countNode.find('.hours'),
              plusNode = countNode.find('.plus-i'),
              minusNode = countNode.find('.deduct-i');

              valueNode.text(this.data.useCount);

              if (this.data.useCount == 1) {
                  minusNode.addClass('num_invalid');
                  plusNode.removeClass('num_invalid');
              } else if (this.data.useCount > 1 && this.data.useCount < 10) {
                  minusNode.removeClass('num_invalid');
                  plusNode.removeClass('num_invalid');
              } else if (this.data.useCount == 10) {
                  minusNode.removeClass('num_invalid');
                  plusNode.addClass('num_invalid');
              }

              this.data.oinfo = this.data.oinfo || {};

              // 显示送达地点
              var des = this.lazyFindNodeById('destination');
              if (des.length) {
                  var desInput = des.find('em');
                  var offareaKey = desInput.data('hash');
                  var addrObj = carBookingParamsStore.getAttr(offareaKey);
                  var desStr = "";

                  if (_.isObject(addrObj)) {
                      desStr = addrObj.addr;
                  } else {
                      desStr = addrObj;
                  }

                  if (desStr && desStr.trim() != '') {
                      desInput.removeClass('cgray');
                      desInput.text(desStr);
                      if (_.isObject(addrObj)) {
                          this.data.oinfo.offarea = addrObj.prvnName + addrObj.ctyName + addrObj.dstrName + addrObj.addr;
                      } else {
                          this.data.oinfo.offarea = addrObj;
                      }
                  } else {
                      // 显示默认的背景文案
                      desInput.addClass('cgray');
                      desInput.text(desInput.data('placeholder'));
                  }
              }

              // 显示出发地点
              var ori = this.lazyFindNodeById('origin');
              if (ori.length) {
                  var oriInput = ori.find('em');
                  var onareaKey = oriInput.data('hash');
                  var addrObj = carBookingParamsStore.getAttr(onareaKey);
                  var oriStr = "";

                  if (_.isObject(addrObj)) {
                      oriStr = addrObj.addr;
                  } else {
                      oriStr = addrObj;
                  }

                  if (oriStr && oriStr.trim() != '') {
                      oriInput.removeClass('cgray');
                      oriInput.text(oriStr);
                      if (_.isObject(addrObj)) {
                          this.data.oinfo.onarea = addrObj.prvnName + addrObj.ctyName + addrObj.dstrName + addrObj.addr;
                      } else {
                          this.data.oinfo.onarea = addrObj;
                      }

                  } else {
                      // 显示默认的背景文案
                      oriInput.addClass('cgray');
                      oriInput.text(oriInput.data('placeholder'));
                  }

              }

              // 如果有发票，显示需要
              var invNode = this.lazyFindNodeById('needinv');
              var invStr = this.data.needinv ? '需要' : '不需要';
              invNode.text(invStr);                

              this.lazyFindNodeById('invoice').css('display', 'none');

              // 更具业务不同显示不同的备注信息
              var placeholderStr = '';
              switch (this.data.productParams.drvtype) { 
                  case this.ENTRANCES.RENT:
                      placeholderStr = '选填，如大致行程等';
                      break;

              }

              var bookPSNode = this.lazyFindNodeById('bookPS').find('input');
              bookPSNode.attr('placeholder', placeholderStr);

              // 有备注显示备注
              this.data.desc = this.data.desc || '';
              bookPSNode.val(this.data.desc);

              // 隐藏航班号输入如果是按航班号查询              
              var flightNode = this.lazyFindNodeById('flightNumber');
              if (this.data.productParams.drvtype == this.ENTRANCES.PICKUP
                       && this.data.productParams.stype == 1) {
                  if (this.referrer != 'booking' && this.data.productParams.flginfo && this.data.productParams.flginfo.flgno) {
                      carBookingParamsStore.setAttr('flgtrainno', this.data.productParams.flginfo.flgno);
                      this.data.flgtrainno = this.data.productParams.flginfo.flgno;
                      flightNode.find('input').val(this.data.flgtrainno);
                  }
                  flightNode.css('display', 'block');
              } else {
                  flightNode.css('display', 'none');
              }             
          },

          /**
           * 为了移动端操作dom的效率，需要用到framgement
           */
          patchAdd: function (root, ids) {
              var fragment = document.createDocumentFragment();

              for (var i = 0; i < ids.length; i++) {
                  var node = this.inputFields[ids[i]];
                  fragment.appendChild(node.get(0));
              }

              root.get(0).appendChild(fragment);
          },

          /**
          * 根据路径取得子对象的值
          * @param {object} data 取值对象
          * @param {array} path 取值路径
          */
          findValueByPath: function (data, keyArr) {
              if (!_.isObject(data)) {
                  return data;
              }

              if (!_.isArray(keyArr)) {
                  return data[keyArr];
              }

              var currentKey = keyArr.shift();
              return this.findValueByPath(data[currentKey], keyArr);
          },

          showDisplayElements: function () {
              // 隐藏所有的需要控制的element
              var arr = ['seeOffPlace', 'carType', 'maxAccomondation', 'pickupPlace',
              'bookTime', 'pickupAreaCovered', 'rentPeriod', 'hotRoute',
              'feeSummary', 'destinationAreaCovered', 'feeDistance', 'feePeriod'];

              for (var i = 0; i < arr.length; i++) {
                  $(this.lazyFindNodeById(arr[i])).css('display', 'none');
              }

              // 根据需要显示所需的element
              for (var i = 0; i < this.config.output.length; i++) {
                  $(this.lazyFindNodeById(this.config.output[i])).css('display', 'block');
              }

              // 如果有航班号则显示航班号码
              var bookTimeNode = this.lazyFindNodeById('bookTime');

              //按航班号接机才会在这里显示航班号
              if (this.data.productParams.drvtype == this.ENTRANCES.PICKUP && this.data.productParams.stype == 2 && this.data.productParams.flginfo && this.data.productParams.flginfo.flgno && this.data.pd.usedate) {
                  var useTimeStr = cBase.Date.parse(this.data.pd.usedates).format('m月d日') + ' ' + this.data.productParams.flginfo.flgno;
                  bookTimeNode.html('<label>航班号</label>' + useTimeStr);
              }

              // 图片显示处理
              var pimg = this.lazyFindNodeById('pimg');
              lazyload.lazyload(pimg);              

              // 如果用户登录了，不显示登录提示信息
              if (!(userStore.isLogin())) {
                  var loginNote = this.lazyFindNodeById('notLoginNote');
                  loginNote.css('display', 'block');
              }

              // 隐藏数据为空的字段
              for (var i = 0; i < arr.length; i++) {
                  var node = this.lazyFindNodeById(arr[i]);
                  if (node.length) {
                      var keyArr = node.data('hash').split('.');
                      var val = this.findValueByPath(this.data, keyArr);

                      if (!val || (val && (val.toString().trim() == ''))) {
                          node.css('display', 'none');
                      }
                  }
              }

              // 隐藏更多详细信息如果没有获得字段
              if (!this.data.moreDetails.length) {
                  this.lazyFindNodeById('feeMoreInfo').css('display', 'none');
              }
          },

          /**
           * 为了移动端的性能，需要缓存已经找到的元素 
           */
          lazyFindNodeById: function (nodeName) {
              this.allEls[nodeName] = this.allEls[nodeName] || this.$el.find('#' + nodeName);
              return $(this.allEls[nodeName]);
          },

          inputLenCtrlFn: function (e) {
              this.context.modified = true;

              var input = $(e.target);
              var validateFn = c.utility.validate[input.data('validator')];
              var value = input.val();

              if (validateFn && !validateFn.call(this.matched, value)) {
                  input.val(value.substr(0, this.matched.cutLen));
              }
          },

          inputKeypressNonDigitReplaceFn: function (e) {
              this.modified = true;

              var input = $(e.target);
              var value = input.val().trim();

              if (!/^(\d| )+$/g.test(value)) {
                  var str = input.val().replace(/[^ |^\d]+/g, '');
                  input.val(str);
              }
          },

          onInputChange: function (e) {
              var input = $(e.target);
              var key = input.data('hash');
              var trimmedVal = input.val().trim();

              this.modified = true;

              this.data[input.data('hash')] = trimmedVal;
              carBookingParamsStore.setAttr(key, trimmedVal);
          },

          flightInputCtrlFn: function (e) {
              var dom = e.currentTarget, self = this;
              var kds = dom.value.split('');
              kds.forEach(function (v, i) {
                  kds[i] = v.charCodeAt(0);
              });
              if (dom.value.match(/[^0-9a-z]/i) && kds.indexOf(8198) === -1) {
                  setTimeout(function () {
                      dom.value = dom.value.replace(/[^0-9a-z]/img, ' ');
                      setTimeout(function () {
                          if (dom.value.match(/ /)) {
                              dom.value = dom.value.replace(/ /mg, '');
                          }
                      }, 10);
                  }, 500)
              }
              dom.focus();
          },

          bind: function () {
              // 手机输入限制
              var mobileInput = this.lazyFindNodeById('mobileNumber').find('input');
              mobileInput.off('input', this.inputKeypressNonDigitReplaceFn);
              mobileInput.on('input', $.proxy(this.inputKeypressNonDigitReplaceFn, this));

              // 航班号输入限制
              var flightNumberNode = this.lazyFindNodeById('flightNumber').find('input');
              flightNumberNode.off('input', this.flightInputCtrlFn);
              flightNumberNode.on('input', $.proxy(this.flightInputCtrlFn, this));

              // 更多内容事件绑定
              var moreInfoNode = this.lazyFindNodeById('feeMoreInfo');
              var expandedIcon = this.lazyFindNodeById('feeMoreInfoExpandIcon');
              var moreInfoDiv = this.lazyFindNodeById('feeMoreInfoContent');

              moreInfoNode.off('click');
              moreInfoNode.on('click', function () {
                  if (moreInfoDiv.css('display') == 'block') {
                      moreInfoDiv.css('display', 'none');
                      expandedIcon.removeClass('cmore_bottom');
                      expandedIcon.addClass('cmore_top')
                  } else {
                      moreInfoDiv.css('display', 'block');
                      expandedIcon.removeClass('cmore_top');
                      expandedIcon.addClass('cmore_bottom');
                  }

              });

              // 联系人需要用到clear的控件
              var contactNameNode = this.lazyFindNodeById('contactName');
              if (!contactNameNode.find('.clear-input-box').length) {
                  c.ui.InputClear(contactNameNode.find('input'));
              }

              // 航班号需要clear的控件
              var contactNameNode = this.lazyFindNodeById('flightNumber');
              if (!contactNameNode.find('.clear-input-box').length) {
                  c.ui.InputClear(contactNameNode.find('input'));
              }

              // 手机需要用到clear的控件
              var mobileNumberNode = this.lazyFindNodeById('mobileNumber');
              if (!mobileNumberNode.find('.clear-input-box').length) {
                  c.ui.InputClear(mobileNumberNode.find('input'));
              }

              // 手机需要用到clear的控件
              var bookPSNode = this.lazyFindNodeById('bookPS');
              if (!bookPSNode.find('.clear-input-box').length) {
                  c.ui.InputClear(bookPSNode.find('input'));
              }

              // 用车人数/使用车数控件事件绑定
              var countNode = this.lazyFindNodeById('carCount');
              if (!countNode.length) {
                  countNode = this.lazyFindNodeById('personCount');
              }
              var self = this;
              var max = Math.min(this.data.useMaxCount || 10, 10);

              countNode.off('click', this.onChangeCount);
              countNode.on('click', $.proxy(this.onChangeCount, { context: this, max: max }));

              // 绑定预订须知
              var psLinkNode = this.lazyFindNodeById('psLink');
              psLinkNode.off('click');
              psLinkNode.on('click', $.proxy(function (e) { this.forward('bookingnote'); }, this));

              // 手机，航班号记忆上一次非空格输入
              var nodesToRemember = ['contactName', 'mobileNumber', 'flightNumber', 'bookPS'];
              for (var i = 0; i < nodesToRemember.length; i++) {
                  var input = this.lazyFindNodeById(nodesToRemember[i]).find('input');
                  input.off('input', this.onInputChange);
                  input.on('input', $.proxy(this.onInputChange, this));
              }
          },

          onChangeCount: function (e) {
              var self = this.context;
              var max = this.max;

              self.modified = true;

              var valueNode = $(e.currentTarget).find('.hours'),
              plusNode = $(e.currentTarget).find('.plus-i'),
              minusNode = $(e.currentTarget).find('.deduct-i');

              var isPlus = $(e.target).hasClass('plus-time') || $(e.target).hasClass('plus-i');
              var isDeduct = $(e.target).hasClass('deduct-time') || $(e.target).hasClass('deduct-i');

              if (isPlus) {
                  if (++self.data.useCount <= max) {
                      valueNode.text(self.data.useCount);
                      minusNode.removeClass('num_invalid');
                      self.lazyFindNodeById('totalPrice').text(self.data.useCount * self.data.pd.pinfo.price);
                  }

                  if (self.data.useCount >= max) {
                      plusNode.addClass('num_invalid');
                      self.data.useCount = max;
                  }
              }
              else if (isDeduct) {
                  if (--self.data.useCount > 0) {
                      valueNode.text(self.data.useCount);
                      plusNode.removeClass('num_invalid');
                      self.lazyFindNodeById('totalPrice').text(self.data.useCount * self.data.pd.pinfo.price);
                  }

                  if (self.data.useCount <= 1) {
                      minusNode.addClass('num_invalid');
                      self.data.useCount = 1;
                  }
              }

              carBookingParamsStore.setAttr('useCount', self.data.useCount);
          },

          findElementsById: function (elsArr) {
              var els = {};
              for (var i = 0; i < elsArr.length; i++) {
                  els[elsArr[i]] = this.$el.find('#' + elsArr[i]);
              }

              return els;
          },

          // 请求缓存的订单填写信息
          loadCachedBookingDetails: function () {
              var data = carBookingParamsStore.get();
              if (data) {
                  for (key in data) {
                      this.data[key] = data[key];
                  }
              }
          },

          events: {
              'click .anchor': 'goTo'
          },

          goBack: function () {
              this.onBack();
          },

          errorStrings: {
              "carCount": { incorrect: "您所选车型库存数量不足请重新选择" },
              "useTime": { incorrect: " 您的用车时间早于可接受的预订时间请调整用车时间" },
              "contactName": { missing: "请填写联系人" },
              "mobileNumber": { missing: "请填写手机", incorrect: "手机号填写不正确" },
              "flightNumber": { incorrect: "航班号/车次号填写不正确" },
              "destination": { missing: "请填写送达地点" },
              "origin": { missing: "请填写出发地点" },
              "bookTime": {
                  earlier: "您的用车时间早于可接受的预订时间\n请调整用车时间",
                  later: "您的用车时间晚于可接受的预订时间\n请调整用车时间"
              }
          },

          /**
           * 当有输入验证错误的时候，高亮含有错误输入的输入框
           */
          highlightErrors: function (errorNodes) {
              for (var nodeName in errorNodes) {
                  var nodeContainer = this.lazyFindNodeById(nodeName);
                  nodeContainer.addClass('cui-input-error');
              }
          },

          removeErrorHighlight: function () {
              this.$el.find('#requiredFieldsSection .cui-input-error').each(function (index, node) {
                  $(node).removeClass('cui-input-error');
              });

              this.$el.find('#optionalFieldsSection .cui-input-error').each(function (index, node) {
                  $(node).removeClass('cui-input-error');
              });
          },

          /**
           * 显示第一个验证错误输入框的错误信息。
           */
          showErrorToast: function (errorNodes) {
              for (var nodeName in errorNodes) {
                  var errorType = errorNodes[nodeName];

                  this.showToast(this.errorStrings[nodeName][errorType], 2);
                  var node = this.lazyFindNodeById(nodeName).find('input');
                  node.length && node.focus();
                  break;
              }
          },

          /**
           * 点击“下一步”触发           
           */
          pay: function () {
              var errorNodes = this.validate();

              if (c.utility.validate.isEmptyObject(errorNodes)) {
                  this.submitOrder();
              } else {

                  this.showErrorToast(errorNodes);
                  this.highlightErrors(errorNodes);

                  var errNodeCount = 0;
                  for (var k in errorNodes) {
                      var input = this.lazyFindNodeById(k).find('input');
                      if (input.length && errNodeCount == 0) {
                          input.focus();
                          break;
                      }

                      errNodeCount++;
                  }
              }

          },

          /**
           * 对所有的输入框根据业务需求做验证
           */
          validate: function () {

              this.removeErrorHighlight();
              
              var errorNodes = {};
              var requiredFields = this.config.input.required,
             optionalFields = this.config.input.optional;

              for (var i = 0; i < requiredFields.length; i++) {
                  var requiredInputContainer = this.lazyFindNodeById(requiredFields[i]);
                  var requiredInput = requiredInputContainer.find('input');

                  // 可能不是input输入框而是em做的选填框
                  if (!requiredInput.length) {
                      var ric = requiredInputContainer.find('em');
                      if (ric.data('type') == 'input') {
                          requiredInput = ric;
                      }
                  }

                  if (requiredInput.length) {
                      var requiredValidateFn = c.utility.validate[requiredInput.data('validator')];
                      var requiredFieldName = requiredFields[i];
                      var requiredKeyArr = requiredInput.data('hash').split('.');
                      var requiredValue = this.findValueByPath(this.data, requiredKeyArr);

                      if (!requiredValue || requiredValue == '') {
                          errorNodes[requiredFieldName] = "missing";
                      } else if (requiredValidateFn && !requiredValidateFn(requiredValue)) {
                          errorNodes[requiredFieldName] = "incorrect";
                      }
                  }
              }

              for (var i = 0; i < optionalFields.length; i++) {
                  var optionalInputContainer = this.lazyFindNodeById(optionalFields[i])
                  var optionalInput = optionalInputContainer.find('input') || optionalInputContainer.find('em').hash('type') == 'input';

                  if (optionalInput.length) {
                      var optionalValidateFn = c.utility.validate[optionalInput.data('validator')];
                      var optionalFieldName = optionalFields[i];
                      var optionalKeyArr = optionalInput.data('hash').split('.');

                      var optionalValue = this.findValueByPath(this.data, optionalKeyArr);

                      if (optionalValue && (optionalValue != '' && (optionalValidateFn && !optionalValidateFn(optionalValue)))) {
                          errorNodes[optionalFieldName] = "incorrect";
                      }
                  }
              }

              return errorNodes;
          },

          /**
           * 当所有的输入框都被验证以后，创建需要提交的订单信息。
           */
          submitOrder: function () {     
              var self = this;
              var order = {};

              order.stype = this.data.productParams.stathotinfo.stattype;  // 机场车站类型              
              order.stathotid = this.data.productParams.stathotinfo.statid;
              order.IsNonUser = !userStore.isLogin(); // 是否非会员预订，true：是 (客户端判断：用户未登录或用户登录标识IsNonUser==false视为非会员预订)

              var bookPSNode = this.lazyFindNodeById('bookPS').find('input');
              var bookPSVal = bookPSNode.val();
              order.desc = this.DBC2SBC(bookPSNode.val());

              //提交订单时候，需要加auth头  slh
              order.auth = userStore.isLogin() ? headParamObj.get().auth : "";

              var sales = salesStore.get();
              order.dc = sales && sales.sales;
              order.sourceId = sales && sales.sid;
              order.sf = sales && sales.value;

              // 分销联盟标识
              var union = unionStore.get();
              if (union) {
                  for (var key in union) {
                      order[key] = union[key];
                  }
              }

              order.OrderInfo = {
                  pid: this.data.pd.pinfo.pid, // 产品id
                  cname: this.data.productParams.stathotinfo.cityname, //用车城市
                  cid: this.data.dcid, //用车城市id
                  drvtype: this.data.productParams.drvtype, // 租车类型
                  rmtype: this.data.productParams.rmtype,  //类型
                  usedate: this.data.productParams.usedt, // 用车时间
                  usedur: this.data.productParams.usedur, // 用车时长
                  usecount: this.data.useCount, // 用车数量
                  price: this.lazyFindNodeById('totalPrice').text(), // 价格                  
                  flgtrainno: this.data.productParams.drvtype == this.ENTRANCES.PICKUP ? this.DBC2SBC(this.data.productParams.flginfo.flgno || this.data.flgtrainno) : '', // 航班号或车次号 (只有接机)                  
                  ispla: this.data.ispla || false, // 是否需要接机牌
                  ccy: "RMB"
              };             

              //添加上车地址，下车地址
              order.OrderInfo.onarea = (this.data.oinfo && this.data.oinfo.onarea) || '';
              order.OrderInfo.offarea = (this.data.oinfo && this.data.oinfo.offarea) || '';

              // 添加接机牌
              order.OrderInfo.palctnt = (this.data.ispla && this.DBC2SBC(this.data.palctnt)) || '';

              order.InvoiceInfo = {
                  IsNeedInvoice: this.data.needinv || false, // 是否需要发票 false 不需要
                  Title: this.data.needinv && this.DBC2SBC(this.data.invinfo.title), // 发票抬头
                  Detail: this.data.needinv && this.data.invinfo.detail, // 明细
                  CityName: this.data.needinv && (this.data.invinfo.addr.ctyName || this.data.invinfo.addr.prvnName), // 城市名称
                  PostCode: this.data.needinv && this.data.invinfo.addr.zip, // 邮编
                  Address: this.data.needinv && (this.data.invinfo.addr.prvnName + this.data.invinfo.addr.ctyName + this.data.invinfo.addr.dstrName + this.data.invinfo.addr.addr)// 邮寄地址
              };

              order.cinfo = {
                  name: this.DBC2SBC(this.data.ctact), // 联系人名称
                  phone: this.DBC2SBC(this.data.ph) // 联系人电话
              };
              order.dinfo = {
                  daddr: {
                      addr: "",
                      aid: "",
                      cid: "",
                      ssite: ""
                  },
                  dtype: "64",    //配送方式  写死  平邮
                  saddr: {
                      "addr": "",
                      "cname": "",
                      "mob": "",
                      "pcode": "",
                      "pname": "",
                      "rec": "",
                      "zname": ""
                  },
                  sfee: 0  // 配送费  传0
              };              

              order.isinapp = cUtility.isInApp() ? 1 : 0;              

              Guider.apply({
                  hybridCallback: function () {
                      self.showLoading();
                      var _userinfo = userStore.getUser();
                      if (_userinfo && _userinfo.Auth) {
                          self.requestSubmit(order);
                      } else {
                          Guider.apply({
                              callback: function () {
                                  self.nonMemberLogin(order);
                              },
                              hybridCallback: function () {
                                  // 在app里面，如果没有发现登录则尝试调用
                                  // app的自动登录，如果还是处于登录状态则
                                  // 调用非会员登陆接口。
                                  Member.autoLogin({
                                      callback: function (param) {
                                          if (param) {
                                              self.requestSubmit(order);
                                              return;
                                          }
                                          self.nonMemberLogin(order);
                                      }
                                  });
                              }
                          });
                      }
                  },
                  callback: function () {
                      self.showLoading();
                      self.requestSubmit(order);
                  }
              });
          },

          /**
           * 非会员登录 
           */
          nonMemberLogin: function (order) {
              var self = this;
              Member.nonMemberLogin({
                  callback: function (param) {
                      if (param && typeof param === 'string') {
                          param = JSON.parse(param);
                      };

                      if (param && param.data) {
                          userStore.setUser(param.data);
                          self.requestSubmit(order);
                      } else if (param && param.UserID) {
                          userStore.setUser({ UserID: param.UserID, IsNonUser: true });
                          self.requestSubmit(order);
                      } else {
                          self.hideLoading();
                      }
                  }
              });
          },

          /**
           * 提交订单给服务端
           */
          requestSubmit: function (order) {
              var self = this,
              url = this.getServerUrl();

              // 为了应对App的非会员登陆
              var _userstore = cs.UserStore.getInstance();
              var _userinfo = _userstore.getUser();
              if (_userinfo && _userinfo.Auth) {
                  order.auth = _userinfo.Auth;
              }

              alert("成功提交订单");  
              this.hideLoading();           
          },

          /**
           * 过滤ios里面的全角输入
           */
          DBC2SBC: function (str) {
              if (!str) return '';

              var result = '';
              for (i = 0; i < str.length; i++) {
                  code = str.charCodeAt(i); //获取当前字符的unicode编码
                  if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已及各种字符
                  {
                      result += String.fromCharCode(str.charCodeAt(i) - 65248); //把全角字符的unicode编码转换为对应半角字符的unicode码
                  } else if (code == 12288)//空格
                  {
                      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
                  } else if (code == 8198) {
                      // 忽略ios中文输入英文时的全角
                  }
                  else {
                      result += str.charAt(i);
                  }
              }
              return result;
          },

          /**
           * 按钮点击dispatcher
           */
          goTo: function (e) {
              switch ($(e.currentTarget).data('eventsource')) {
                  case 'invoice':
                      // 写入总共花费价钱
                      var price = parseInt(this.lazyFindNodeById('totalPrice').text());
                      carBookingParamsStore.setAttr('price', price);
                      this.forward('receipt');
                      break;

                  case 'nameBoard':
                      this.forward('board');
                      break;

                  case 'pay':
                      this.pay();
                      break;

                  case 'destination':
                     // TaxiAddressStore.setCurrent({ title: '送达地点', field: 'oinfo.offarea', notastrict: true, isInternational: parseInt(this.data.productParams.citytype) > 1}, 'booking', 'CarStore::BookingParamStore:setAddr', 'CarStore::BookingParamStore:setDisplayValue');
                      this.forward('taxisentaddress');
                      break;

                  case 'origin':
                     // TaxiAddressStore.setCurrent({ title: '出发地点', field: 'oinfo.onarea', notastrict: true, isInternational: parseInt(this.data.productParams.citytype) > 1 }, 'booking', 'CarStore::BookingParamStore:setAddr', 'CarStore::BookingParamStore:setDisplayValue');
                      this.forward('taxisentaddress');
                      break;
              }
          },

          /**
           * 配置页面类型（接机/送机/日租时租)
           */
          pageConfigs: {
              // 日租/时租
              hoursRent: {
                  domestic: {
                      rent: {
                          // 车型、用车时间、用车时长、可坐人数
                          // 费用包含、服务里程、服务时长
                          output: ['carType', 'bookTime', 'rentPeriod', 'maxAccomondation',
          'feeSummary', 'feeDistance', 'feePeriod'],
                          input: {
                              // 用车数量、联系人、手机、出发地点
                              required: ['carCount', 'origin', 'contactName', 'mobileNumber'],
                              // 发票、备注
                              optional: ['invoice', 'bookPS']
                          }
                      }
                  },

                  international: {
                      rent: {
                          // 用车时间、用车时长、可坐人数
                          // 费用包含、服务里程、服务时长、更多详细信息
                          output: ['bookTime', 'rentPeriod', 'maxAccomondation',
             'feeSummary', 'feeDistance', 'feePeriod'],
                          input: {
                              // 用车数量、联系人、手机、出发地点
                              required: ['carCount', 'origin', 'contactName', 'mobileNumber'],
                              // 发票、备注
                              optional: ['invoice', 'bookPS']
                          }
                      }
                  }
              }
          },

          /**
           * 需要拼写价格
           */
          concatUnitPrice: function () {
              this.data.unitPrice = this.data.productParams.rmtype == this.TYPE.RENT ?
              this.data.pd.pinfo.price + '起</em>' :
              this.data.pd.pinfo.price + '/人</em>';
          },

          getConfig: function (entrance, country, type) {

              switch (entrance) {
                  
                  // 日租时租                              
                  case this.ENTRANCES.RENT:
                      switch (country) {
                          case this.COUNTRY.DOMESTIC:
                              switch (type) {
                                  case this.TYPE.RENT:
                                      return this.pageConfigs.hoursRent.domestic.rent;
                                      break;
                              }
                              break;

                          case this.COUNTRY.INTERNATIONAL:
                              switch (type) {
                                  case this.TYPE.RENT:
                                      return this.pageConfigs.hoursRent.international.rent;
                                      break;
                              }
                              break;
                      }
                      break;                 
              }
          },

          concatFeeInfo: function () {
              var feeIncluded = [];
              var feeNotIncluded = [];
              var feeStrArr = [];
              var feeinfo = this.data.pd.addinfos;

              for (var o in feeinfo) {

                  var feeTitle = feeinfo[o].title, feeInfo = feeinfo[o].descs[0].desc;
                  if (feeInfo && feeInfo.length) {

                      feeInfo = feeInfo.replace(/。$/, '');

                      if (feeTitle == "费用包含") {
                          feeStrArr.push(feeTitle + feeInfo + "。");
                      }
                      else if (feeTitle == "费用不包含") {
                          feeStrArr.push(feeTitle + feeInfo + "。");
                      }
                  }
              }

              this.data.feeInfo = feeStrArr.join('');
          },              

          /**
           * 获取详细产品信息
           */
          requestProductDetails: function (showPgaeFn) {
              // set product detials params              
              carProductDetialParamStore.setAttr('dcid', this.data.dcid);
              carProductDetialParamStore.setAttr('pid', this.data.productParams.pid);
              carProductDetialParamStore.setAttr('usedate', this.data.productParams.usedt);
              carProductDetialParamStore.setAttr('usedur', this.data.productParams.usedur);
              carProductDetialParamStore.setAttr('ver', '0');

              // carProductDetialParamStore
              carBookingDetailsModel.excute(
                  function (data) {
                    if (!data || !data.pinfo) {
                        this.showToast('加载失败，请稍后再试', 2);
                    } else {
                      this.data.pd = data;
                      
                      // use date parsing
                      var usedate = this.data.pd.usedate;
                      this.data.pd.usedates = usedate;
                      this.data.pd.usedate = usedate && cBase.Date.parse(usedate).format('m月d日 H:i');
                      if (usedate.indexOf('00:00:00') > -1) {
                          this.data.pd.usedatet = usedate && cBase.Date.parse(usedate).format('m月d日');
                      } else {
                          this.data.pd.usedatet = this.data.pd.usedate;
                      }

                      // more details
                      this.data.moreDetails = [];
                      for (var i = 0; i < this.data.pd.addinfos.length; i++) {
                          var item = this.data.pd.addinfos[i];
                          if (item.title == '价格相关') {
                              this.data.moreDetails.push(item);
                          }
                      }                                        
                      
                      // unit price 需要拼接
                      this.concatUnitPrice();

                      // 拼接并且费用包含不包含需
                      this.concatFeeInfo();                    

                      showPgaeFn.call(this);
                    }

                    this.hideLoading();

                }, function (err) {
                    this.isReqErr = true;

                    this.hideLoading();

                    var self = this;
                    if (this.referrer == 'list') {
                        this.showToast('加载失败，请稍后再试', 2, function () {
                            self.back('list');
                        });
                    } else if (this.referrer == 'booking') {
                        this.injectHeaderView();
                        this.headerview.set(this.headerConfig);
                        this.headerview.show();
                        this.showWarning404(function () {
                            self.loadPage();
                        });
                    }
                }, false, this);
          },
         
          getQueryStringObj : function() {
              return $.deparam(window.location.hash.replace(/#[^\?]*\?/, '')); 
          },

          loadProductParams: function () {            
              if(!_.isEmpty(this.request.query)){
                  var urlObj = this.getQueryStringObj();
                  this.data.productParams = urlObj;  
              } else {
                  var cachedParam = carProductDetialParamStore.get();
                  window.location.hash += '?'  + $.params(cachedParam);
              }
              
              this.data.dcid = this.data.productParams.cid;

              var driveType = parseInt(this.data.productParams.drvtype) || 1;
              var coutryType = parseInt(this.data.productParams.citytype) > 1 ? 2 : 1;
              var productType = parseInt(this.data.productParams.rmtype) || 1;

              this.config = this.getConfig(driveType, coutryType, productType);
          },

          onCreate: function () {
              this.createInputFields();
              this.render();
          },

          createInputFields: function () {
              this.inputFields = this.inputFields || {};

              // 用车数量输入
              this.createInput('carCount', '<li class="pos_rel pnum"><p><label>用车数量</label><span class="room_num"><i class="deduct-i num_invalid">-</i><s class="click_area_l deduct-time"></s><span data-hash="usecount" data-type="input" class="hours">1</span><s class="click_area_r plus-time"></s><i class="plus-i">+</i></span></p></li>');

              // 用车人数输入
              this.createInput('personCount', '<li class="pos_rel pnum"><p><label>用车人数</label><span class="room_num"><i class="deduct-i num_invalid">-</i><s class="click_area_l deduct-time"></s><span data-hash="usecount" data-type="input" class="hours">1</span><s class="click_area_r plus-time"></s><i class="plus-i">+</i></span></p></li>');

              // 送达地点输入
              this.createInput('destination', '<li class="pos_rel"><p class="anchor" data-eventsource="destination"><label>送达地点</label><em data-hash="oinfo.offarea" data-type="input" class="cblues ellips txt" data-placeholder="请输入送达地点">请输入送达地点</em><i class="newarr_r"></i></p></li>');

              // 出发地点输入
              this.createInput('origin', '<li class="pos_rel"><p class="anchor" data-eventsource="origin"><label>出发地点</label><em data-hash="oinfo.onarea" data-type="input" class="cblues ellips txt" data-placeholder="请输入出发地点">请输入出发地点</em><i class="newarr_r"></i></p></li>');

              // 联系人输入
              this.createInput('contactName', '<li><p class="close_rvalue"><label>联系人</label><input data-hash="ctact" maxLength="13" class="txt" placeholder="请输入联系人"/></p></li>');

              // 手机号输入
              this.createInput('mobileNumber', '<li><p class="close_rvalue"><label>手机</label><input data-hash="ph" maxLength="11" data-validator="isMobileNumber" type="tel" class="txt" placeholder="请输入手机"/></p></li>');

              // 航班号输入
              this.createInput('flightNumber', '<li><p class="close_rvalue"><label class="label2">航班号/车次号</label><input maxlength="7" data-hash="flgtrainno" data-validator="isFlightNumber" type="text" class="txt" placeholder="选填"/></p></li>');

              // 发票输入
              this.createInput('invoice', '<li class="pos_rel"><p class="anchor" data-eventsource="invoice"><label>发票</label><em id="needinv" data-hash="needinv" data-type="input" class="cblues txt">不需要</em><i class="newarr_r"></i></p></li>');

              // 接机牌输入
              this.createInput('nameBoard', '<li class="pos_rel"><p class="anchor" data-eventsource="nameBoard"><label class="label2">接机牌/接车牌</label><em id="ispla" data-type="input" class="cblues txt" data-hash="ispla">不需要</em><i class="newarr_r"></i></p></li>');

              // 发票输入
              this.createInput('bookPS', '<li><p class="close_rvalue"><label class="label2">备注</label><input data-hash="desc" type="text" maxlength="50" class="txt" placeholder="选填，如送达地址等"/></p></li>');

          },

          createInput: function (id, html) {
              this.inputFields = this.inputFields || {};
              this.inputFields[id] = $(html).attr('id', id);
          },

          loadUser: function () {
              if (!this.uid) {
                  if (userStore.isLogin()) {
                      var user = userStore.getUser();
                      this.uid = user.UserID;
                  } else {
                      this.uid = c.utility.getGuid();
                  }
              }
          },

          resetBookingParams: function () {
              // 清除送达地址，出发地址和备注,需不需要发票和需不需要接机牌
              carBookingParamsStore.setAttr('oinfo.onarea', null);
              carBookingParamsStore.setAttr('oinfo.offarea', null);
              carBookingParamsStore.removeAttr('desc');
              carBookingParamsStore.removeAttr('useCount');
              carBookingParamsStore.removeAttr('needinv');
              carBookingParamsStore.removeAttr('ispla');
          },

          onLoad: function (referrer) {
              this.referrer = referrer || '';

              if (!userStore.getAuth()) {
                  var self = this;
                  Guider.apply({
                      callback: function () {
                          self.loadPage();
                      },
                      hybridCallback: function () {
                          Member.autoLogin({
                              callback: function (param) {
                                  self.loadPage();
                              }
                          });
                      }
                  });
              } else {
                  this.loadPage();
              }
          },

          loadPage: function () {
              var self = this;

              this.modified = false;

              if (this.referrer == 'list') {
                  // 如果是从列表页过来的，清除应该显示默认值的字段
                  this.resetBookingParams();
                  this.removeErrorHighlight();
              } else if (this.referrer.length && this.referrer != 'list') {
                  // 如果是从其他页面过来的，应该是booking的相关页，比如发票，接机牌页
                  this.modified = true;
              }

              this.allEls = {};
              this.data = {};

              this.loadProductParams();
              this.loadCachedBookingDetails();             

              this.headerConfig = {
                  title: '订单填写',
                  back: true,
                  view: self,
                  events: {
                      returnHandler: $.proxy(self.onBack, self)
                  }
              };

              if (!userStore.isLogin()) {
                  this.headerConfig.btn = { title: '登录', id: 'loginBtn', classname: 'header_r' };
                  this.headerConfig.commit = { id: 'loginBtn', callback: $.proxy(self.onLogin, self) };
              }

              this.showLoading();

              this.requestProductDetails(function () {
                  this.els.booking.html(this.elHTML(this.data));
                  this.showDisplayElements();
                  this.showInputElements();
                  this.bind();
                  this.hideLoading();

                  this.injectHeaderView();
                  this.headerview.set(this.headerConfig);
                  this.headerview.show();

                  this.turning();
              });
          },

          onBack: function () {
              document.activeElement.blur();

              var self = this;
              if (this.modified) {
                  if (typeof backAlert == 'undefined') {
                      backAlert = new c.ui.Alert({
                          title: '提示信息',
                          message: '您的订单还未完成，是否确定要离开当前页面？',
                          buttons: [
                            { text: '取消', click: function () { this.hide(); }, type: c.ui.Alert.STYLE_CANCEL },
                            {
                                text: '离开',
                                click: function () {
                                    this.hide();
                                    backUrl = "list";

                                    setTimeout(function () {
                                        self.removeErrorHighlight();
                                        productDetailsStore.remove();
                                        self.back(backUrl);
                                    }, 300);
                                },

                                type: c.ui.Alert.STYLE_CANCELSTYLE_CONFIRM
                            }
                          ]
                      });
                  }
              }

              if (backAlert) {
                  backAlert.show()
              } else {
                  this.back('list');
                  productDetailsStore.remove();
              }
          },

          onLogin: function () {
              var self = this;
              if (!userStore.isLogin()) {                  
                  Member.memberLogin({
                      param: "from=" + encodeURIComponent("/webapp/car/#" + this.request.fullhash) + '&t=1',
                      callback: function () {
                          self.loadPage();
                      }
                  })
              }
          },

          appendShowMoreBtn: function () {
              // 在超过长度的服务信息下面一行显示“更多”按钮
              var serviceInfoNode = ['feeSummary', 'feeDistance', 'feePeriod', 'destinationAreaCovered', 'pickupAreaCovered'];
              for (var i = 0; i < serviceInfoNode.length; i++) {
                  var domEle = this.lazyFindNodeById(serviceInfoNode[i]);
                  var space_l = $(domEle).find('.js_space')[0].offsetTop - $(domEle).find('.js_text')[0].offsetTop;

                  if (space_l > $(domEle).find('.js_text')[0].offsetHeight) {
                      // 展示更多按钮
                      $(domEle).find('.itemMore').css('display', 'block');

                      // 点击以后显示全部
                      domEle.on('click', function (e) {
                          var container = $(e.currentTarget);
                          var target = $(e.target);
                          if (target.hasClass('itemMore')) {
                              target.css('display', 'none');

                              /**
                              *description :  修复BUG:42074  
                              *modified    :  lh_sun@ctrip.com
                              *date        :  2013-12-19
                              **/
                              //container.find('.js_text').removeClass('ellips_line3');
                              container.find('.js_text').removeClass('line3_hidden');
                              container.off('click');
                          }
                      })
                  } else {
                      $(domEle).find('.itemMore').css('display', 'none');
                  }
              }
          },

          onShow: function () {
              if ($.os.ios) {
                  this.headerview.root.css({ 'position': 'relative' });
              }
              if (this.referrer !== 'list') {
                  this.restoreScrollPos();
              }
              // 只能放在这里， 因为只有在页面渲染完成后才能获得元素位置信息
              this._appendShowMoreBtn = $.proxy(this.appendShowMoreBtn, this);
              $(window).bind('resize', this._appendShowMoreBtn);
              this._appendShowMoreBtn();
          },

          onHide: function () {
              if ($.os.ios) {
                  this.headerview.root.css({ 'position': 'fixed' });
              }
              if (this._appendShowMoreBtn) {
                  $(window).unbind('resize', this._appendShowMoreBtn);
              }
          },

          getServerUrl: function () {
            return 'waptest.ctrip.com';
          }
      });

      return View;

  });