define(['cPageView'],function(pageView){
	var groupView = pageView.extend({
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
		}
	})
	return groupView;
});

