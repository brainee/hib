define(['cPageView'],function(pageView){
    var groupView = pageView.extend({
        viewname: 'vacationlist',
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
		events: {
			"click .hot_list_tab": "detail"
		},
		detail:function(){
		  this.app.goTo("/webapp/tour/detail/1740980/2");								
		},
		
		onCreate: function () {		    
            this.injectHeaderView();
        },
		
		onShow: function () {
            this.headerview.htmlMap.title = '<h1 class="title"><%=title %></h1>';
            this.headerview.set({
                title: '团队游11',
                back: true,
                view: this,
                tel: null,
                home: true,
                events: {
                    returnHandler: function () {
                        this.app.goTo("/webapp/tour/index");			
                    },
                    homeHandler: function () {
                        alert(4);
                    }
                }
            });
            this.headerview.show();
        },
	})
	return groupView;
});


 