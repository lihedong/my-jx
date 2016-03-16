define(function() {
	var map;
	var region_name = '江西';
	var heatmapOverlay;
	var drawingManager;
	var overlays = [];
	
	var init = function() {
		map = new BMap.Map("v02030_map", {
			mapType: BMAP_HYBRID_MAP
		});
		map.centerAndZoom(new BMap.Point(115.91646, 28.68047), 8);
		map.enableScrollWheelZoom(true);
		//显示地市地图
		loadRegionMap(region_name);
		//放大拖动地图监听事件
		initEventListeners();
		//台风
		//loadTyphoon();
		//显示打点选项
		showCheckBoxOption();
		//显示地市选择
		showRegionOption();
		//选择各地市区县
		selectedRegion();
		//加载热图
		//loadHeatMap(region_name);
		//加载复选框各个指标的值
	    loadCheckBoxIndicator();
		//复选框选择事件
		selectedCheckBox();
		//框选
		loadDrawPolygon();
	}

	var loadRegionMap = function(region_name) {
		// 清除地图覆盖物
		map.clearOverlays();
		
		var boundarys = new BMap.Boundary();
		boundarys.get(region_name, function(rs) {
			// 行政区域的点有多少个
			var count = rs.boundaries.length;
			// 建立多边形覆盖物
			var pointArray = [];
			for (var i = 0; i < count; i++) {
				var ply = new BMap.Polygon(rs.boundaries[i], {
					strokeWeight: 5,
					strokeColor: "#56C2FF",
					fillColor: 'none'
				});
				// 建立多边形覆盖物
				map.addOverlay(ply);
				pointArray = pointArray.concat(ply.getPath());
			}
			map.setViewport(pointArray);
		});
	}
	
	var initEventListeners =function(){
		//缩放级别事件
		map.addEventListener("zoomend", function() {
			if (map.getZoom() < 13) {
				$("#v02030_select").slideUp(1000);
				clearAll();
			}
		});
        //拖拽事件
		map.addEventListener("dragend", function() {
//			alert("开始拖拽......");
//			//map.clearOverlays();
//			//map.removeOverlay(marker); 
//			//ips.queryData('s02030_btsInfo', resultHandler);
//			alert("拖拽结束......");
		});
	}
	
	var loadHeatMap= function(region_name){
		var points=[];
		heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
		map.addOverlay(heatmapOverlay);
		if (region_name=="江西") {
			ips.queryData("s02030_regionHeatMapInfo", {
				"region_name": region_name
			}, function(result) {
				for (var i = 0; i < result.data.length; i++) {
					points.push({
						"lng": result.data[i].LONGITUDE,
						"lat": result.data[i].LATITUDE,
						"count": result.data[i].COUNT
					});
				}
				heatmapOverlay.setDataSet({
					data: points,
					max: 100
				});
			});			
		} else {
			ips.queryData("s02030_cityHeatMapInfo", {
				"region_name": region_name
			}, function(result) {
				for (var i = 0; i < result.data.length; i++) {
					points.push({
						"lng": result.data[i].LONGITUDE,
						"lat": result.data[i].LATITUDE,
						"count": result.data[i].COUNT
					});
				}
				heatmapOverlay.setDataSet({
					data: points,
					max: 100
				});
			});	         
		}
	}
	
	var loadCheckBoxIndicator = function() {
		ips.queryData("s02030_totalNum", function(result) {
			if (result.code == 0) {
				for (var i = 0; i < 27; i++) {
					$("#checkbox" + (i+1) + "~span:last-child").html("(" + result.data[i].COUNTS + ")");
				}
			}
		});
	}
	
	//是否显示热力图
	var openHeatmap = function() {
		heatmapOverlay.show();
	}
	var closeHeatmap = function() {
		heatmapOverlay.hide();
	}
	var selectedCheckBox = function() {
		$("input[type='checkbox']").change(function(event) {
			/**当isSelected==1时，表示可视区域内打点后不支持框选。
			当isSelected==0在可视区域内打点后可进行框选;*/
			var imgPath = $("input[id=" + event.target.id + "]~img").attr("src");
			var myIcon = new BMap.Icon(imgPath, new BMap.Size(60, 60), {});
			if (event.target.checked) {
				switch (event.target.getAttribute("data-select")) {
					case "0":
						if (map.getZoom()<13) {
							alert("不允许选择，请放大到一定级别后打点，谢谢！");
							event.target.checked=false;
						}else{
						ips.queryData(event.target.getAttribute("data-sql"), {}, function(result) {
							var bounds = map.getBounds();
							if (result.code == 0 && result.data.length > 0) {
								for (var i = 0; i < result.data.length; i++) {
									var point = new BMap.Point(result.data[i].LONGITUDE, result.data[i].LATITUDE);
									if (BMapLib.GeoUtils.isPointInRect(point,bounds)) {
										addMarker(point, myIcon);
									}
								}
								$("#v02030_select").slideDown(1000);
								$(".v02030_select_start").on("click",openDrawingManager);
								$(".v02030_select_clear").on("click",clearAll);
								alert("打点完毕，可进行框选！");
							}
						});
						}
						break;
					case "1":
						if (map.getZoom()<13) {
							alert("不允许选择，请放大到一定级别后打点，谢谢！");
							event.target.checked=false;
						}else{
						ips.queryData(event.target.getAttribute("data-sql"), {}, function(result) {
							var bounds = map.getBounds();
							if (result.code == 0 && result.data.length > 0) {
								for (var i = 0; i < result.data.length; i++) {
									var point = new BMap.Point(result.data[i].LONGITUDE, result.data[i].LATITUDE);
									if (BMapLib.GeoUtils.isPointInRect(point,bounds)) {
										addMarker(point, myIcon);
									}
								}
							}
						});
						}
						break;
					default:
					ips.queryData(event.target.getAttribute("data-sql"), {}, function(result) {
						if (result.code == 0 && result.data.length > 0) {
							for (var i = 0; i < result.data.length; i++) {
								var point = new BMap.Point(result.data[i].LONGITUDE, result.data[i].LATITUDE);
									addMarker(point, myIcon);
							}
						}
					});
					break;
				}
			} else if (!event.target.checked) {
				var allOverlay = map.getOverlays();
				for (var i = 0; i < allOverlay.length; i++) {
					//重点研究obj.constructor的使用方法和意义
					if (allOverlay[i].constructor == BMap.Marker && allOverlay[i].getIcon().imageUrl == imgPath) {
						map.removeOverlay(allOverlay[i]);
					};
				}
			}
		});
	}
	var addMarker=function(point,myIcon){
		// 创建标注对象并添加到地图   
		 var marker = new BMap.Marker(point, {icon: myIcon});    
		 map.addOverlay(marker);	
	}
	
	var removeMarker=function(icon){
		 //删除marker
		 map.addOverlay(marker);	
	}
	
	
    //监听地市选择按钮
	var showRegionOption = function() {
		$("#v02030_show_btn").on("click", function() {
			if ($("#v02030_region_triangle").hasClass("v02030_region_triangle_up")) {
				$("#v02030_region_triangle").removeClass("v02030_region_triangle_up").addClass("v02030_region_triangle_down");
				$("#v02030_region").slideDown(1000);
			} else if ($("#v02030_region_triangle").hasClass("v02030_region_triangle_down")) {
				$("#v02030_region_triangle").removeClass("v02030_region_triangle_down").addClass("v02030_region_triangle_up");
				$("#v02030_region").slideUp(1000);
			}
		})
	}
	
	var showCheckBoxOption = function() {
		$("#v02030_btn").on("click", function() {
			if ($("#v02030_btn div").hasClass("triangle-up")) {
				$("#v02030_btn div").removeClass("triangle-up").addClass("triangle-down");
				$("#v02030_content").slideDown(1000);
			} else if ($("#v02030_btn div").hasClass("triangle-down")) {
				$("#v02030_btn div").removeClass("triangle-down").addClass("triangle-up");
				$("#v02030_content").slideUp(1000);
			}
		});
	}
	
	var loadTyphoon=function () {
		ips.queryData("s02031_typhoonInfo", {}, function(result){
			 if (result.code != 0) {
		        return;
		     }
		     for(var i = 0; i < result.data.length; i++) {
		    	 //台风路径
		    	 ips.queryData("s02031_typhoonRoute",{status:0},function(result){
		    		 var pointArr = new Array();
		    		 for(x in result.data) {
		    			 pointArr.push(new BMap.Point(result.data[x].LONGITUDE,result.data[x].LATITUDE));
		    		 }
		    		 var polyline = new BMap.Polyline(pointArr, {strokeColor:"#51ABBF", strokeWeight:2, strokeOpacity:1});   //创建折线
		    		 map.addOverlay(polyline);   //增加折线
		    		 
		    		 if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
		    	        var options = {
		    	            size: BMAP_POINT_SIZE_SMALL,
		    	            shape: BMAP_POINT_SHAPE_CIRCLE,
		    	            color: '#FDAC03'
		    	        }
		    	        var pointCollection = new BMap.PointCollection(pointArr, options);  // 初始化PointCollection
		    	        map.addOverlay(pointCollection);  // 添加Overlay
		    	    } else {
		    	        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
		    	    }
		    	 });
		    	 //预计台风路径
		    	 ips.queryData("s02031_forcastTyphoonRoute",{},function(result){
		    		 var pointArr = new Array();
		    		 for(x in result.data) {
		    			 pointArr.push(new BMap.Point(result.data[x].LONGITUDE,result.data[x].LATITUDE));
		    		 }
		    		 var polyline = new BMap.Polyline(pointArr, {strokeColor:"#fff",strokeStyle:"dashed", strokeWeight:2, strokeOpacity:1});   //创建折线
		    		 map.addOverlay(polyline);   //增加折线
		    		 
		    		 if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
			    	        var options = {
			    	            size: BMAP_POINT_SIZE_SMALL,
			    	            shape: BMAP_POINT_SHAPE_CIRCLE,
			    	            color: '#fff'
			    	        }
			    	        var pointCollection = new BMap.PointCollection(pointArr, options);  // 初始化PointCollection
			    	        map.addOverlay(pointCollection);  // 添加Overlay
			    	    } else {
			    	        alert('请在chrome、safari、IE8+以上浏览器查看本示例');
			    	    }
		    	 });
		    	 //台风中心点位置
		    	 ips.queryData("s02031_typhoonRoute",{status:1},function(result){
		    		 for(x in result.data) {
		    			 var pt = new BMap.Point(result.data[x].LONGITUDE,result.data[x].LATITUDE);
			    		 var myIcon = new BMap.Icon("assets/images/app2/v02031_typhoon.png", new BMap.Size(75,75));
			    		 myIcon.setImageSize(new BMap.Size(75,75));
			    		 var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			    		 map.addOverlay(marker);              // 将标注添加到地图中
		    		 }
		    	 });
		     }
		});
	}
	
	var selectedRegion=function(){
		$(".v02030_region_btn").on("click",function(event){
			region_name =event.target.innerText;
			$(".v02030_show_regionName").html(region_name);
			loadRegionMap(region_name);
			loadHeatMap(region_name);
			ips.queryData("s02030_regionInfo", {"region_name":region_name}, regionInfoHandler);
		});
	}
	
	var regionInfoHandler = function(result){
		if (result.code==0) {
			var region_id=result.data[0].REGION_ID;
			ips.trigger(".v02030", "CHANGE_REGION_EVENT", {"region_id": region_id});
			ips.queryData("s02030_cityInfo", {"region_name":region_name}, cityInfoHandler);
		}
	}
	
	var cityInfoHandler = function(result){
		if (result.code==0) {
			$(".v02030_region_county").html("");
			var tds="" ;
			var table ="<table><tbody><tr>";
			if (result.data.length <= 10) {
				for (var i = 0; i < result.data.length; i++) {
					tds += '<td><label><input name="country_list" type="radio" value="' + result.data[i].CITY_NAME+","+result.data[i].REGION_ID + '"/>' + result.data[i].CITY_NAME + '</label>' + '</td>';
				}
				table += tds + "</tr></tbody></table>";
			} else if (result.data.length > 10) {
				var tr1 = "";
				var tr2 = "</tr><tr>";
				for (var i = 0; i < 10; i++) {
					tr1 += '<td><label><input name="country_list" type="radio" value="' + result.data[i].CITY_NAME +","+result.data[i].REGION_ID+'"/>' + result.data[i].CITY_NAME + '</label>' + '</td>';
				}
				for (var i = 10; i < result.data.length; i++) {
					tr2 += '<td><label><input name="country_list" type="radio" value="' + result.data[i].CITY_NAME +","+result.data[i].REGION_ID + '"/>' + result.data[i].CITY_NAME + '</label>' + '</td>';
				}
				table += (tr1 + tr2) + "</tr></tbody></table>";
			}
			$(".v02030_region_county").append(table);
			$("input[name='country_list']").on("click", function(event) {
				region_name=event.target.value.split(",")[0];
				loadRegionMap(region_name);
				var region_id=event.target.value.split(",")[1];
				ips.trigger(".v02030", "CHANGE_REGION_EVENT", {"region_id": region_id});
			});
		}
	}
	
	var loadDrawPolygon = function() {
		var overlaycomplete = function(e) {
			overlays.push(e.overlay);
			alert(e.overlay.ro.length);
			alert(e.overlay.ro[0].lat + ";" + e.overlay.ro[0].lng);
		};
		var styleOptions = {
			strokeColor: "red",
			fillColor: "red",
			strokeWeight: 3,
			strokeOpacity: 0.8,
			fillOpacity: 0.4,
			strokeStyle: 'solid'
		}
		drawingManager = new BMapLib.DrawingManager(map, {
			isOpen: false, //是否开启绘制模式
			enableDrawingTool: false, //是否显示工具栏
			drawingType: BMAP_DRAWING_POLYGON,
			drawingToolOptions: {
				anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
				offset: new BMap.Size(5, 5), //偏离值
			},
			polygonOptions: styleOptions //多边形的样式
		});
		drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
		drawingManager.addEventListener('overlaycomplete', overlaycomplete);
	}
	var openDrawingManager =function (){
    	  drawingManager.open(); 
    }
	
	var clearAll=function() {
		for(var i = 0; i < overlays.length; i++){
            map.removeOverlay(overlays[i]);
        }
        overlays.length = 0   
    }

	
	return {
		init : init
	};
});