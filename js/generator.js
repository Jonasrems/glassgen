var ctx, img;
oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;


oFReader.onload = function (oFREvent) {
  document.getElementById("slika").src = oFREvent.target.result;
};


function loadImg()
{
	istat=true;

	c=document.getElementById("canvas");
	ctx=c.getContext("2d");
	
	img=document.getElementById("slika");
	imgHeight = img.height;
	imgWidth = img.width;
	
	cnvWidth=img.width;
	cnvHeight=img.height;
	
	c.width = img.width;
	c.height = img.height;
	
	if (imgHeight<cnvHeight && imgWidth<cnvWidth){
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
	}

	if ((imgWidth/imgHeight)<1.56667){
		cnvWidth=imgWidth/imgHeight*cnvHeight;
	}else{
		cnvHeight=cnvWidth/(imgWidth/imgHeight);
	}
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.drawImage(img,0,0,cnvWidth,cnvHeight);
}






function loadImageFile() {
  if (document.getElementById("uploadImage").files.length === 0) { return; }
  var oFile = document.getElementById("uploadImage").files[0];
  if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }
  oFReader.readAsDataURL(oFile);

}

function rgb2hex(r,g,b){
	hex = r*65536+g*256+b;
	hex = hex.toString(16,6);
	len = hex.length;
	if( len<6 ){
		for(i=0; i<6-len; i++){
			hex = '0'+hex;
		}
	}
    return '0x'+hex.toUpperCase();
}

function makeCode(){
    var code = "";
    for(var i = 0; i < img.height*img.width; i++){
        var r = ctx.getImageData(i-Math.floor(Math.floor(i/img.width)*img.width),Math.floor(i/img.width),1,1).data[0], g = ctx.getImageData(i-Math.floor(Math.floor(i/img.width)*img.width),Math.floor(i/img.width),1,1).data[1], b = ctx.getImageData(i-Math.floor(Math.floor(i/img.width)*img.width),Math.floor(i/img.width),1,1).data[2], a = ctx.getImageData(i-Math.floor(Math.floor(i/img.width)*img.width),Math.floor(i/img.width),1,1).data[3];
        
        if(a==0){
            //none (skip pixel)
        }else{
            code = code+"a("+(i-Math.floor(Math.floor(i/img.width)*img.width))+","+Math.floor(i/img.width)+","+rgb2hex(r,g,b)+")\n";
        }
    
    }
    console.log(code);
}