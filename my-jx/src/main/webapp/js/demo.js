/**
 * 订阅数据
 */
function subdata(){
	var inputdata = document.getElementById('inputSubData');
	var txtdata = document.getElementById('txtdata');
	ips.subscribeData(inputdata.value, function(result){
	    txtdata.value = txtdata.value + result + "\n"; 
	});
}

/**
 * 订阅视图
 */
function subview(){
	var inputview = document.getElementById('inputSubView');
	var txtview = document.getElementById('txtview');
	ips.subscribeView(inputview.value, function(result){
	    txtview.value = txtview.value + result + "\n"; 
	});
}

/**
 * 发布数据
 */
function pubdata() {
	var inputdata = document.getElementById('inputPubData');
	$.get("redis/update?key="+inputdata.value, function(result){
		console.debug(result);
	});
}

/**
 * 发布视图
 */
function pubview() {
	var inputview = document.getElementById('inputSubView');
	$.get("view/update?key="+inputview.value, function(result){
		console.debug(result);
	});
}

/**
 * 查询数据
 */
function queryData() {
	ips.queryData("s0001_01", {start_time:'2015-10-10 09:00:00', end_time:'2015-10-10 17:00:00'}, function(result){
	    txtdata.value = txtdata.value + result.data + "\n"; 
	});	
}

/**
 * 更新数据
 */
function updateData() {
	ips.updateData("s0001_03", {start_time:'2015-10-10 09:00:00'}, function(result){
	    txtdata.value = txtdata.value + result.data + "\n"; 
	});	
}

/**
 * 查询视图
 */
function queryView() {
	ips.queryView("v0002", {start_time:'2015-10-10 09:00:00', end_time:'2015-10-10 17:00:00'}, function(result){
	    txtview.value = txtview.value + result.data + "\n"; 
	});		
}

/**
 * 处理数据
 */
function handleData() {
	ips.handleData("testDataHandler", {region_name:'贵阳'}, function(result){
	    txtdata.value = txtdata.value + result.data + "\n"; 
	});	
}

/**
 * 处理视图
 */
function handleView() {
	ips.handleView("testViewHandler", {region_name:'贵阳'}, function(result){
	    txtview.value = txtview.value + result.data + "\n"; 
	});		
}