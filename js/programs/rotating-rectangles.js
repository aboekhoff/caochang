App.programs.rotatingRectangles = function() {
    var ctx = App.getContext();

    var dx = 6;
    var dy = 6;
    var dw = 2;
    var dh = 2;
    var dr = 4;

    var x = 20;
    var y = 20;
    var w = 100;
    var h = 20;
    var r = 0;

    for (var i=0; i<80; i++) {
      ctx.save();

      ctx.translate(x + w/2, y + h/2);
      ctx.rotate(r * (Math.PI/180));

      ctx.beginPath();
      ctx.rect(-w/2, -h/2, w, h);
      ctx.closePath();

      ctx.stroke();
      ctx.fillStyle = App.randRGB();
      ctx.fill();
      ctx.restore();

      x += dx;
      y += dy;
      w += dw;
      h += dh;
      r += dr;

    }
};