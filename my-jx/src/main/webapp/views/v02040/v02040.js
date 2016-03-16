define(function () {
	var flag=0;//轮播标记
	var clickFlag=0;
	var flag2=0;//轮播标记
	var clickFlag2=0;
    var timer;
    var init = function () {
    	initCarLinstiner();
        initCarousel();
        initView(100);
        timer = setInterval(function(){
            initView(100);
        }, 3*60*1000);

        initLinstener();
    };

    var initView = function(regionId) {
        ips.queryData("s02040_pmIndicator",{"region_id":regionId},pmIndicatorHandler);
        ips.queryData("s02040_MSCTopFive",{"region_id":regionId},MSCTopFiveHandler);
        ips.queryData("s02040_MGWTopFive",{"region_id":regionId},MGWTopFiveHandler);
    };

    var initLinstener = function() {
        $(".v02030").bind("CHANGE_REGION_EVENT",function(evt, param){
            var regionId = param.region_id;
            clearInterval(timer);
            initView(regionId);
            timer = setInterval(function(){
                initView(regionId);
            }, 3*60*1000);
        });
    };
    
    var initCarousel = function() {
        //ipad和pc轮播从第一页开始
        ips.trigger("#myCarousel5","CAROUSEL_TO_ONE",{});
        // 初始化轮播myCarousel3
        $("#myCarousel5").carousel('cycle');
        //轮播控制myCarousel3
        $("#myCarousel5").click(function () {
            ips.trigger("#myCarousel5", "CAROUSEL_CLICK", {clickFlag: clickFlag});
        });
        $("#cmiddle5").click(function(){
            ips.trigger("#cmiddle5", "CMIDDLE_CLICK", {flag: flag});
        });
        $("#cleft5").click(function(){
            ips.trigger("#cleft5", "CAROUSEL_PRE", {});
        });
        $("#cright5").click(function(){
            ips.trigger("#cright5", "CAROUSEL_NEXT", {});
        });
        
        //ipad和pc轮播从第一页开始
        ips.trigger("#myCarousel6","CAROUSEL_TO_ONE",{});
        // 初始化轮播myCarousel3
        $("#myCarousel6").carousel('cycle');
        //轮播控制myCarousel3
        $("#myCarousel6").click(function () {
            ips.trigger("#myCarousel6", "CAROUSEL_CLICK", {clickFlag2: clickFlag2});
        });
        $("#cmiddle6").click(function(){
            ips.trigger("#cmiddle6", "CMIDDLE_CLICK", {flag2: flag2});
        });
        $("#cleft6").click(function(){
            ips.trigger("#cleft6", "CAROUSEL_PRE", {});
        });
        $("#cright6").click(function(){
            ips.trigger("#cright6", "CAROUSEL_NEXT", {});
        });
    };

    var initCarLinstiner = function() {
        /*轮播代码 start*/
        $("#myCarousel5").bind("CAROUSEL_TO_ONE",function(evt, param){
            $("#myCarousel5").carousel(0);
        });
        $("#myCarousel5").bind("CAROUSEL_CLICK",function(evt, param){
            clickFlag = param.clickFlag;
            if(clickFlag==0){
                $(".mycarousel-control5").fadeIn(500);
            }else{
                $(".mycarousel-control5").fadeOut(500);
                clickFlag=0;
            }
        });
        $("#cmiddle5").bind("CMIDDLE_CLICK",function(evt, param){
            flag = param.flag;
            if(flag==0){
                $("#myCarousel5").carousel('pause');
                $("#img5").attr('src','assets/images/v01030/play.png');
                flag=1;
            }else if(flag==1){
                $("#myCarousel5").carousel('cycle');
                $("#img5").attr('src','assets/images/v01030/pause.png');
                flag=0;
                clickFlag=1;
                ips.trigger("#myCarousel5", "CAROUSEL_CLICK", {clickFlag: clickFlag});
            }
        });
        $("#cleft5").bind("CAROUSEL_PRE",function(evt, param){
            $("#myCarousel5").carousel('prev');
        });
        $("#cright5").bind("CAROUSEL_NEXT",function(evt, param){
            $("#myCarousel5").carousel('next');
        });
        /*轮播代码 end*/
        
        /*轮播代码 start*/
        $("#myCarousel6").bind("CAROUSEL_TO_ONE",function(evt, param){
            $("#myCarousel6").carousel(0);
        });
        $("#myCarousel6").bind("CAROUSEL_CLICK",function(evt, param){
            clickFlag2 = param.clickFlag2;
            if(clickFlag2==0){
                $(".mycarousel-control6").fadeIn(500);
            }else{
                $(".mycarousel-control6").fadeOut(500);
                clickFlag2=0;
            }
        });
        $("#cmiddle6").bind("CMIDDLE_CLICK",function(evt, param){
            flag2 = param.flag2;
            if(flag2==0){
                $("#myCarousel6").carousel('pause');
                $("#img6").attr('src','assets/images/v01030/play.png');
                flag2=1;
            }else if(flag2==1){
                $("#myCarousel6").carousel('cycle');
                $("#img6").attr('src','assets/images/v01030/pause.png');
                flag2=0;
                clickFlag2=1;
                ips.trigger("#myCarousel6", "CAROUSEL_CLICK", {clickFlag2: clickFlag2});
            }
        });
        $("#cleft6").bind("CAROUSEL_PRE",function(evt, param){
            $("#myCarousel6").carousel('prev');
        });
        $("#cright6").bind("CAROUSEL_NEXT",function(evt, param){
            $("#myCarousel6").carousel('next');
        });
        /*轮播代码 end*/
    };

    var MSCTopFiveHandler = function(result) {
    	 if(result.code != 0) {
             return;
         }
    	 showProgressBar(result.data,"msc");
    }
    
    var MGWTopFiveHandler = function(result) {
     	 if(result.code != 0) {
                return;
         }
         showProgressBar(result.data,"mgw");

   }
    
    var pmIndicatorHandler = function(result) {
        if(result.code != 0) {
            return;
        }

        if(result.data.length > 0) {
            $("#v02040_2gwxdhlIcon").animate({width: result.data[0].GSM_WIRELESS_FAIL_RATE * 275 / 100 + "px"}, 1500);
            $("#v02040_2gwxyslIcon").animate({width: result.data[0].GSM_WIRELESS_JAM_RATE * 275 / 100 + "px"}, 1500);
            $("#v02040_2gwxjtlIcon").animate({width: result.data[0].GSM_WIRELESS_SUCC_RATE * 275 / 100 + "px"}, 1500);
            $("#v02040_3gwxdxlIcon").animate({width: result.data[0].TD_WIRELESS_FAIL_RATE * 275 / 100 + "px"}, 1500);
            $("#v02040_3gwxdhlIcon").animate({width: result.data[0].TD_WIRELESS_TRAFFAIL_RATE * 275 / 100 + "px"}, 1500);
            $("#v02040_4gwxjtlIcon").animate({width: result.data[0].LTE_WIRELESS_SUCC_RATE * 275 / 100 + "px"}, 1500);
            $("#v02040_4gwxdxlIcon").animate({width: result.data[0].LTE_WIRELESS_FAIL_RATE * 275 / 100 + "px"}, 1500);
            $("#v02040_4gxhcglIcon").animate({width: result.data[0].LTE_CALL_SUCC_RATE * 275 / 100 + "px"}, 1500);

            $("#v02040_time").html(result.data[0].START_TIME);
            $("#v02040_2gwxdhl").ipsnum({value: result.data[0].GSM_WIRELESS_FAIL_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
            $("#v02040_2gwxysl").ipsnum({value: result.data[0].GSM_WIRELESS_JAM_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
            $("#v02040_2gwxjtl").ipsnum({value: result.data[0].GSM_WIRELESS_SUCC_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
            $("#v02040_3gwxdxl").ipsnum({value: result.data[0].TD_WIRELESS_FAIL_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
            $("#v02040_3gwxdhl").ipsnum({value: result.data[0].TD_WIRELESS_TRAFFAIL_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
            $("#v02040_4gwxjtl").ipsnum({value: result.data[0].LTE_WIRELESS_SUCC_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
            $("#v02040_4gwxdxl").ipsnum({value: result.data[0].LTE_WIRELESS_FAIL_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
            $("#v02040_4gxhcgl").ipsnum({value: result.data[0].LTE_CALL_SUCC_RATE.toFixed(2) + "%", animation: "random", numHeight: "38"});
        } else {
            $("#v02040_2gwxdhlIcon").animate({width: 0}, 1500);
            $("#v02040_2gwxyslIcon").animate({width: 0}, 1500);
            $("#v02040_2gwxjtlIcon").animate({width: 0}, 1500);
            $("#v02040_3gwxdxlIcon").animate({width: 0}, 1500);
            $("#v02040_3gwxdhlIcon").animate({width: 0}, 1500);
            $("#v02040_4gwxjtlIcon").animate({width: 0}, 1500);
            $("#v02040_4gwxdxlIcon").animate({width: 0}, 1500);
            $("#v02040_4gxhcglIcon").animate({width: 0}, 1500);

            $("#v02040_time").html("");
            $("#v02040_2gwxdhl").html("");
            $("#v02040_2gwxysl").html("");
            $("#v02040_2gwxjtl").html("");
            $("#v02040_3gwxdxl").html("");
            $("#v02040_3gwxdhl").html("");
            $("#v02040_4gwxjtl").html("");
            $("#v02040_4gwxdxl").html("");
            $("#v02040_4gxhcgl").html("");
        }
    };

    var showProgressBar = function(json,top5Type) {
        for(var i=0; i < 5; i++) {
            $("#v02040_" + top5Type + "Top5Label" + (i+1)).html("");
            $("#v02040_" + top5Type + "Top5Name" + (i+1)).html("");
            $("#v02040_" + top5Type + "Top5Value" + (i+1)).html("");
        }
        if(json.length > 0) {
            for(var i=0; i < 5; i++) {
                $("#v02040_" + top5Type + "Top5Name" + (i+1)).html(json[i].NAME);
                $("#v02040_" + top5Type + "Top5Value" + (i+1)).ipsnum({value: json[i].VALUE.toFixed(2), animation: "random", numHeight: "38"});
            }

            var maxValue = json[0].VALUE;
            var maxCnt = 14;//最多可现实14个方格
            var top5OfCnt2 = json[1].VALUE * 14 / maxValue;
            var top5OfCnt3 = json[2].VALUE * 14 / maxValue;
            var top5OfCnt4 = json[3].VALUE * 14 / maxValue;
            var top5OfCnt5 = json[4].VALUE * 14 / maxValue;
            var mscTiming = setInterval(function(){
                if(maxCnt-- > 0) {
                    $("#v02040_" + top5Type + "Top5Label1").append("<label></label>");
                } else {
                    clearInterval(mscTiming);
                }
                if(top5OfCnt2-- > 0) {
                    $("#v02040_" + top5Type + "Top5Label2").append("<label></label>");
                }
                if(top5OfCnt3-- > 0) {
                    $("#v02040_" + top5Type + "Top5Label3").append("<label></label>");
                }
                if(top5OfCnt4-- > 0) {
                    $("#v02040_" + top5Type + "Top5Label4").append("<label></label>");
                }
                if(top5OfCnt5-- > 0) {
                    $("#v02040_" + top5Type + "Top5Label5").append("<label></label>");
                }
            },60)
        }
    };

    return {
        init: init
    };
});