define(['cPageView'], function (pageView) {
    var groupView = pageView.extend({
        pagebeforehide: function () {
            console.log('pagebeforehide', this.id)
        },
        pagehide: function () {
            console.log('pagehide', this.id)
        },
        pagebeforeshow: function () {
            console.log('pagebeforeshow', this.id)
        },
        pageshow: function () {
            console.log('pageshow', this.id)
        },
        events: {
            "click #Section1": "selectCity"
        },
        selectCity: function (e) {
            var city_name = e.target.getAttribute("data-name");
            var city_id = e.target.getAttribute("data-id");
            var city_type = localStorage.getItem("city_type");
            localStorage.setItem(city_type, '{ "id": "'+city_id+'", "name": "'+city_name+'" }');
            //debugger;
            var action = window.isIpad ? "indexIpad" : "index";
            Lizard.goTo(Lizard.appBaseUrl + action);
        }
    })
    return groupView;
});


