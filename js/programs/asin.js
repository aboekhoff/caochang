App.programs.asin = function() {
    var ctx = App.getContext();

    var screenWidth = ctx.canvas.width;
    var screenHeight = ctx.canvas.height;

    var y0 = screenHeight/2;

    var dx = 0.1;

    var m1 = 150;
    var m2 = 10;

    var mysterySinCoefficient = 0.1;
    var mysteryCosineCoefficient = 0.1;

    ctx.beginPath();
    ctx.moveTo(0, screenHeight/2);

    for (var x=0; x<screenWidth; x += dx) {
      var y1 = Math.sin(x * mysterySinCoefficient) * m1;
      var y2 = Math.cos(x * mysteryCosineCoefficient) * m2;
  
      ctx.lineTo(x, y0 + y1);
      ctx.lineTo(x, y0 + y2);
    }

    ctx.stroke();
};