	
$(function(){
	window.applicationCache.addEventListener('updateready', function(){
            console.log('updateready!');
            window.applicationCache.update();
            window.applicationCache.swapCache();
        });
	
	
	$(".header-nav-1").hover(function(){
		$('.my-taobao').show();
		$(this).css('background','#fff');
	},function(){
		$('.my-taobao').hide();
		$(this).css('background','#eee');
	})
	$(".header-nav-8").hover(function(){
		$('.header-nav-8 ul').show();

	},function(){
		$('.header-nav-8 ul').hide();

	})
	$("#btn").click(function(){
		$("#bg1").show();
		$('.box').show();
	})
	$("#bg1").click(function(){
		$("#bg1").hide();
	})
	//轮播器
	var set_i=1;
	setInterval(function(){
	 	$(".slide-wrap-ul li").css('opacity','0');
	 	if(set_i==1){
	 		$(".slide-wrap-ul li:nth-child("+set_i+")").animate({
	 			'opacity':'1'
	 		},1000);
	 		set_i++;
	 	}else if(set_i==2){
	 		$(".slide-wrap-ul li:nth-child("+set_i+")").animate({
	 			'opacity':'1'
	 		},1000);
	 		set_i++;
	 	}else if(set_i==3){
	 		$(".slide-wrap-ul li:nth-child("+set_i+")").animate({
	 			'opacity':'1'
	 		},1000);
	 		set_i=1;
	 	}
	},5000)

	$(".ul-vertiacle li").hover(function(){
		var index=$(this).index();
		$(".slide-menu"+(index+1)).show();
	},function(){
		var index=$(this).index();
		$(".slide-menu"+(index+1)).hide();
	})


	$("#btn_1").click(function(){
		$(".dropdownn").animate({height:"100px"});
	})

	$('#myTab a').click(function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	})

	
	$(window).scroll(function() {
      if($(document).scrollTop()>220){
      	$(".top-nav").css('display','inline-block');
      }else{
      	$(".top-nav").css('display','none');
      }
     if($(document).scrollTop()>1275){
     	$(".bar-aside").css('display','inline-block');     	
     }else{
      	$(".bar-aside").css('display','none');
      }
    });

	
	try{
		$(".jqzoom").jqueryzoom({xzoom:580,yzoom:410});
	}catch(err){
		console.log(err)
	}
   $(".product-img_all img").mouseover(function(){
   		$(" .jqzoom img").attr("src",$(this).attr("src"));
		$(" .jqzoom img").attr("jqimg",$(this).attr("bimg"));
   })


 
  	var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 5; //设置每次显示图片的个数量
	var moveNum = 2; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv = $(".product-img_all ul"); //进行移动动画的容器
	var scrollItems = $(".product-img_all ul li"); //移动容器里的集合
	var moveLength = (scrollItems.eq(0).width()+8) * moveNum; //计算每次移动的长度.border=4,margin=4;
	var countLength = (scrollItems.length - viewNum) * (scrollItems.eq(0).width()+8); //计算总长度,总个数*单个长度	  
	//下一张
	$(".goright").on("click",function(){
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
	});
	//上一张

	$(".goleft").on("click",function(){
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
	});
	
	$("#add_").click(function(){
		var number=parseInt($("#product-number").val())
		//var number+=parseInt($("#product-number").val());
		$("#product-number").val( number+1)
	})
	$("#minu_").click(function(){
		if(parseInt($("#product-number").val())>1){
			$("#product-number").val(parseInt($("#product-number").val())-1)
		}
	})
	$(".manger-re-ul li").hover(function(){
		$(this).find('.img-tip').animate({
			top:"73%"
		},300)
	},function(){
		$(this).find('.img-tip').animate({
			top:"100%"
		},300)
	})
	$(".shop-type-ul li span").click(function(){
		if($.trim($(this).next().html())){
			$(this).next().toggleClass('toggle');
			if($(this).next().hasClass('toggle')){
				$(this).html('-');
			}else{
				$(this).html('+');
			}
		}
		
	})
	
	//注册
//登录
	$("#btn_login").click(function(){
		$.ajax({
			type:"post",
			url:"/login",
			data:{
				phone:$("#phone").val(),
				password:$("#password").val()
			},
			success:function(response){
				if(response.code==1){
					$.setCookie('phone',$("#phone").val(),24*30)
					location.href="/"
				}else{
					$.tip("账号或密码错误,请重新输入")
					$("#password").val("")
				}
			}
		});
	})
	$(".login").click(function(){
		location.href="/login"
	})
	$(".regist").click(function(){
		location.href="/regist"
	})
	//判断是否登录
	try{
		if($.getCookie('phone')){
			$("#index_login").css("display",'none')
			$(".username").html($.getCookie('phone'))
		}else{
			$("#index_regist").css("display",'none')
		}
	}catch(e){
		//
	}
	$(".logout").click(function(){
		$.delCookie("phone");
		$.get("/logout",function(result){
			console.log(result)
		});
		location.href="/login";
	})
	//图片中文字滑动
	var div_length=$(".img-bar-tip1 div").length;
	var flagg=false;
	setInterval(function(){
		if(flagg){
			$($(".img-bar-tip2 div")[div_length]).animate({
				"top":'-30px'
			},300)
			$($(".img-bar-tip1 div")[div_length]).animate({
				"top":'-30px'
			},300)
		}
		if(div_length==0){
			div_length=3;
		}
		$(".img-bar-tip2 div").css("top","100%");
		$($(".img-bar-tip2 div")[div_length-1]).animate({
			"top":'0'
		},300)
		$(".img-bar-tip1 div").css("top","100%");
		$($(".img-bar-tip1 div")[div_length-1]).animate({
			"top":'0'
		},300)
		flagg=true;
		div_length=div_length-1;
	},3000)
	
	$("#guess_product1").click(function(){
		location.href="/product"
	})
	
	
	
	
	/*
	 user-center.html
	 * */
	$(".user-bar-list li a").click(function(){
		$(".user-bar-list li a").removeClass("subscript");
		$(this).addClass("subscript");
	})
	var time = new Date();
	var day =time.getDate();
	var week= time.getDay();
	var week_="";
	var year= time.getFullYear();
	var month=time.getMonth()+1;
	switch (week){
		case 1:
			week_="一";
			break;
		case 2:
			week_="二";
			break;
		case 3:	
			week_="三";
			break;
		case 4:
			week_="四";
			break;
		case 5:
			week_="五";
			break;
		case 6:
			week_="六";
			break;
		case 7:
			week_="日";
			break;
		default:
			break;
	}
	$(".calendar-day").html(day);
	$(".calendar-week").html("星期"+week_);
	$(".calendar-year").html(year+"."+month);
	$("#my-taobao_").click(function(){
		window.location.href="./user_center";
	})
	$(".user-edit").click(function(){
		window.location.href="./user_info";
	})
	$("#userInfo-save").click(function(){
		var username = $("#username_edit").val();
		var truename=$("#truename_edit").val();
		var sex=$("input[type='radio']:checked").val();
		var bir_year=$("select[name='year'] option:selected").val();
		var bir_month=$("select[name='month'] option:selected").val();
		var bir_day=$("select[name='day'] option:selected").val();
		var start=$("select[name='start']").val();
		var phone=$.getCookie("phone");
		var data={
			phone:phone,
			username:username,
			truename:truename,
			sex:sex,
			bir_year:bir_year,
			bir_month:bir_month,
			bir_day:bir_day,
			start:start
		}
		$.post("/editUserInfo",data,function (result) {
			if(result.code==1){
				window.location.href="/user_info"
			}
		})
	})
	
	/*更改头像*/
	
	
	
	/*user_info.html*/
	$("#set_safe").click(function(){
		$.get("/setSafe",function(result){$("#set_content").html(result)})
	})
	$("#set_personal").click(function(){
		$.get("/setPersonal",function(result){
			$("#set_content").html(result);
			$("#btn_edit_header").click(function(){
			$.get("/user_editeHeader",function(result){
				$(".user_info_content").html(result)
			})
	})
		})
	})
	$("#set_secret").click(function(){
		$.get("/setSecret",function(result){$("#set_content").html(result)})
	})
	$("#set_group").click(function(){
		$.get("/setGroup",function(result){$("#set_content").html(result)})
	})
	$("#set_Alipay").click(function(){
		$.get("/setAlipay",function(result){$("#set_content").html(result)})
	})
	$("#set_blog").click(function(){
		$.get("/setBlog",function(result){$("#set_content").html(result)})
	})
	$("#set_business").click(function(){
		$.get("/setBusiness",function(result){$("#set_content").html(result)})
	})
	$("#set_adress").click(function(){
		$.get("/setAdress",function(result){$("#set_content").html(result)})
	})
	$("#set_remind").click(function(){
		$.get("/setRemind",function(result){$("#set_content").html(result)})
	})
	$("#set_wangwang").click(function(){
		$.get("/setWangwang",function(result){$("#set_content").html(result)});
	})
	$("#set_empower").click(function(){
		$.get("/setEmpower",function(result){$("#set_content").html(result)});
	})
	$("#set_share").click(function(){
		$.get("/setShare",function(result){$("#set_content").html(result)});
	})
	
	/*shoppingCart.html*/
	$("#user_shopping").click(function(){
		window.location.href="/shoppingCart";
	})
	$(".shoppingCart-search").focus(function(){
		$(".shoppingCart-searcW i").css("display","none");
	})
	$(".shoppingCart-search").blur(function(){
		$(".shoppingCart-searcW i").css("display","inline-block");
	})
	$(".cart-info_").hover(function(){
		$(this).css({
			border:"1px dashed #ff3e00",
		})
		var span="<span class='disply-inblock taobao-color rebulit'>修改</span>";
	
		$(span).appendTo($(this));
		$(".rebulit").css({
			position:"absolute",
			top:0,
			right:0
		})
	},function(){
		$(this).css({
			border:"1px dashed #fff8e1"
		})
		$(".rebulit").remove();
	})
	$("#cart_select_all").click(function(){
		
		if( $($(".cart-selectBox")[0]).hasClass("box-Check") ){
			$(".cart-selectBox,.cart-selectBox-top").removeClass("box-Check");
		}else{
			$(".cart-selectBox,.cart-selectBox-top").addClass("box-Check");
		}
	})
	function judge(){
		var length=$(".cart-selectBox").length;
		for(var j=0;j<=length;j++){
			if(!$($(".cart-selectBox")[j]).hasClass("box-Check")){
				return 0;
			}else if(j==length-1){
				return 1;
			}
		}
		
	}
	$(".cart-selectBox").click(function(){
		$(this).toggleClass("box-Check");
		if(judge()){
			$(".cart-selectBox-top").addClass("box-Check");
		}else{
			$(".cart-selectBox-top").removeClass("box-Check");
		}
	});
	/*list_bought.html*/
	$("#user_listBought").click(function(){
		window.location.href="/list_bought";
	})
	$(".more-term").click(function(){
		if($(this).find("a").html()=="更多筛选条件"){
			$(this).find("a").html("精准筛选条件");
			$(this).find("i").css({
				transform:"rotate(180deg)"
			})
			$(".carful-search").removeClass("display-none");
		}else{
			$(this).find("a").html("更多筛选条件");
			$(this).find("i").css({
				transform:"rotate(0deg)"
			})
			$(".carful-search").addClass("display-none");
		}
	})
	
	/*user_shopped.html*/
	$("#user_shopped").click(function(){
		window.location.href="/user_shopped";
	})
	/*collection_thing.html*/
	$("#collection_thing").click(function(){
		window.location.href="/collection_thing";
	})
	/*red_packet.html*/
	$("#red_packet").click(function(){
		window.location.href="/red_packet"
	})
	/*user_evaluate.html*/
	$("#user_evaluate").click(function(){
		window.location.href="/user_evaluate"
	})
	
	
	
	
	
})

