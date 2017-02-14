var mongoose=require("mongoose");
var Schema=mongoose.Schema;

carouselSchema=new Schema({
	url_:String,
	title:String,
	imgUrl:String,
	ctime: Date
})
 
productListSchema=new Schema({
	productList:{
		Title:String,
		imgOne:{
			url_:String,
			title:String,
			title_small:String,
			imgUrl:String,
			scroll:[String]
		},
		imgList:[{
			url_:String,
			title:String,
			title_small:String,
			imgUrl:String
		}],
		ctime:Date
	},
})
productRecommend=new Schema({
	img_url:String,
	info:String,
	price:String
})
var Carousel=mongoose.model("Carousel",carouselSchema);
exports.Carousel=Carousel;
