(function($){
	
	$.tip = function(text){
        var panel = $("<div style='position:fixed;bottom:200px;left:0;padding:20px;text-align:center;width:100%;z-index:10002;'>"
                +"<span style='border-radius:6px;background:rgba(0,0,0,0.7);color:#FFFFFF;padding:10px 20px;font-size:18px;'>"+text+"</span>"
                +"</div>").appendTo(document.body);
        setTimeout(function(){
            panel.fadeOut(800,function(){
                panel.remove();
            });
        },1000);
    };

	/*
     * html5 tranform
     */
    var trans_end = "transitionend";
    if('onwebkittransitionend' in window) {
        trans_end = 'webkitTransitionEnd';
    } else if('onotransitionend' in document) {
        trans_end = 'oTransitionEnd';
    }

    var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
        (/firefox/i).test(navigator.userAgent) ? '' :
        (/MSIE/i).test(navigator.userAgent) ? 'ms' :
        'opera' in window ? 'O' : '';
/*
    $.fn.transform = function(opts){
        var el = $(this);
        if(opts.time || opts.end && trans_end){
            var h = function(){
                if(opts.time){
                    //el[0].style[vendor+"Transition"] = "";
                    if(vendor){
                        el.css("-"+vendor+"-Transition","");
                    }else{
                        el.css("Transition","");
                    }

                }
                //Event.remove(el,trans_end,h);
                el.unbind(trans_end);

                if(opts.end){
                    opts.end();
                }
            };
            el.bind(trans_end,h);
        }

        if(opts.time){
            if(opts.time > 100){
                opts.time = opts.time/1000;
            }
            if(vendor){
                el.css("-"+vendor+"-Transition","-"+vendor+"-transform "+opts.time+"s linear");
            }else{
                el.css("transition","transform "+opts.time+"s linear");
            }
        }

        var tranf = vendor ? "-"+vendor+"-Transform" : "transform";
        if("top" in opts && "left" in opts){
            el.css(tranf,"translate3d("+opts.left+"px,"+opts.top+"px,0)");
        }else if("top" in opts){
            el.css(tranf,"translate3d(0px,"+opts.top+"px,0)");
        }else if("left" in opts){
            el.css(tranf,"translate3d("+opts.left+"px,0px,0)");
        }else if("exp" in opts){
            el.css(tranf,opts.exp);
        }
    };*/


    $.fn.canvasPanel = function(html){
        return $("<div class='canvas_panel'></div>").css({
            position:"fixed",
            top : 0,left:0,
            "z-index":10,
            width:"100%",height:"100%",
            "text-align":'center',
            background:"rgba(100,100,100,0.7)"
        }).appendTo(this).append(html);
    };

    $.bottomConfirm = function(text,onsure,oncancel){
        var panel = $("<div style='position:fixed;bottom:0;left:0;width:100%;z-index:10001;background:#000000;opacity:0.6;padding:10px'>"
                +"<div style='padding:10px;'>"+text+"</div>"
                +"<button id='btn-default' type='button' class='btn btn-danger' style='position:relative;top:-6px;float:left;margin-left:30%;'>取消</button>"
                +"<button id='btn-primary' type='button' class='btn btn-success' style='position:relative;top:-6px;float:right;margin-right:30%;'>确定</button>"
                +"</div>").appendTo(document.body);
        
        panel.find("#btn-default").click(function(){
            if(typeof oncancel == "function"){oncancel();}
            panel.remove();
        });
        
        panel.find("#btn-primary").click(function(){
            if(typeof onsure == "function"){onsure();}
            panel.remove(); 
        });
    };



    $.fn.pager = function(callback){
        var pager = $(this);
        pager.find(".pager-page").click(function(){
            var page = $(this).attr("page");
            callback(page);
        });
        pager.find(".pager-next").click(function(){
            var page = parseInt(pager.attr("page"))+1;
            callback(page);
        });
        pager.find(".pager-pre").click(function(){
            var page = parseInt(pager.attr("page"))-1;
            callback(page);
        });
    };

   
    $.fn.onenter = function(callback){
        $(this).on("keypress",function(evt){
            if(evt.keyCode == 13 && typeof callback == "function"){
                callback(evt);
            }
        })
    };
    

    $.fn.scrollToBottom = function(){
        var nScrollHight = this[0].scrollHeight;
        if(nScrollHight > 0){
            this[0].scrollTop = nScrollHight;
        }
    };


    $.eventPos = function(evt){
        if(window.event && !evt){
            evt = window.event;
        }

        if(evt.originalEvent){
            evt = evt.originalEvent;
        }

        if(evt.touches) {
            var touch = (evt.targetTouches||evt.changedTouches)[0];
            if(touch){
                return {x:touch.pageX,y:touch.pageY};
            }else{
                return {x:evt.pageX,y:evt.pageY};
            }
        }

        return {x:evt.clientX,y:evt.clientY};
    };

    $.getQuery = function(name){
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1){
            return "";
        }
        return result[1];
    };
    
    $.form = {
        isID:function(str){
            str = str.toUpperCase();
            //身份证号码为18位,18位前17位为数字，最后一位是校验位，可能为数字或字符X。
            if (!(/(^\d{17}([0-9]|X)$)/.test(str)))
            {
                return false;
            }
            else
                return true;
        },
        isQQ : function(str){
            if(str.search(/^[1-9]\d{4,8}$/) !=-1){ 
                return true;
            } 
            if(str.length == 0){
                return true;  
            }
            else
                return false;
        },
        isTel : function(str){
             return (/^(([0\+]\d{2,3})?(0\d{2,3}))(\d{7,8})((\d{3,}))?$/.test(str)); 
        },
        hasBlank : function(str) {
            return str.indexOf(" ") == -1?true:false;
        },
        delBlank : function(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        },
        isNumber : function(str){
            return /[\d.]/.test(str)
        },
        //密码校验
        isSame : function(str1,str2){
            return str1 === str2?true:false; 
        },
        // 是否为空
        isEmpty : function(str){
           /* if(!str && str !== 0) return true;
            if(str.replace(/(^s*)|(s*$)/g, "").length ==0) return true;
            return false;*/
            return str.length == 0?false:true;
        },
        // email是否正确
        isEmail : function(str){
            if(/^[A-Za-z\d]+([-_\.][A-Za-z\d]+)*@([A-Za-z\d]+[-\.])+[A-Za-z\d]{2,5}$/.test(str)){
                return true;
            }
            else{
                return false;
            }
        },
        // 手机验证
        isPhone : function(str){
            var reg = /^1\d{10}$/;
            if (reg.test(str)) {
                return true;
            }
            if(str.length == 0){
                return true;  
            }
            return false;
            
        },//手机号码验证

        hasIllegalChar : function(w){
        	return /[<>@#\$%\^&\*]+/g.test(w);
        }
        
    }
	
	$.getCookie = function(name){
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0)
                return null;
        } else {
            begin += 2;
        }
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
        return unescape(dc.substring(begin + prefix.length, end));
    };
	
    $.setCookie = function(name, value, hs,path){
        var str = [name + "=" + escape(value)];
        if (hs > 0) {
            var date = new Date();
            var ms = hs * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str.push(" expires=" + date.toGMTString());
        }
        if(!path){
            path = "/";
        }
        str.push(" path="+path);
        document.cookie = str.join(";");
    };
	
	$.delCookie=function(name){
		var exp=new Date();
		exp.setTime(exp.getTime()-1);
		var getCookie=$.getCookie(name)
		if(getCookie){
			document.cookie=name+"="+getCookie+";expires="+exp.toGMTString();
		}
	};
	
    $.getStorage = function(key){
        if(window.localStorage){
            return window.localStorage.getItem(key);
        }else{
            return $.getCookie(key);
        }
    };

    $.setStorage = function(key,value){
        if(window.localStorage){
            window.localStorage.setItem(key,value);
        }else{
            $.setCookie(key,value,24*5);
        }
    };
    // 序列化方法
    $.fn.serJson = $.fn.serializeJson = function(){  
        //debugger;
        var serializeObj={};  
        $(this.serializeArray()).each(function(){  
            var pname = this.name;
            if(serializeObj[pname]){
                if(!serializeObj[pname].push){
                    serializeObj[pname] = [serializeObj[pname]];
                }
                serializeObj[pname].push(this.value);
            }else{
                serializeObj[pname]=this.value;
            }
            
        });  
        return serializeObj;  
    };  

})(jQuery);