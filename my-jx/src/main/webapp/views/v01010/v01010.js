define(function() {
	var gjbz,gcpb,gjgl,pdgz,timer;
	var init = function() {
		$(".v01010-alarm-remove").slideUp();
//		$(".v01010-alarm-remove").hide();
		ips.queryData("s01010_01",getResultData);
		timer = setInterval(queryData,1000*60*5);
	};
	function queryData(){
		$(".v01010-alarm-remove").slideUp();
		ips.queryData("s01010_01",getResultData);
	}
	function getResultData(result){
		
		if(!result ) {
			return;
		}
		$(".v01010-alarm-remove").slideDown(5000);
		$('#v01010_startTime').text(result.data[0].START_TIME);
		$('#g2').ipsnum({value:result.data[0].GSM_OUT_BTS_NUM?result.data[0].GSM_OUT_BTS_NUM:0,animation:'random',numHeight:"38"});
		$('#g3').ipsnum({value:result.data[0].TD_OUT_BTS_NUM?result.data[0].TD_OUT_BTS_NUM:0,animation:'random',numHeight:"38"});
		$('#g4').ipsnum({value:result.data[0].LTE_OUT_BTS_NUM?result.data[0].LTE_OUT_BTS_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-td-value').ipsnum({value:result.data[0].POWERCUT_BTS_NUM?result.data[0].POWERCUT_BTS_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-zd-value').ipsnum({value:result.data[0].LIGHT_STOP_NUM?result.data[0].LIGHT_STOP_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-alarm-value').ipsnum({value:result.data[0].TOTAL_ALARM_NUM?result.data[0].TOTAL_ALARM_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-bzalarm-value').ipsnum({value:result.data[0].STANDARD_ALARM_NUM?result.data[0].STANDARD_ALARM_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-fgcalarm-value').ipsnum({value:result.data[0].NONPROJECT_ALARM_NUM?result.data[0].NONPROJECT_ALARM_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-pdalarm-value').ipsnum({value:result.data[0].ORDER_ALARM_NUM?result.data[0].ORDER_ALARM_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-ssalarm-value').ipsnum({value:result.data[0].TIME_ORDER_NUM?result.data[0].TIME_ORDER_NUM:0,animation:'random',numHeight:"38"});
		gjbz=((result.data[0].STANDARD_ALARM_NUM-result.data[0].TOTAL_ALARM_NUM)/result.data[0].TOTAL_ALARM_NUM*100).toFixed(2);
		gcpb=((result.data[0].NONPROJECT_ALARM_NUM-result.data[0].STANDARD_ALARM_NUM)/result.data[0].STANDARD_ALARM_NUM*100).toFixed(2);
		gjgl=((result.data[0].ORDER_ALARM_NUM-result.data[0].NONPROJECT_ALARM_NUM)/result.data[0].NONPROJECT_ALARM_NUM*100).toFixed(2);
		pdgz=((result.data[0].TIME_ORDER_NUM-result.data[0].ORDER_ALARM_NUM)/result.data[0].ORDER_ALARM_NUM*100).toFixed(2);

		$('#v01010-gjbz-value').ipsnum({value:gjbz?gjbz+"%":0,animation:'random',numHeight:"38"});
		$('#v01010-gcpb-value').ipsnum({value:gcpb?gcpb+"%":0,animation:'random',numHeight:"38"});
		$('#v01010-gjgl-value').ipsnum({value:gjgl?gjgl+"%":0,animation:'random',numHeight:"38"});
		$('#v01010-pdgz-value').ipsnum({value:pdgz?pdgz+"%":0,animation:'random',numHeight:"38"});
		
		$('#v01010-T1-value').ipsnum({value:result.data[0].T1_ORDER_NUM?result.data[0].T1_ORDER_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-T2-value').ipsnum({value:result.data[0].T2_ORDER_NUM?result.data[0].T2_ORDER_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-gd-value').ipsnum({value:result.data[0].VERIFIED_ORDER_NUM?result.data[0].VERIFIED_ORDER_NUM:0,animation:'random',numHeight:"38"});
		$('#v01010-alarm-pd-value').ipsnum({value:result.data[0].SEND_ORDER_ALARM_RATE?result.data[0].SEND_ORDER_ALARM_RATE:0,animation:'random',numHeight:"38"});
	}
	return {
		init : init
	};
});