var express = require('express');
var router = express.Router();
var User=require('./user_model').User;
var Favor=require('./user_model').Favor;
var Test =require('./user_model').Test;
var Carousel =require('./admin_model').Carousel;
var multer=require('./multer');
var upload=multer.single('file');

/* GET home page. */
router.get('/',function(req,res){
	var query = Carousel.find({});
	query.sort({ctime:-1});
	query.limit(3);
	query.find(function(err,carousel){
		res.render("index.html",{
			carousel:carousel||[]
		});
	})
	
	
})
router.get('/index',function(req,res){
	res.render("index.html");
})
router.get('/login', function(req, res) {
		 res.render('login.html');	
});
router.get('/regist',function(req,res){
		res.render('regist.html');
})
router.get('/product',function(req,res){
		res.render('product.html');
})
router.get('/user_center',function(req,res){
	if(req.session.loginuser){
		res.render('user_center.html');
	}else{
		 res.render('login.html');	
	}
})
router.get('/user_info',function(req,res){
	if(req.session.loginuser){
		res.render('user_info.html',{loginuser:req.session.loginuser});
	}else{
		 res.render('login.html');	
	}
		
}) 
router.get('/user_editeHeader',function(req,res){
		res.render('user_editeHeader.html');
})
router.get("/setSafe",function(req,res){
	res.render("setSafe.html");
})
router.get("/setPersonal",function(req,res){
	res.render("set_personal.html",{loginuser:req.session.loginuser});
})
router.get("/setSecret",function(req,res){
	res.render("set_secret.html");
})
router.get("/setGroup",function(req,res){
	res.render("set_group.html");
})
router.get("/setAlipay",function(req,res){
	res.render("set_Alipay.html");
})
router.get("/setBlog",function(req,res){
	res.render("set_blog.html");
})
router.get("/setBusiness",function(req,res){
	res.render("set_business.html");
})
router.get("/setAdress",function(req,res){
	res.render("set_adress.html");
})
router.get("/setRemind",function(req,res){
	res.render("set_remind.html");
})
router.get("/setWangwang",function(req,res){
	res.render("set_wangwang.html");
})
router.get("/setEmpower",function(req,res){
	res.render("set_empower.html");
})
router.get("/setShare",function(req,res){
	res.render("set_share.html");
})
router.get("/shoppingCart",function(req,res){
	res.render("shoppingCart.html");
})
router.get("/list_bought",function(req,res){
	res.render("list_bought.html");
})
router.get("/user_shopped",function(req,res){
	res.render("user_shopped.html");
})
router.get("/collection_thing",function(req,res){
	res.render("collection_thing.html");
})
router.get("/red_packet",function(req,res){
	res.render("red_packet.html");
})
router.get("/user_evaluate",function(req,res){
	res.render("user_evaluate.html");
})
/*注册*/
router.post("/add_user",function(req,res){
	var phone=req.body.phone;
	var password=req.body.password;
	var user=new User({
		phone:phone,
		password:password,
		registTime:new Date().getTime()
	})
	User.findOne({phone:phone},function(err,user1){
		if(user1){
			res.json({
				code:-1,
				message:"用户已经存在"
			})
		}else{
			user.save(function(err){
				if(err){
					console.log(err)
				};
				res.json({
						code:1,
						message:"注册成功"
					})
			});
		}
	})
})

/*登录*/
router.post('/login',function(req,res){
	User.findOne({phone:req.body.phone},function(err,user){
		if(user&&user.password==req.body.password){
			req.session["loginuser"]=user.toJSON();
			res.json({
				code:1,
				message:"登陆成功"
			})
		}else{
			res.json({
				code:-1,
				message:"登陆不成功"
			})
		}
	})
})
/*登出*/
router.get("/logout",function(req,res){
	delete req.session.loginuser;
	res.json({
		code:1
	})
})
router.get('/deleteUsers',function(req,res){
	User.remove({},function(err){
		if(err){
			console.log(err)
		};
		res.json({
			message:"用户已经全部删除"
		})
	})
})

router.post('/editUserInfo',function(req,res){
	User.update({phone:req.body.phone},{
		username:req.body.username,
		sex:req.body.sex,
		truename:req.body.truename,
		birth_year:req.body.bir_year,
		birth_month:req.body.bir_month,
		birth_day:req.body.bir_day
	},function(err){
		if(err){
			console.log(err)
		}
		
		User.findOne({phone:req.session.loginuser.phone},function(err,user1){
			delete req.session.loginuser;
			req.session.loginuser=user1.toJSON();
			res.json({
				code:1
			})
		})
		
	})
})
/*文件上传*/
var upload=multer.single('file');
router.post("/upload",function(req,res){
	upload(req,res,function(err){
		if(err){
			return console.log(err)
		}
		if(req.file){
			console.log(req.file)
			res.json({
				code:1
			})
		}
	}) 
})
module.exports = router;
