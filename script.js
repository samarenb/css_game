var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var crop_canvas = document.getElementById('crop_canvas');
var crop_canvas_ctx= crop_canvas.getContext('2d');
var width = crop_canvas.width;
var height = crop_canvas.height;
        
    
var rect = {};
var drag = false;
var imageObj = null;

function init() {
    imageObj = new Image();
    imageObj.onload = function () { ctx.drawImage(imageObj, 0, 0); };
    imageObj.src = 'images/test3.jpg';
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
}

function mouseDown(e) {
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
}

function mouseUp() { 
    drag = false;
    crop(rect.startX,rect.startY,rect.w, rect.h);
 }

function mouseMove(e) {
    if (drag) {
        ctx.clearRect(0, 0, 620, 600);
        ctx.drawImage(imageObj, 0, 0);
        rect.w = (e.pageX - this.offsetLeft) - rect.startX;
        rect.h = (e.pageY - this.offsetTop) - rect.startY;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    }
}
//
init();
function ocr(left,top,rw,rh){
    var imageData = ctx.getImageData(left,top,rw,rh);
Tesseract.recognize(imageData)
.then(function(result){
      document.getElementById('ocrTextArea').value ='';
    document.getElementById('ocrTextArea').value = result.text;
    console.log(result)
})
}
 function crop(left,top,rw,rh){
    //Find the part of the image that is inside the crop box  
    crop_canvas_ctx.clearRect(0, 0, width, height);
    crop_canvas_ctx.drawImage(imageObj, left, top, rw, rh, 0, 0, rw, rh);
    ocr(left, top, rw, rh);
  }