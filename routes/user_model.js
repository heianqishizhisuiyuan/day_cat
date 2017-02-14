var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema= new mongoose.Schema({
	username:String,
	phone:String,
	password:String,
	sex:String,
	truename:String,
	birth_year:String,
	birth_month:String,
	birth_day:String,
	registTime:Date,
	address:String,
	favors:[{
		type:ObjectId,
		ref:'Favor'
	}],
	shoppings:[{
		type:ObjectId,
		ref:'Shopping'
	}]
},{
	versionKey:false,
	autoIndex:false,
	collection:"users"
});

var favorSchema= new mongoose.Schema({
	imgUrl:String,
	productUrl:String,
	price:String
},{versionKey:false});

var shoppingSchema= new mongoose.Schema({
	imgUrl:String,
	productUrl:String,
	price:String
},{versionKey:false});



var User=mongoose.model('User',userSchema);
var Favor=mongoose.model('Favor',favorSchema);
var Shopping=mongoose.model('Shopping',shoppingSchema);
exports.User= User;
exports.Favor= Favor;
exports.Shopping= Shopping;

