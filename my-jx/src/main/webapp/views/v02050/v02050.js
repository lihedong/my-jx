define(['plugins/echarts-3.1.2/echarts.min'],function (echarts) {
    var timer;
    var regionId;
    var myDetailChart;
    var init = function () {
        regionId = 100;
        initView(regionId);
        timer = setInterval(function(){
            initView(100);
        }, 3*60*1000);

        initLinstener();
    };

    var initView = function(regionId) {
        ips.queryData("s02050_emergencyRes",{"region_id":regionId},emergencyResHandler);
        ips.queryView("v02050netComplain",{"region_id":regionId},netComplainHandler);
    };

    var initLinstener = function() {
        $(".v02030").bind("CHANGE_REGION_EVENT",function(evt, param){
            regionId = param.region_id;
            clearInterval(timer);
            initView(regionId);
            timer = setInterval(function(){
                initView(regionId);
            }, 3*60*1000);
        });
        
        $("#v02050").bind("SHOW_COMPLAIN_DETAIL",function(evt,param){
        	var name = param.name;
        	$('#v02050_detialChartBg').show();
            ips.queryView("v02050netComDetail",{region_id:regionId, ne_type:name},function(result){
                myDetailChart = AmCharts.makeChart("v02050_detialChart", new Function(result.data)());
                $('#v02050_detialChart').on('click',function(evt){
                	ips.trigger("#v02050", "HIDE_COMPLAIN_DETAIL", {});
                });
            });
        });
        
        $("#v02050").bind("HIDE_COMPLAIN_DETAIL",function(evt,param){
        	$('#v02050_detialChartBg').hide();
            myDetailChart.clear();
        });
    };

    var emergencyResHandler = function(result) {
        if(result.code != 0) {
            return;
        }
        if(result.data.length > 0) {
            $("#v02050_time").html(result.data[0].START_TIME);
            for(var i = 0; i < result.data.length; i++) {
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(0)").html(result.data[i].RES_TYPE);
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(1)").html(result.data[i].RES_INUSE);
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(2)").html(result.data[i].RES_FREE);
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(3)").html(result.data[i].RES_TOTAL);
            }
        } else {
            $("#v02050_time").html("");
            for(var i = 0; i < 5; i++) {
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(0)").html("");
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(1)").html("");
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(2)").html("");
                $("#v02050_emergencyRes>tr:eq(" + i + ")>td:eq(3)").html("");
            }
        }

    };

    var netComplainHandler = function(result) {
        if(result.code != 0) {
            return;
        }
        var myChart = echarts.init(document.getElementById('v02050_pieChart'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(new Function(result.data)());
        myChart.on('click',function(evt){
        	var name = evt.name;
        	ips.trigger("#v02050", "SHOW_COMPLAIN_DETAIL", {"name": name});
        });
    }

    return {
        init: init
    };
});