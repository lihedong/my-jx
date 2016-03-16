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
    	ips.queryData("s02010_userCnt",{region_id : regionId},userCntHandler);
    	ips.queryData("s02010_jkUsers",{region_id : regionId},jkUserCntHandler);
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
        ips.trigger("#myCarousel3","CAROUSEL_TO_ONE",{});
        // 初始化轮播myCarousel3
        $("#myCarousel3").carousel('cycle');
        //轮播控制myCarousel3
        $("#myCarousel3").click(function () {
            ips.trigger("#myCarousel3", "CAROUSEL_CLICK", {clickFlag: clickFlag});
        });
        $("#cmiddle3").click(function(){
            ips.trigger("#cmiddle3", "CMIDDLE_CLICK", {flag: flag});
        });
        $("#cleft3").click(function(){
            ips.trigger("#cleft3", "CAROUSEL_PRE", {});
        });
        $("#cright3").click(function(){
            ips.trigger("#cright3", "CAROUSEL_NEXT", {});
        });
    };

    var initCarLinstiner = function() {
        /*轮播代码 start*/
        $("#myCarousel3").bind("CAROUSEL_TO_ONE",function(evt, param){
            $("#myCarousel3").carousel(0);
        });
        $("#myCarousel3").bind("CAROUSEL_CLICK",function(evt, param){
            clickFlag = param.clickFlag;
            if(clickFlag==0){
                $(".mycarousel-control3").fadeIn(500);
            }else{
                $(".mycarousel-control3").fadeOut(500);
                clickFlag=0;
            }
        });
        $("#cmiddle3").bind("CMIDDLE_CLICK",function(evt, param){
            flag = param.flag;
            if(flag==0){
                $("#myCarousel3").carousel('pause');
                $("#img3").attr('src','assets/images/v01030/play.png');
                flag=1;
            }else if(flag==1){
                $("#myCarousel3").carousel('cycle');
                $("#img3").attr('src','assets/images/v01030/pause.png');
                flag=0;
                clickFlag=1;
                ips.trigger("#myCarousel3", "CAROUSEL_CLICK", {clickFlag: clickFlag});
            }
        });
        $("#cleft3").bind("CAROUSEL_PRE",function(evt, param){
            $("#myCarousel3").carousel('prev');
        });
        $("#cright3").bind("CAROUSEL_NEXT",function(evt, param){
            $("#myCarousel3").carousel('next');
        });
        /*轮播代码 end*/
    };

    var userCntHandler = function(result) {
        if(result.code != 0) {
            return;
        }
        if(result.data.length > 0) {
            $('#v02010_userTime').html(result.data[0].START_TIME);
            $('#v02010_netUsertime').html(result.data[0].START_TIME);

            $('#gsmUserNum').ipsnum({value:result.data[0].USER_2G,animation:'random',numHeight:"38"});
            $('#tdUserNum').ipsnum({value:result.data[0].USER_3G,animation:'random',numHeight:"38"});
            $('#lteUserNum').ipsnum({value:result.data[0].USER_4G,animation:'random',numHeight:"38"});

            $('#gsmNetNum').ipsnum({value:result.data[0].NETUSER_2G,animation:'random',numHeight:"38"});
            $('#tdNetNum').ipsnum({value:result.data[0].NETUSER_3G,animation:'random',numHeight:"38"});
            $('#lteNetNum').ipsnum({value:result.data[0].NETUSER_4G,animation:'random',numHeight:"38"});
        } else {
            $('#v02010_userTime').html("");
            $('#v02010_netUsertime').html("");

            $('#gsmUserNum').html("");
            $('#tdUserNum').html("");
            $('#lteUserNum').html("");

            $('#gsmNetNum').html("");
            $('#tdNetNum').html("");
            $('#lteNetNum').html("");
        }
    };
    
    var jkUserCntHandler = function(result) {
        if(result.code != 0) {
            return;
        }

        if(result.data.length > 0) {
            $('#yxjkUsrCnt').ipsnum({value:result.data[0].EFFECT_JK_USERNUM + "万",animation:'random',numHeight:"38"});
            $('#jkzxErrCnt').ipsnum({value:result.data[0].JK_INTERRUPT_USERNUM + "万",animation:'random',numHeight:"38"});
        } else {
            $('#yxjkUsrCnt').html("");
            $('#jkzxErrCnt').html("");
        }

    }

    return {
        init: init
    };
});