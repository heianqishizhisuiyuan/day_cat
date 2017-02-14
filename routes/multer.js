var multer=require('multer');

var http=require("http");
var fs = require('fs');

/*var multiparty=require("multiparty");
var path="./public/uploads";
var carousel_path="./public/carouselUploads";
var form = new multiparty.Form();
    var form = new multiparty.Form();    
    form.parse(req, function (terr, tfields, tfiles) {
	//console.log(1)
	if(tfields.uploadType=="editeHeader"){
	}else if(tfields.uploadType=="adminCarousel"){
		if(!fs.existsSync(carousel_path)){
			fs.mkdirSync(carousel_path,0777);
			
		}
		path=carousel_path;
	}
});
    */
    






var path="./public/uploads";
var carousel_path="./public/carouselUploads";
var storage=multer.diskStorage({
	destination:function(req,file,cb){
		if(req.body.uploadType=="editeHeader"){
			if(!fs.existsSync(path)){
				sfs.mkdirSync(path,0777);
			}
			path=path;
		}else if(req.body.uploadType=="adminCarousel"){
			if(!fs.existsSync(carousel_path)){
				sfs.mkdirSync(carousel_path,0777);
			}
			path=carousel_path;
	}
	    cb(null,path)
		
	},
	filename:function(req,file,cb){
		var fileFormat=(file.originalname).split(".");
		cb(null,file.fieldname+"-"+Date.now()+"."+fileFormat[fileFormat.length-1]);
	}
});

var upload=multer({
	storage:storage
});
module.exports=upload;
