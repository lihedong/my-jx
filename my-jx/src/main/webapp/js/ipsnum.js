(function(q){
    q.fn.ipsnum = function(opt) {
        
        var dom = this;
        
        var animRoll = {
            cfg: {
                value: 'null',
                speed: 1000,
                interval: 0
            },
            
            newValue: 0,
            
            domHeight: "25px",
            
            run: function() {
                this.init();
                this.play();
            },
            
            init: function() {
                this.cfg = q.extend(this.cfg, opt);
                
                if(dom.data("itervalId")) {
                    clearInterval(dom.data("itervalId"));
                }
                
                this.newValue = this.cfg.value;
                this.domHeight = dom.innerHeight() + "px";
                if(q("div", dom).length == 0) {
                    dom.empty();
                    dom.append("<div style=\"line-height:"+this.domHeight+";\">000</div><div style=\"line-height:"+this.domHeight+";top:-25px;display:none;\"></div>");
                }
                
                if(this.cfg.interval > 0) {
                    var intervalId = setInterval(function(){animRoll.play();}, opt.interval);
                    dom.data("itervalId", intervalId);
                }
            },
            
            play: function() {
                var items = q("div", dom),oldItem,newItem;
                var self = this;
                items.each(function(){
                    if(this.style.display == "none") {
                        newItem = q(this);
                        newItem.text(self.newValue);
                    }else {
                        oldItem = q(this);
                    }
                });
                
                oldItem.animate({top:"-"+this.domHeight, opacity: 0}, 
                    this.cfg.speed-this.cfg.speed / 1.2,
                    function(){oldItem.css("display", "none");});
                
                newItem.css({top: this.domHeight,display: "block"});
                newItem.animate({opacity: 1, top: 0}, this.cfg.speed-this.cfg.speed / 2.5);
            }
        };
        
        var animRandom = {
            cfg: {
                value: 'null',
                stepSpeed: 3,
				numHeight: 50
            },
            
            numarr: [],
            
            reg: /^[0-9]+$/, 
            
            run: function() {
                this.init();
                var self = this;
                var myid = setTimeout(function(){
                    self.play();
                    clearTimeout(myid);
                }, 100);
            },
            
            init: function(){
                this.cfg = q.extend(this.cfg, opt);
                this.numarr = this.cfg.value.toString().split("");
                if($("ul", dom).length != this.numarr.length) {
                    dom.empty();
										
					var html = "<ul style=\"list-style:none; margin:0; padding:0; float:left; position:relative;\">";
					for(var j=0; j<10; j++) {
							html += "<li style=\"height:"+this.cfg.numHeight+"px\">"+j+"</li>";
					}
					html += "</ul>";
														
                    for(var i=0; i<this.numarr.length; i++) {
                        if(!this.reg.test(this.numarr[i])) {
                            dom.append("<ul style=\"list-style:none; margin:0; padding:0; float:left; font-family:'microsoft yahei';\"><li>"+this.numarr[i]+"</li></ul>");
                        }else {
                            dom.append(html);
                        }
                    }
                }
            },
            
            play: function() {
                var ularr = q("ul", dom);
                var domHeight = dom.innerHeight();
                var numHeight = this.cfg.numHeight; //q("li", dom).eq(0).innerHeight();
                var offset = (domHeight-numHeight)/2;
                
                for(var i=0; i<this.numarr.length; i++) {
                	
                  if(!this.reg.test(this.numarr[i])){
                	ularr.eq(i).html(this.numarr[i]);
                  }
                  var to = 0 - parseInt(this.numarr[i])*numHeight - offset;
                  var from = 0 - Math.floor(Math.random()*9)*numHeight -offset;
                  var ul = ularr.eq(i);
                  var speed = this.cfg.stepSpeed * Math.abs(to-from);
                  ul.css("top", from+"px");
                  ul.animate({top: to+"px"}, speed, "linear");
                }
            }
        };
        
        var animName = opt.animation || 'roll';
        var animObj
        if(animName == "roll") {
            animObj = animRoll;
        }else if(animName == "random") {
            animObj = animRandom; 
        }
        animObj.run();
        
    };
})(jQuery);
