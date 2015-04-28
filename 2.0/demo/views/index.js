define(['cPageView'], function (pageView) {

    var groupView = pageView.extend({
        viewname: 'index',
		pagebeforehide:function(){
			console.log('pagebeforehide',this.id)
		},
		pagehide:function(){
			console.log('pagehide',this.id)				
		},
		pagebeforeshow:function(){
			console.log('pagebeforeshow',this.id)		
		},
		pageshow:function(){
			console.log('pageshow',this.id)			
		},
		events:{
			"click #searchlistsubmit": "groupSearch"
		},
		groupSearch: function () {
			console.log('groupSearch')
			this.app.goTo("/webapp/tour/vacationslist/2/2/三亚");								
		},
		
		onShow: function () {
            this.headerview.htmlMap.title = '<h1 class="title"><%=title %></h1>';
            this.headerview.set({
                title: '团队游',
                back: true,
                view: this,
                tel: null,
                home: true,
                events: {
                    returnHandler: function () {
                        alert(1);
                    },
                    homeHandler: function () {
                        alert(2);
                    }
                }
            });
            this.headerview.show();
        },
		
		onCreate: function () {		    
            this.injectHeaderView();
        },
	})

	return groupView;
});



 