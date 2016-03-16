var ips = (function(){
	
	var initView = function (viewId) {
			
		$.get("views/"+viewId+"/"+viewId+".html", function (text) {
		      $(".ips-app").append(text);
		      
		      require(["views/"+viewId+"/"+viewId], function (viewjs) {
		    	  viewjs.init();
		      });
		});
	};
	
	var windowManager = {
			
		open: function(from, to) {
			var app = $("#ips-app");
			var win1 = $("#ips-window1");
			var win2 = $("#ips-window2");
			var fromView = $("#"+from);
			
			// 1. 将当前的dom添加到ips-window中
			app[0].removeChild(fromView[0]);
			win1[0].appendChild(fromView[0]);
			
			// 2. 将ips-app虚化
			app.addClass("ips-mask");
			
			// 3. 将fromView高亮
			win1.css("display", "block");
			fromView.removeClass("ips-heartbeat");
			fromView.addClass("ips-focus");
			
			// 4. 加载toView
			$.get("views/"+to+"/"+to+".html", function (text) {
				// 4.1 添加toView
				win2.append(text);
				var toView = $("#"+to);
				
				// 4.2 fromView动画
				var fromCss = {
					transition: '',
					left: fromView.css("left"),
					top: fromView.css("top"),
					width: fromView.css("width"),
					height: fromView.css("height"),
					transform: "perspective(1000px) rotate3d(0, 1, 0, 0deg)",
					opacity: 1
				}
				// 当fromView动画结束时，将fromView恢复为初始状态
				fromView.one("transitionend", function(){
					win1.css("dispaly", "none");
					fromView.removeClass("ips-focus");
					fromView.css(fromCss);
					win1[0].removeChild(fromView[0]);
					app[0].appendChild(fromView[0]);
				});
				fromView.css({
					transition: 'all 2s',
					width: toView.css("width"),
					height: toView.css("height"),
					left: toView.css("left"),
					top: toView.css("top"),
					transform: "perspective(1000px) rotate3d(0, 1, 0, 180deg)",
					opacity: 0
				});
				
				// 4.3 toView动画
				win2.css("display", "block");
				toView.css({opacity: 0});
				setTimeout(function(){
					toView.css({
						    transition: "all 2s",
						    opacity: 1
						});
					
					// 4.4 toView装载数据
				    require(["views/"+to+"/"+to], function (viewjs) {
				    	viewjs.init();
				    });
					}, 1000);
				
			});
		},
		
		close: function(from, to) {
			var app = $("#ips-app");
			var win1 = $("#ips-window1");
			var win2 = $("#ips-window2");
			var fromView = $("#"+from);	
			var toView = $("#"+to);
			
			// 当fromView动画结束时，将fromView恢复为初始状态
			fromView.one("transitionend", function(){
				win2.css("dispaly", "none");
				win2.empty();
				app.removeClass("ips-mask");
			});
			
			// fromView动画
			fromView.css({
				width: toView.css("width"),
				height: toView.css("height"),
				left: toView.css("left"),
				top: toView.css("top"),
				transform: "perspective(1000px) rotate3d(0, 1, 0, -180deg)",
				opacity: 0
			});
		}
	};
	
	var querier = {
		queryData: function(/*string*/ key, /*object*/ param, /*function*/ callback) {
			$.get("db/query?key="+key, param, callback);
		},
		updateData: function(/*string*/ key, /*object*/ param, /*function*/ callback) {
			$.get("db/update?key="+key, param, callback);
		},
		queryView: function(/*string*/ key, /*object*/ param, /*function*/ callback) {
			$.get("view/query?key="+key, param, callback);
		},
		handleData:function(handle, param, callback) {
			$.get("db/handle?key="+handle, param, callback);
		},
		handleView:function(handle, param, callback) {
			$.get("view/handle?key="+handle, param, callback);
		}
	};
	
	var consumer = {
		stompClient: null,
		reconnectTimeId: 0,
		dataMapper: {},
		viewMapper: {},
		
		connect: function() {
			var self = this;
			var socket = new SockJS("/ips/socket");
			this.stompClient = Stomp.over(socket);
			this.stompClient.connect("guest", "guest", function(){self.connectCallback();}, function(err){self.errorCallback(err)});
		},
		
		connectCallback: function() {
			console.debug("[socket] connect successfully");
			var self = this;
			// subscribe and response to data result
			this.stompClient.subscribe("/topic/data", function(msg) {
				var key = msg.headers["ips-key"];
				if(self.dataMapper[key]) {
					self.dataMapper[key](msg.body);
				}
			});
			// subscribe and response to view result
			this.stompClient.subscribe("/topic/view", function(msg) {
				var key = msg.headers["ips-key"];
				if(self.viewMapper[key]) {
					self.viewMapper[key](msg.body);
				}
			});
			// subscribe and response to operation
			this.stompClient.subscribe("/topic/oper", function(msg) {
				var oper = JSON.parse(msg.body);
				var eventTarget = oper.eventTarget;
				if(eventTarget) {
					$(eventTarget).trigger(oper.eventType, oper);
				}
			});
		},
		
		errorCallback: function(error) {
			console.debug("[socket] connect failed: " + error);
			if(this.reconnectTimeId > 0) {
				clearTimeout(this.reconnectTimeId);
				this.reconnectTimeId = 0;
			}
			var self = this;
			this.reconnectTimeId = setTimeout(function(){
				console.debug("[socket] reconnecting...");
				self.connect();
			}, 10000);
		},
		
		subscribeData:function(/*string*/ key, /*function*/ callback) {
			this.dataMapper[key] = callback;
			this.stompClient.send("/receiver/data", {}, key);
		},
		
		subscribeView:function(/*string*/ key, /*function*/ callback) {
			this.viewMapper[key] = callback;
			this.stompClient.send("/receiver/view", {}, key);
		}
		
	};
	
	var trigger = function(eventTarget, eventType, eventParam) {
    	var param = eventParam || {};
    	param.eventTarget = eventTarget;
    	param.eventType = eventType;
    	var str = JSON.stringify(param);
    	$.ajax({ 
            type:"POST", 
            url:"oper/send?", 
            dataType:"json",      
            contentType:"application/json",               
            data: str
         }); 
	};
	
	return {
		initView: initView,
		init: function(){consumer.connect();},
		subscribeData: function(key, callback) {consumer.subscribeData(key, callback);},
		subscribeView: function(key, callback) {consumer.subscribeView(key, callback);},
		queryData: function(key, param, callback) {querier.queryData(key, param, callback);},
		queryView: function(key, param, callback) {querier.queryView(key, param, callback);},
		handleData: function(key, param, callback) {querier.handleData(key, param, callback);},
		handleView: function(key, param, callback) {querier.handleView(key, param, callback);},
		updateData: function(key, param, callback) {querier.updateData(key, param, callback);},
		openWindow: function(from, to){windowManager.open(from, to);},
		closeWindow: function(from, to){windowManager.close(from, to);},
		trigger: trigger
	};
})();

$(function(){
	ips.init();
});
