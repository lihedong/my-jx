define(function() {
	// 半径级别:[num1, num2] num1为基数，num2为可增加的最大值
	var alarmLevel = {
		"1" : [ 230, 20 ],// 1
		"2" : [ 185, 20 ],// 2
		"3" : [ 130, 20 ],//3
		"4" : [45, 50]//4
	// green
	};
	// 旋转角度范围划分[num1, num2] num1为基数，num2为可增加的最大值
//	var cityRange = {
//		"九江" : [ 3, 26 ],
//		"上饶" : [ 35, 26 ],
//		"景德镇" : [ 68, 24 ],
//		"萍乡" : [ 99, 24 ],
//		"新余" : [ 129, 26 ],
//		"鹰潭" : [ 161, 26 ],
//		"赣州" : [ 193, 26 ],
//		"宜春" : [ 227, 25 ],
//		"吉安" : [ 260, 27 ],
//		"抚州" : [ 295, 26 ],
//		"南昌" : [ 329, 26 ]
//	}
	// 存储圆环动画对象
	var kpiAnimateMap = {};

	var init = function() {
		queryData();
		setInterval(queryData, 1000*60*5);
	};

	var queryData = function() {
		ips.queryData('s01020_01', resultHandler);
		ips.queryData('s01020_02', resultHandler2);// 告警打点
		ips.queryData('s01020_03', resultHandler3);// 网元数
	}

	var resultHandler2 = function(result) {
		if (!result || !result["data"]) {
			return;
		}
		showPoint(result["data"]);
	}
	
	var resultHandler3 = function(result){
		if (!result || !result["data"]) {
			return;
		}
		$("#v01020-net-fault").ipsnum({
			value : result.data[0].NET_FAULT,
			animation : 'random',
			numHeight : 40
		});
		$("#v01020-net-normal").ipsnum({
			value : result.data[0].NET_NORMAL,
			animation : 'random',
			numHeight : 40
		});
	}

	/* 打点 */
	var showPoint = function(data) {
		$('#radar').html('');
		//存放1级告警点的信息，在点上添加label显示告警名称
		var pointArr = [];
		var obj;
		var str = '';

		// 各级别告警打点
		for (var i = 0; i < data.length; i++) {
			obj = data[i];
			var value = alarmLevel[obj['ALARM_LEVEL']][0] + Math.random()
					* (alarmLevel[obj['ALARM_LEVEL']][1]);
			/*var degree = cityRange[obj["REGION_NAME"]][0] + rdm
					* (cityRange[obj["REGION_NAME"]][1]);*/
			var degree = Math.random() * 360;
			if ('1' == obj['ALARM_LEVEL']) {
				pointArr.push({
					'id' : 'point' + i,
					'name' : obj["ALARM_NAME"]
				});
				str += '<div style="position:absolute;left:350px;top:'
						+ value
						+ 'px;width:14px;height:14px;border-radius:14px;background: #ff0000;'
						+ 'border:2px solid #ffffff;transform:rotate(' + degree
						+ 'deg);-moz-transform-origin:0px ' + (300 - value)
						+ 'px;-webkit-transform-origin:0px ' + (300 - value)
						+ 'px;" id="point' + i + '"></div>';
			} else {
				str += '<div style="position:absolute;left:350px;top:'
						+ value
						+ 'px;width:8px;height:8px;border-radius:14px;background: #66F4FF;transform:rotate('
						+ degree + 'deg);-moz-transform-origin:0px '
						+ (300 - value) + 'px;-webkit-transform-origin:0px '
						+ (300 - value) + 'px;" id="point' + i + '"></div>';
			}
		}
		$('#radar').append(str);

		// 给红色告警添加label
		str = '';
		for (var j = 0; j < pointArr.length; j++) {
			var x = $('#' + pointArr[j]['id']).position().left;
			var y = $('#' + pointArr[j]['id']).position().top;
			str += '<div style="text-align:center;"><img src="assets/images/app1/point-info.png" style="position:absolute;left:'
					+ (x - 36)
					+ 'px;top:'
					+ (y - 40)
					+ 'px;"><label style="position:absolute;top:'
					+ (y - 40)
					+ 'px;left:'
					+ (x - 30)
					+ 'px;width:74px;font-size: 20px;color:#000000;">'
					+ pointArr[j]['name'] + '</label></div>';
		}
		$('#radar').append(str);
	}

	var resultHandler = function(result) {
		if (!result || !result["data"]) {
			return;
		}
		var data = result["data"][0];
		$('#v01020_startTime').text(data.START_TIME);
		animateKpiValue("circle1-annimate-value", 0);
		$('#circle-annimate-num').ipsnum({
			value : data.LTE_JAMCELL_RATE,
			animation : 'random',
			numHeight : 38
		});
		animateKpiValue("circle2-annimate-value", data["LTE_BADCELL_RATE"]);
		$('#circle-annimate-num1').ipsnum({
			value : data.LTE_BADCELL_RATE,
			animation : 'random',
			numHeight : 38
		});
		animateKpiValue("circle3-annimate-value", data["WIRELESS_FAIL_RATE"]);
		$('#circle-annimate-num2').ipsnum({
			value : data.WIRELESS_FAIL_RATE,
			animation : 'random',
			numHeight : 38
		});
		animateKpiValue("circle4-annimate-value", data["MME_SUCC_RATE"]);
		$('#circle-annimate-num3').ipsnum({
			value : data.MME_SUCC_RATE,
			animation : 'random',
			numHeight : 38
		});

		$('#v01020-dns').ipsnum({
			value : data["DNS_PARSE_RATE"] + '%',
			animation : 'random',
			numHeight : 38
		});
		$('#v01020-addr').ipsnum({
			value : data["ADDR_USE_RATE"] + '%',
			animation : 'random',
			numHeight : 38
		});
		$('#v01020-band').ipsnum({
			value : data["BROADBAND_USE_RATE"] + '%',
			animation : 'random',
			numHeight : 38
		});
	}

	/**
	 * 指标动画
	 */
	function animateKpiValue(domId, kpiValue) {
		var annimateObj = kpiAnimateMap[domId];
		if (annimateObj) {
			annimateObj.value(0);
			$('#' + domId).data('radialIndicator').animate(kpiValue);
			return;
		}
		var containerObj = $('#' + domId).radialIndicator({
			barColor : '#66f4ff',
			barBgColor : '#006666',
			fontColor : '#ffff00',
			fontFamily : 'lcdnum',
			fontSize : 30,
			radius : 52,
			barWidth : 20,
			initValue : 0,
			displayNumber:false
		});
		annimateObj = $('#' + domId).data('radialIndicator');
		annimateObj.animate(kpiValue);
		kpiAnimateMap[domId] = annimateObj;
	}

	return {
		init : init
	};
});