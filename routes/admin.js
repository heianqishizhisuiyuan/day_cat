var express = require('express');
var router = express.Router();
var User=require('./user_model').User;
var Carousel=require("./admin_model").Carousel;
var multer=require('./multer');

router.get('/',function(req,res){
	res.render('admin.html')
})
router.get('/userList',function(req,res){
	User.find({},function(err,user){
		if(err){
			console.log(err)
		}
		res.render("userList.html",{user:user||{}})
	})
})
router.post('/userdelete',function(req,res){
	var _id=req.body._id;
	User.remove({_id:_id},function(err){
		if(err){console.log(err)};
		res.json({
			code:1
		})
	})
})
router.get("/setCarousel",function(req,res){
	res.render("adminCarousel.html");
})


//上传
var upload=multer.single('file');
router.post("/upload",function(req,res){
	upload(req,res,function(err){
		if(err){
			return console.log(err);
		}
		new Carousel({
			url_:req.body.carousel_url,
			title:req.body.carousel_title,
			imgUrl:req.file.path,
			ctime:new Date()
		}).save(function(err){
			if(err){
				console.log(err)
			};
			res.json({
				code:1
			})
		});
	}) 
})

module.exports=router;