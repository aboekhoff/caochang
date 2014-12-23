App.programs.rainbowRectangles = function() {
  var ctx = App.getContext();

  var dx = 2;
  var dy = 2;
  var dw = 2;
  var dh = 2;

  var x = 20;
  var y = 20;
  var w = 200;
  var h = 100;

  for (var i=0; i<300; i++) {
    
    // draw the shape
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();

    // set the fill color and paint it
    var color = App.randRGB();
    ctx.strokeStyle = color;
    ctx.stroke();  
    
    // update the variables
    x += dx;
    y += dy;
    w += dw;
    h += dh;
  }

};