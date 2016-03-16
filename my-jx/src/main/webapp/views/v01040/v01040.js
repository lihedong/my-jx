define(function () {

    /**
     * 初始化
     */
    var timer;
    var init = function () {
        initView();

        timer = setInterval(function(){
        	// 清除和初始化底部四个table表格
            clearAndIntIndicDetail();
            //图片滚动到下一张图片
            carousel.next();
        }, 20*1000);
        
        setInterval(function(){
        	//页面顶部四个数据，下载速率大包(>500K)、响应时延、CSFB回落时延(南昌)、VOLTE接通时延(VOLTE TO VOLTE)
            ips.queryData("s01040_quality", {}, qulityKpiHandler);
        },60*1000);
    };

    /**
     * 初始化页面数据
     */
    var initView = function () {
        // 清除和初始化底部四个table表格
        clearAndIntIndicDetail();
        // 监听器初始化
        initLinstenr();
        //实现页面ipad和大屏同步图片滚动
        ips.trigger("#v01040","SYNC_CAROUSEL",{});
        //初始化页面数据
        ips.queryData("s01040_quality", {}, qulityKpiHandler);
        initCarousel();
        indicatorNameHandler("1");
        ips.queryData("s01040_indicator", {"type_id": "1"}, indicatorKpiHandler);
        ips.queryData("s01040_indicatorDetail", {"type_id": "1"}, indicDetailHandler);
    };

    /**
     * 注册页面监听器
     */
    var initLinstenr = function () {
        //解决同步页面的滚动效果
        $("#v01040").bind("SYNC_CAROUSEL",function(evt, param){
            initCarousel();
            indicatorNameHandler("1")
            ips.queryData("s01040_indicator", {"type_id": "1"}, indicatorKpiHandler);
            ips.queryData("s01040_indicatorDetail", {"type_id": "1"}, indicDetailHandler);
            //实现ipad和大屏定时同步
            clearInterval(timer);
            timer = setInterval(function(){
			            	// 清除和初始化底部四个table表格
			                clearAndIntIndicDetail();
			                //图片滚动到下一张图片
			                carousel.next();
			            }, 20*1000);
        });

        $("#v01040").bind("CHANGE_APP_INFO", function (evt, param) {
            //实现ipad和大屏定时同步
            clearInterval(timer);
            timer = setInterval(function(){
			            	// 清除和初始化底部四个table表格
			                clearAndIntIndicDetail();
			                //图片滚动到下一张图片
			                carousel.next();
			            }, 20*1000);
            clearAndIntIndicDetail();
            var type_id = param.type_id;
            indicatorNameHandler(type_id);
            ips.queryData("s01040_indicator", {"type_id": type_id}, indicatorKpiHandler);
            ips.queryData("s01040_indicatorDetail", {"type_id": type_id}, indicDetailHandler);
        });
    };

    /**
     * 图片旋转播放
     */
    var carousel;
    var initCarousel = function () {
        carousel = $("#v01040 .appIcon").waterwheelCarousel({
            flankingItems: 2,
            separation: 220,
            horizonOffset: 30,
            movedToCenter: function ($item) {
                ips.trigger("#v01040", "CHANGE_APP_INFO", {type_id: $item.attr('name')});
            },
            clickedCenter: function ($item) {
                ips.trigger("#v01040", "CHANGE_APP_INFO", {type_id: $item.attr('name')});
            }
        });
    };

    /**
     *上半部分指标(下载速率大包(>500K)、响应时延、CSFB回落时延(南昌)、VOLTE接通时延(VOLTE TO VOLTE))
     */
    var qulityKpiHandler = function (result) {
        if (result.code != 0) {
            return;
        }
        $('#v01040_startTime').text(result.data[0].START_TIME);
        $("#v01040_bigdownload_rate").ipsnum({value: result.data[0].DOWNLOAD_RATE, animation: 'random', numHeight: 44});
        $("#v01040_csfb_delay_time").ipsnum({
            value: result.data[0].CSFB_DELAY_TIME,
            animation: 'random',
            numHeight: 44
        });
        $("#v01040_volte_succ_num").ipsnum({value: result.data[0].VOLTE_SUCC_NUM, animation: 'random', numHeight: 44});
    };

    /**
     * 模块中间部分4中类型名称
     * @param result
     */
    var indicatorNameHandler = function(id) {
    	//如果是和我信
    	if(id == 5) {
    		$("#v01040_user_label").html("日新增用户");
    		$("#v01040_flow_label").html("日访问PV<span>(万)</span>");
    		$("#v01040_download_label").html("日访问UV<span>(万)</span>");
    		$("#v01040_delay_label").html("每秒访问量");
    	} else {
    		$("#v01040_user_label").html("用户数");
    		$("#v01040_flow_label").html("流量<span>(GB)</span>");
    		$("#v01040_download_label").html("下载速率<span>(Mbps)</span>");
    		$("#v01040_delay_label").html("响应时延<span>(ms)</span>");
    	}
    }
    
    /**
     * 模块中间部分数据(用户数、流量、下载速率、响应时延)
     * @param result
     */
    var indicatorKpiHandler = function (result) {
        if (result.code != 0) {
            return;
        }
        $("#v01040_user_num_sum").ipsnum({value: result.data[0].USER_NUM, animation: 'random', numHeight: 31});
        $("#V01040_flow_num_sum").ipsnum({value: result.data[0].FLOW_NUM, animation: 'random', numHeight: 31});
        $("#v01040_download_rate_sum").ipsnum({
            value: result.data[0].DOWNLOAD_RATE,
            animation: 'random',
            numHeight: 31
        });
        $("#v01040_delay_time_sum").ipsnum({value: result.data[0].DELAY_TIME, animation: 'random', numHeight: 31});
    }

    /**
     * 模块底部数据(用户数、流量、下载速率、响应时延细分指标)
     */
    var detailArray = ["USER_NUM", "FLOW_NUM", "DOWNLOAD_RATE", "DELAY_TIME"]
    var indicDetailHandler = function (result) {
        if (result.code != 0) {
            return;
        }
        if(result.data.length == 0) {
        	$("#v01040 .bottomKpi>div:nth-child(2)").removeClass("v01040_detailBg");
        } else {
        	$("#v01040 .bottomKpi>div:nth-child(2)").addClass("v01040_detailBg");
            for (var i = 0; i < detailArray.length; i++) {
                for (var j = 0; j < 5; j++) {
                    $("#v01040_" + detailArray[i] + " tr:nth-child(" + (j + 1) + ") td:first-child").text(j < result.data.length ? result.data[j].TYPE_NAME : "");
                    $("#v01040_" + detailArray[i] + " tr:nth-child(" + (j + 1) + ") td:last-child").text(j < result.data.length ? result.data[j][detailArray[i]] : "");
                    /*$("#v01040_" + detailArray[i] + " tr:nth-child(" + (j+1) + ") td:last-child").ipsnum({
                     value: j < result.data.length ? result.data[j][detailArray[i]] : "",
                     animation: 'random',
                     numHeight: 36
                     });*/
                }
            }
        }
    }

    /**
     * 模块底部数据(用户数、流量、下载速率、响应时延细分指标)table内容清空和初始化
     */
    var clearAndIntIndicDetail = function () {
        for (var i = 0; i < detailArray.length; i++) {
            var str = " 	 <tr>" +
                "	    <td></td>" +
                "	    <td></td>" +
                "	</tr>" +
                "	<tr>" +
                "	    <td></td>" +
                "	    <td></td>" +
                "	</tr>" +
                "	<tr>" +
                "	    <td></td>" +
                "	    <td></td>" +
                "	</tr>" +
                "	<tr>" +
                "	    <td></td>" +
                "	    <td></td>" +
                "	</tr>" +
                "	<tr>" +
                "	    <td></td>" +
                "	    <td></td>" +
                "	</tr>";

            $("#v01040_" + detailArray[i]).html(str);
        }
    }

    return {
        init: init
    };
});