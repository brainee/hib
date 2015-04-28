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
            var departCityVal = JSON.parse(localStorage.getItem("depart"));
            var destCityVal = JSON.parse(localStorage.getItem("dest"));
            //setTimeout(function () {
            if (departCityVal) {
                $("#g_depart").html(departCityVal.name);
                $("#g_depart").attr("data-id", departCityVal.id);
            }
            if (destCityVal) {
                $("#g_dest").html(destCityVal.name);
                $("#g_dest").attr("data-id", destCityVal.id);
            }
            //}, 100)

            console.log('pageshow', this.id);
        },
        events: {
            "click #searchlistsubmit": "groupSearch",
            "click #g_depart": "showCityList",
            "click #g_dest": "showCityList"
        },
        groupSearch: function () {
            console.log('groupSearch');
            var action = window.isIpad ? "vacationlistipad" : "vacationlist";
            var departCityId = $("#g_depart").attr("data-id");
            var destCityName = $("#g_dest").html();
            Lizard.goTo(Lizard.appBaseUrl + action + "/" + departCityId + "/0/" + destCityName);
        },
        showCityList: function (e) {
            var city_type = e.target.id.replace("g_", "");
            localStorage.setItem("city_type", city_type);
            var action = window.isIpad ? "citylistipad" : "citylist"
            Lizard.goTo(Lizard.appBaseUrl + action, true);
        }
    })
    return groupView;
});

 