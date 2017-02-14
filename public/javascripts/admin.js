$(function(){
	$("#aside_west").accordion({
		animate:false
	})
	$(".west_ul li").click(function(){
		$(".west_ul li").removeClass("west_li_bg")
		$(this).addClass("west_li_bg")
	})
	var admin={
		userList:function(){
			$.ajax({
				type:"get",
				url:"/admin/userList",
				success:function(h){
					$("#main").html(h);
					admin.userDelete()
				}
			});
		},
		userDelete:function(){
			$(".user_delete").click(function(){
				var _id=$(this).parent().attr("user_id");
				$.ajax({
					type:"post",
					url:"/admin/userdelete",
					data:{
						_id:_id
					},
					success:function(response){
						if(response.code==1){
							$.tip("删除成功");
							admin.userList();
						}
					}
				});
			})
		},
		setCarousel:function(){
			$.ajax({
				type:"get",
				url:"/admin/setCarousel",
				success:function(h){
					$("#main").html(h);
				}
			});
		}
		
	}
	$("#userList").click(function(){
		admin.userList();
	})
	$("#carousel").click(function(){
		admin.setCarousel()
	})
})
