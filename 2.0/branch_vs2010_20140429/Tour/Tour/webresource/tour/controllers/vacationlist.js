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
		},
		events: {
			"click .hot_list_tab": "detail"
		},
		detail: function (e) {
			var el = $(e.target).parents(".hot_list_tab");
			if (!el) { return false;}
			var pid =el.attr("data-pid").replace(/[^\d].*$/,"");
			var action = window.isIpad?"detailIpad":"detail";
			Lizard.goTo(Lizard.appBaseUrl + action + "/" + pid + "/" + Lizard.P("salecity"));
		}
	})
	return groupView;
});


 