define(function () {
    var flag=0;//轮播标记
    var clickFlag=0;
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
    	ips.queryData("s02020_mms",{},mmsHandler);
        ips.queryView("v02020dx",{},mmsChartHandler);

        ips.queryData("s02020_telTraffic",{"region_id":regionId},telTrafficHandler);
        ips.queryView("v02020hwl",{"region_id":regionId},telTrafficChartHandler);

        ips.queryData("s02020_lteFlow",{"region_id":regionId},lteFlowHandler);
        ips.queryView("v02020ltell",{"region_id":regionId},lteFlowChartHandler);

        ips.queryData("s02020_tollTraf",{"region_id":regionId},tollTrafHandler);
        ips.queryView("v02020cthwl",{"region_id":regionId},tollTrafChartHandler);

        ips.queryData("s02020_groupFlow",{"region_id":regionId},groupFlowHandler);
        ips.queryView("v02020fzyll",{"region_id":regionId},groupFlowChartHandler);
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
        ips.trigger("#myCarousel4","CAROUSEL_TO_ONE",{});
        // 初始化轮播myCarousel3
        $("#myCarousel4").carousel('cycle');
        //轮播控制myCarousel3
        $("#myCarousel4").click(function () {
            ips.trigger("#myCarousel4", "CAROUSEL_CLICK", {clickFlag: clickFlag});
        });
        $("#cmiddle4").click(function(){
            ips.trigger("#cmiddle4", "CMIDDLE_CLICK", {flag: flag});
        });
        $("#cleft4").click(function(){
            ips.trigger("#cleft4", "CAROUSEL_PRE", {});
        });
        $("#cright4").click(function(){
            ips.trigger("#cright4", "CAROUSEL_NEXT", {});
        });
    };

    var initCarLinstiner = function() {
        /*轮播代码 start*/
        $("#myCarousel4").bind("CAROUSEL_TO_ONE",function(evt, param){
            $("#myCarousel4").carousel(0);
        });
        $("#myCarousel4").bind("CAROUSEL_CLICK",function(evt, param){
            clickFlag = param.clickFlag;
            if(clickFlag==0){
                $(".mycarousel-control4").fadeIn(500);
            }else{
                $(".mycarousel-control4").fadeOut(500);
                clickFlag=0;
            }
        });
        $("#cmiddle4").bind("CMIDDLE_CLICK",function(evt, param){
            flag = param.flag;
            if(flag==0){
                $("#myCarousel4").carousel('pause');
                $("#img4").attr('src','assets/images/v01030/play.png');
                flag=1;
            }else if(flag==1){
                $("#myCarousel4").carousel('cycle');
                $("#img4").attr('src','assets/images/v01030/pause.png');
                flag=0;
                clickFlag=1;
                ips.trigger("#myCarousel4", "CAROUSEL_CLICK", {clickFlag: clickFlag});
            }
        });
        $("#cleft4").bind("CAROUSEL_PRE",function(evt, param){
            $("#myCarousel4").carousel('prev');
        });
        $("#cright4").bind("CAROUSEL_NEXT",function(evt, param){
            $("#myCarousel4").carousel('next');
        });
        /*轮播代码 end*/
    };

    var mmsHandler = function(result) {
        if(result.code != 0) {
          return;
        }
        if(result.data.length > 0) {
            if(result.data[0].COMP_RATE > 0) {
                $('#v02020_dxIcon').removeClass("up").remove("down").addClass("up");
            } else {
                $('#v02020_dxIcon').removeClass("up").remove("down").addClass("down");
            }
            $('#v02020_dxVal').ipsnum({value:result.data[0].NOW_NUM,animation:'random',numHeight:"38"});
            $('#v02020_dxWeekVal').ipsnum({value:result.data[0].LAST_WEEK_NUM,animation:'random',numHeight:"38"});
            $('#v02020_dxComRate').ipsnum({value:result.data[0].COMP_RATE + "%",animation:'random',numHeight:"38"});
        } else {
            $('#v02020_dxIcon').removeClass("up").remove("down")
            $('#v02020_dxVal').html("");
            $('#v02020_dxWeekVal').html("");
            $('#v02020_dxComRate').html("");
        }

    };

    var mmsChartHandler = function(result) {
        var chart = AmCharts.makeChart("v02020_dxchart", new Function(result.data)());
    };

    var telTrafficHandler = function(result) {
        if(result.code != 0) {
            return;
        }
        if(result.data.length > 0) {
        	if(result.data[0].COMP_RATE > 0) {
                $('#v02020_hwlIcon').removeClass("up").remove("down").addClass("up");
            } else {
                $('#v02020_hwlIcon').removeClass("up").remove("down").addClass("down");
            }
            $('#v02020_hwlVal').ipsnum({value:result.data[0].NOW_NUM,animation:'random',numHeight:"38"});
            $('#v02020_hwlWeekVal').ipsnum({value:result.data[0].LAST_WEEK_NUM,animation:'random',numHeight:"38"});
            $('#v02020_hwlComRate').ipsnum({value:result.data[0].COMP_RATE + "%",animation:'random',numHeight:"38"});
        } else {
        	$('#v02020_hwlIcon').removeClass("up").remove("down");
            $('#v02020_hwlVal').html("");
            $('#v02020_hwlWeekVal').html("");
            $('#v02020_hwlComRate').html("");
        }
        
    };

    var telTrafficChartHandler = function(result) {
        var chart = AmCharts.makeChart("v02020_hwlchart", new Function(result.data)());
    };

    var lteFlowHandler = function(result) {
        if(result.code != 0) {
            return;
        }
        if(result.data.length > 0) {
        	if(result.data[0].COMP_RATE > 0) {
                $('#v02020_ltellIcon').removeClass("up").remove("down").addClass("up");
            } else {
                $('#v02020_ltellIcon').removeClass("up").remove("down").addClass("down");
            }
            $('#v02020_ltellVal').ipsnum({value:result.data[0].NOW_NUM,animation:'random',numHeight:"38"});
            $('#v02020_ltellWeekVal').ipsnum({value:result.data[0].LAST_WEEK_NUM,animation:'random',numHeight:"38"});
            $('#v02020_ltellComRate').ipsnum({value:result.data[0].COMP_RATE + "%",animation:'random',numHeight:"38"});
        } else {
            $('#v02020_ltellIcon').removeClass("up").remove("down");
            $('#v02020_ltellVal').html("");
            $('#v02020_ltellWeekVal').html("");
            $('#v02020_ltellComRate').html("");
        }
    };

    var lteFlowChartHandler = function(result) {
        var chart = AmCharts.makeChart("v02020_ltellchart", new Function(result.data)());
    };

    var tollTrafHandler = function(result) {
        if(result.code != 0) {
            return;
        }

        if(result.data.length > 0) {
            if(result.data[0].COMP_RATE > 0) {
                $('#v02020_cthwlIcon').removeClass("up").remove("down").addClass("up");
            } else {
                $('#v02020_cthwlIcon').removeClass("up").remove("down").addClass("down");
            }
            $('#v02020_cthwlVal').ipsnum({value:result.data[0].NOW_NUM,animation:'random',numHeight:"38"});
            $('#v02020_cthwlWeekVal').ipsnum({value:result.data[0].LAST_WEEK_NUM,animation:'random',numHeight:"38"});
            $('#v02020_cthwlComRate').ipsnum({value:result.data[0].COMP_RATE + "%",animation:'random',numHeight:"38"});
        } else {
            $('#v02020_cthwlIcon').removeClass("up").remove("down");
            $('#v02020_cthwlVal').html("");
            $('#v02020_cthwlWeekVal').html("");
            $('#v02020_cthwlComRate').html("");
        }

    };

    var tollTrafChartHandler = function(result) {
        var chart = AmCharts.makeChart("v02020_cthwlchart", new Function(result.data)());
    };

    var groupFlowHandler = function(result) {
        if(result.code != 0) {
            return;
        }

        if(result.data.length > 0) {
            if(result.data[0].COMP_RATE > 0) {
                $('#v02020_fzyllIcon').removeClass("up").remove("down").addClass("up");
            } else {
                $('#v02020_fzyllIcon').removeClass("up").remove("down").addClass("down");
            }

            $('#v02020_fzyllVal').ipsnum({value:result.data[0].NOW_NUM,animation:'random',numHeight:"38"});
            $('#v02020_fzyllWeekVal').ipsnum({value:result.data[0].LAST_WEEK_NUM,animation:'random',numHeight:"38"});
            $('#v02020_fzyllComRate').ipsnum({value:result.data[0].COMP_RATE + "%",animation:'random',numHeight:"38"});
        } else {
            $('#v02020_fzyllIcon').removeClass("up").remove("down");
            $('#v02020_fzyllVal').html("");
            $('#v02020_fzyllWeekVal').html("");
            $('#v02020_fzyllComRate').html("");
        }
    };

    var groupFlowChartHandler = function(result) {
        var chart = AmCharts.makeChart("v02020_fzyllchart", new Function(result.data)());
    };

    return {
        init: init
    };
});