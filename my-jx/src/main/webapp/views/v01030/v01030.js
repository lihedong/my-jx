define([ 'echarts', 'echarts/chart/line', 'echarts/chart/bar', 'amcharts/pie'], function(ec) {
	
	var flag01=0;//轮播标记1
	var clickFlag1=0;
	var flag02=0;//轮播标记1
	var clickFlag2=0;
	
	var init = function() {
		initCarLinstiner();
		initCarousel();
	    initView();
	    
	    setInterval(refreshView, 1000*60);
	};
	
	var initCarLinstiner = function() {
		/*第一个轮播代码 start*/
		$("#myCarousel1").bind("CAROUSEL_CLICK",function(evt, param){
			clickFlag1 = param.clickFlag1;
			if(clickFlag1==0){
				$(".mycarousel-control").fadeIn(500);
			}else{
				$(".mycarousel-control").fadeOut(500);
				clickFlag1=0;
			}
		});
		$(".cmiddle").bind("CMIDDLE_CLICK",function(evt, param){
			flag01 = param.flag01;
			if(flag01==0){
				// 初始化轮播
			    $("#myCarousel1").carousel('cycle');
			    $("#img").attr('src','assets/images/v01030/pause.png');
			    flag01=1;
			    ips.trigger("#myCarousel1", "CAROUSEL_CLICK", {clickFlag1: clickFlag1});
	    	}else if(flag01==1){
	    		// 停止轮播
			    $("#myCarousel1").carousel('pause');
			    $("#img").attr('src','assets/images/v01030/play.png');
			    flag01=0;
			    clickFlag1=1;
			    ips.trigger("#myCarousel1", "CAROUSEL_CLICK", {clickFlag1: clickFlag1});
	    	}
		});
		$(".cleft").bind("CAROUSEL_PRE",function(evt, param){
			 $("#myCarousel1").carousel('prev');
		});
		$(".cright").bind("CAROUSEL_NEXT",function(evt, param){
			 $("#myCarousel1").carousel('next');
		});
		/*第一个轮播代码 end*/
		
		/*第二个轮播代码 start*/
		$("#myCarousel2").bind("CAROUSEL_TO_ONE",function(evt, param){
			 $("#myCarousel2").carousel(0);
		});
		$("#myCarousel2").bind("CAROUSEL_CLICK",function(evt, param){
			clickFlag2 = param.clickFlag2;
			if(clickFlag2==0){
				$(".mycarousel-control2").fadeIn(500);
			}else{
				$(".mycarousel-control2").fadeOut(500);
				clickFlag2=0;
			}
		});
		$(".cmiddle2").bind("CMIDDLE_CLICK",function(evt, param){
			flag02 = param.flag02;
			if(flag02==0){
			    $("#myCarousel2").carousel('pause');
			    $("#img2").attr('src','assets/images/v01030/play.png');
			    flag02=1;
	    	}else if(flag02==1){
			    $("#myCarousel2").carousel('cycle');
			    $("#img2").attr('src','assets/images/v01030/pause.png');
			    flag02=0;
			    clickFlag2=1;
			    ips.trigger("#myCarousel2", "CAROUSEL_CLICK", {clickFlag2: clickFlag2});
	    	}
		});
		$(".cleft2").bind("CAROUSEL_PRE",function(evt, param){
			 $("#myCarousel2").carousel('prev');
		});
		$(".cright2").bind("CAROUSEL_NEXT",function(evt, param){
			 $("#myCarousel2").carousel('next');
		});
		/*第二个轮播代码 end*/
	};
	
	var initCarousel = function() {
		// 初始化轮播myCarousel1
		$("#myCarousel1").carousel('pause');
		//轮播控制myCarousel1
		$("#myCarousel1").click(function () {
			ips.trigger("#myCarousel1", "CAROUSEL_CLICK", {clickFlag1: clickFlag1});
        });
	    $(".cmiddle").click(function(){
	    	ips.trigger(".cmiddle", "CMIDDLE_CLICK", {flag01: flag01});
	    });
	    $(".cleft").click(function(){
	    	ips.trigger(".cleft", "CAROUSEL_PRE", {});
	    });
	    $(".cright").click(function(){
	    	ips.trigger(".cright", "CAROUSEL_NEXT", {});
	    });
	    
	    //ipad和pc轮播从第一页开始
		ips.trigger("#myCarousel2","CAROUSEL_TO_ONE",{});
	    // 初始化轮播myCarousel2
		$("#myCarousel2").carousel('cycle');
		//轮播控制myCarousel2
		$("#myCarousel2").click(function () {
			ips.trigger("#myCarousel2", "CAROUSEL_CLICK", {clickFlag2: clickFlag2});
        });
	    $(".cmiddle2").click(function(){
	    	ips.trigger(".cmiddle2", "CMIDDLE_CLICK", {flag02: flag02});
	    });
	    $(".cleft2").click(function(){
	    	ips.trigger(".cleft2", "CAROUSEL_PRE", {});
	    });
	    $(".cright2").click(function(){
	    	ips.trigger(".cright2", "CAROUSEL_NEXT", {});
	    });
	};
	
	var initView = function() {
		ips.queryView("v01030hw", null, resultHwChart);
	    ips.queryView("v01030hwlj", null, resultHwljChart);
	    ips.queryView("v01030ll", null, resultLlChart);
	    ips.queryView("v01030lllj", null, resultLlljChart);
	    ips.queryView("v01030dx", null, resultDxChart);
	    ips.queryData("s01030_user", null, resultUser);
	    ips.queryData("s01030_smsAdd", null, resultSmsAdd);
	    ips.queryData("s01030_trafAdd", null, resultTrafAdd);
	    ips.queryData("s01030_flowAdd", null, resultFlowAdd);
	};
	
	var refreshView = function() {
		ips.queryView("v01030hw", null, resultHwChart);
	    ips.queryView("v01030hwlj", null, refreshHwljChart);
	    ips.queryView("v01030ll", null, resultLlChart);
	    ips.queryView("v01030lllj", null, refreshLlljChart);
	    ips.queryView("v01030dx", null, resultDxChart);
	    ips.queryData("s01030_user", null, resultUser);
	    ips.queryData("s01030_smsAdd", null, resultSmsAdd);
	    ips.queryData("s01030_trafAdd", null, resultTrafAdd);
	    ips.queryData("s01030_flowAdd", null, resultFlowAdd);
	};
	
	var resultHwChart= function(result){
		var myChart = ec.init(document.getElementById('hw_chart'));
		myChart.setOption(new Function(result.data)());
	}
	
	var twljChart;
	var resultHwljChart= function(result){
		twljChart = AmCharts.makeChart("hwlj_chart",new Function(result.data)());
	}
	
	var refreshHwljChart= function(result){
		var data = new Function(result.data)().dataProvider;
		twljChart["dataProvider"] = data;
		twljChart.validateData()
	}
	
	var resultLlChart= function(result){
		var myChart = ec.init(document.getElementById('ll_chart'));
		myChart.setOption(new Function(result.data)());
	}
	
	var lllj;
	var resultLlljChart= function(result){
		lllj = AmCharts.makeChart("lllj_chart",new Function(result.data)());
	}
	
	var refreshLlljChart= function(result){
		var data = new Function(result.data)().dataProvider;
		lllj["dataProvider"] = data;
		lllj.validateData()
	}
	
	var resultDxChart= function(result){
		var myChart = ec.init(document.getElementById('dx_chart'));
		myChart.setOption(new Function(result.data)());
	}
	
	var resultUser= function(result){
		if (result.code != 0) {
			console.debug(result.message);
			return;
		} else {
			$("#volte_user_rate_img").removeClass("up_img");
			$("#volte_user_rate_img").removeClass("down_img");
			$("#broadband_user_rate_img").removeClass("up_img");
			$("#broadband_user_rate_img").removeClass("down_img");
			$("#gsm_user_rate_img").removeClass("up_img");
			$("#gsm_user_rate_img").removeClass("down_img");
			$("#td_user_rate_img").removeClass("up_img");
			$("#td_user_rate_img").removeClass("down_img");
			$("#lte_user_rate_img").removeClass("up_img");
			$("#lte_user_rate_img").removeClass("down_img");
			$("#gsm_user_rate_img1").removeClass("up_img");
			$("#gsm_user_rate_img1").removeClass("down_img");
			$("#td_user_rate_img1").removeClass("up_img");
			$("#td_user_rate_img1").removeClass("down_img");
			$("#lte_user_rate_img1").removeClass("up_img");
			$("#lte_user_rate_img1").removeClass("down_img");
			var data=result.data;
			$('#v01030_startTime').text(result.data[0].START_TIME);
			$("#gsm_user_num").ipsnum({value: data[0].GSM_USER_NUM, animation: 'random', numHeight: 31});
			$("#td_user_num").ipsnum({value: data[0].TD_USER_NUM, animation: 'random', numHeight: 31});
			$("#lte_user_num").ipsnum({value: data[0].LTE_USER_NUM, animation: 'random', numHeight: 31});
			$("#gsm_user_num1").ipsnum({value: data[0].GSM_USER_NUM, animation: 'random', numHeight: 31});
			$("#td_user_num1").ipsnum({value: data[0].TD_USER_NUM, animation: 'random', numHeight: 31});
			$("#lte_user_num1").ipsnum({value: data[0].LTE_USER_NUM, animation: 'random', numHeight: 31});
			$("#volte_user_num").ipsnum({value: data[0].VOLTE_USER_NUM, animation: 'random', numHeight: 31});
			$("#broadband_user_num").ipsnum({value: data[0].BROADBAND_USER_NUM, animation: 'random', numHeight: 31});
			$("#gsm_adduser_num").ipsnum({value: data[0].GSM_ADDUSER_NUM, animation: 'random', numHeight: 31});
			$("#td_adduser_num").ipsnum({value: data[0].TD_ADDUSER_NUM, animation: 'random', numHeight: 31});
			$("#lte_adduser_num").ipsnum({value: data[0].LTE_ADDUSER_NUM, animation: 'random', numHeight: 31});
			$("#gsm_adduser_num1").ipsnum({value: data[0].GSM_ADDUSER_NUM, animation: 'random', numHeight: 31});
			$("#td_adduser_num1").ipsnum({value: data[0].TD_ADDUSER_NUM, animation: 'random', numHeight: 31});
			$("#lte_adduser_num1").ipsnum({value: data[0].LTE_ADDUSER_NUM, animation: 'random', numHeight: 31});
			//$("#volte_succ_num").ipsnum({value: data[0].VOLTE_SUCC_NUM, animation: 'random', numHeight: 31});
			//$("#broadband_adduser_num").ipsnum({value: data[0].BROADBAND_ADDUSER_NUM, animation: 'random', numHeight: 31});
			$("#wlan_user_num").ipsnum({value: data[0].WLAN_USER_NUM, animation: 'random', numHeight: 38});
			$("#hitv_user_num").ipsnum({value: data[0].HITV_USER_NUM, animation: 'random', numHeight: 38});
			$("#lte_user_rate").ipsnum({value: data[0].LTE_USER_RATE+"%", animation: 'random', numHeight: 31});
			$("#td_user_rate").ipsnum({value: data[0].TD_USER_RATE+"%", animation: 'random', numHeight: 31});
			$("#gsm_user_rate").ipsnum({value: data[0].GSM_USER_RATE+"%", animation: 'random', numHeight: 31});
			$("#lte_user_rate1").ipsnum({value: data[0].LTE_USER_RATE+"%", animation: 'random', numHeight: 31});
			$("#td_user_rate1").ipsnum({value: data[0].TD_USER_RATE+"%", animation: 'random', numHeight: 31});
			$("#gsm_user_rate1").ipsnum({value: data[0].GSM_USER_RATE+"%", animation: 'random', numHeight: 31});
			$("#volte_user_rate").ipsnum({value: data[0].VOLTE_USER_RATE+"%", animation: 'random', numHeight: 31});
			$("#broadband_user_rate").ipsnum({value: data[0].BROADBAND_USER_RATE+"%", animation: 'random', numHeight: 31});
			if(data[0].LTE_USER_RATE>=0){
				$("#lte_user_rate_img").addClass("up_img");
				$("#lte_user_rate_img1").addClass("up_img");
			} else {
				$("#lte_user_rate_img").addClass("down_img");
				$("#lte_user_rate_img1").addClass("down_img");
			}
			if(data[0].TD_USER_RATE>=0){
				$("#td_user_rate_img").addClass("up_img");
				$("#td_user_rate_img1").addClass("up_img");
			} else {
				$("#td_user_rate_img").addClass("down_img");
				$("#td_user_rate_img1").addClass("down_img");
			}
			if(data[0].GSM_USER_RATE>=0){
				$("#gsm_user_rate_img").addClass("up_img");
				$("#gsm_user_rate_img1").addClass("up_img");
			} else {
				$("#gsm_user_rate_img").addClass("down_img");
				$("#gsm_user_rate_img1").addClass("down_img");
			}
			if(data[0].VOLTE_USER_RATE>=0){$("#volte_user_rate_img").addClass("up_img");}
			else{$("#volte_user_rate_img").addClass("down_img");}
			if(data[0].BROADBAND_USER_RATE>=0){$("#broadband_user_rate_img").addClass("up_img");}
			else{$("#broadband_user_rate_img").addClass("down_img");}
		}
	};
	
	
	var resultSmsAdd= function(result){
		if (result.code != 0) {
			console.debug(result.message);
			return;
		} else {
			$("#dx_rate_img").removeClass("up_img");
			$("#dx_rate_img").removeClass("down_img");
			var data=result.data;
			$("#moment_sms_rate").ipsnum({value: data[0].MOMENT_SMS_RATE+"%", animation: 'random', numHeight: 43});
			$("#accu_sms_num").ipsnum({value: data[0].ACCU_SMS_NUM, animation: 'random', numHeight: 45});
			if(data[0].MOMENT_SMS_RATE>=0){$("#dx_rate_img").addClass("up_img");}
			else{$("#dx_rate_img").addClass("down_img");}
		}
	}
	
	var resultTrafAdd= function(result){
		if (result.code != 0) {
			console.debug(result.message);
			return;
		} else {
			var data=result.data;
			$("#gsm_hwlj_value").ipsnum({value: data[0].GSM_ADDTRAF_NUM, animation: 'random', numHeight: 43});
			$("#td_hwlj_value").ipsnum({value: data[0].TD_ADDTRAF_NUM, animation: 'random', numHeight: 43});
		}
	}
	
	var resultFlowAdd= function(result){
		if (result.code != 0) {
			console.debug(result.message);
			return;
		} else {
			var data=result.data;
			$("#gsm_lllj_value").ipsnum({value: data[0].GSM_ADDFLOW_NUM, animation: 'random', numHeight: 43});
			$("#td_lllj_value").ipsnum({value: data[0].TD_ADDFLOW_NUM, animation: 'random', numHeight: 43});
			$("#lte_lllj_value").ipsnum({value: data[0].LTE_ADDFLOW_NUM, animation: 'random', numHeight: 43});
		}
	}
	
	return {
		init : init
	};
});