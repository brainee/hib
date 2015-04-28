require.config({
  baseUrl: '/webapp/',
  shim:    {
    _:     {
      exports: '_'
    },
    B:     {
      deps:    [
        '_'
      ],
      exports: 'Backbone'
    },
    cBase: {
      exports: 'cBase'
    },
    cAjax: {
      exports: 'cAjax'
    },
    cView: {
      deps:    [
        'B'
      ],
      exports: 'cView'
    }
  },
  paths:   {
    'text': 'res/libs/require.text',

    'AbstractAPP': 'app/c.abstract.app',
    'App': 'app/business/c.business.app',

    // ---------------------------------------------------
    // 基础库
    'c':                       'app/common/c',
    'cUtility':                'app/common/c.utility',
    'cUtilityCrypt':           'app/util/c.utility.crypt',
    'cBase':                   'app/common/c.base',
    'cLog':                    'app/common/c.log',
    'cValidate':               'app/common/c.validate', //数据验证
    'cSales':                  'app/common/c.sales', //渠道模块
    'cLazyload':               'app/common/c.lazyload', //加载
    'cListAdapter':            'app/common/c.common.listadapter',
    'cGeoService':             'app/common/c.geo.service',
    'rsa':                     'app/common/c.rsa',
    'Validate':                'app/common/c.validate',

    //-----------------------------------------------------------
    // Model
    'cAjax':                   'app/common/c.ajax',
    'cAbstractModel':          'app/model/c.abstract.model',
    'cModel':                  'app/model/c.model',
    'cUserModel':              'app/model/c.user.model',
    'cMultipleDate':           'app/model/c.multiple.data', //多重数据对象

    //-----------------------------------------------------------
    // Store
    'memStore':                'app/store/c.memorystore',
    'cStore':                  'app/store/c.store', //提供存取具体数据的Store基础类
    'cStorage':                'app/store/c.storage', //提供存取localStorage/sessionStorage的静态方法
    'CommonStore':             'app/store/c.common.store', //公用的store
    'PageStore':               'app/store/c.store.package',

    //-----------------------------------------------------------
    // UI组件
    'cUI':                     'app/ui/c.ui',
    'cUICore':                 'app/ui/c.ui.core',
    'cHistory':                'app/ui/c.ui.history',
    'cView':                   'app/ui/c.ui.view',
    'cDataSource':             'app/ui/c.ui.datasource', //数据源
    'cUIAbstractView':         'app/ui/c.ui.abstract.view',
    'cAdView':                 'app/ui/c.ui.ad',
    'cUIAlert':                'app/ui/c.ui.alert',
    'cUIAnimation':            'app/ui/c.ui.animation',
    'cUIBase':                 'app/ui/c.ui.base',
    'cUIEventListener':        'app/ui/c.ui.event.listener',
    'cUIHashObserve':          'app/ui/c.ui.hash.observe',
    'cUIWarning':              'app/ui/c.ui.warning',
    'cUIHeadWarning':          'app/ui/c.ui.head.warning',
    'cUIInputClear':           'app/ui/c.ui.input.clear',
    'cUILayer':                'app/ui/c.ui.layer',
    'cUILoading':              'app/ui/c.ui.loading',
    'cUILoadingLayer':         'app/ui/c.ui.loading.layer',
    'cUIMask':                 'app/ui/c.ui.mask',
    'cUIPageview':             'app/ui/c.ui.page.view',
    'cUIScrollRadio':          'app/ui/c.ui.scroll.radio',
    'cUIScrollRadioList':      'app/ui/c.ui.scroll.radio.list',
    'cUIScrollList':           'app/ui/c.ui.scrolllist',
    'cUIScrollLayer':          'app/ui/c.ui.scrolllayer',
    'cUIToast':                'app/ui/c.ui.toast',
    'cUIWarning404':           'app/ui/c.ui.warning404',
    'cUICitylist': 'app/ui/c.ui.citylist',

    /** l_wang add */
    'cUISwitch': 'app/ui/c.ui.switch',
    'cUIScroll': 'app/ui/c.ui.scroll',

    //--------------------------------------------------------------
    // Widget组件
    'cWidgetFactory':          'app/widget/c.widget.factory',
    'cWidgetHeaderView':       'app/widget/c.widget.headerview',
    'cWidgetListView':         'app/widget/c.widget.listview',
    'cWidgetTipslayer':        'app/widget/c.widget.tipslayer',
    'cWidgetInputValidator':   'app/widget/c.widget.inputValidator',
    'cWidgetPublisher':        'app/widget/c.widget.publisher',
    'cWidgetGeolocation':      'app/widget/c.widget.geolocation',
    'cWidgetAbstractCalendar': 'app/widget/c.widget.abstract.calendar',
    'cWidgetCalendar':         'app/widget/c.widget.calendar',
    'cWidgetCalendarPrice':    'app/widget/c.widget.calendar.price',
    'cWidgetSlide':            'app/widget/c.widget.slide',
    'cWidgetMember':           'app/widget/c.widget.member',
    'cWidgetGuider':           'app/widget/c.widget.guider',
    'cWidgetCaptcha':          'app/widget/c.widget.captcha',

    //--------------------------------------------------------------
    // Page
    'cBasePageView':           'app/page/c.page.base',
    'cCommonPageFactory':      'app/page/c.page.factory',
    'cCommonListPage':         'app/page/c.page.common.list',

    //--------------------------------------------------------------
    // Hybrid
    'cHybridFacade':           'app/hybrid/c.hybrid.facade',

    'cUtilityCrypt':           "app/util/c.utility.crypt"
  }
});