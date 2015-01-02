App.programs.kristy = function() {
    var ctx = App.getContext();

    var dx = 20;
    var dy = 15;
    var dw = 0;
    var dh = 0;
    var dr = 4;

    var x = 20;
    var y = 20;
    var w = 100;
    var h = 20;
    var r = 0;

    var numRects = 80;

    for (var i=0; i<numRects; i++) {
      ctx.save();

      ctx.rotate(r * (Math.PI/180));
      ctx.translate(x, y);
      //ctx.translate(x + w/2, y + h/2);
      //ctx.rotate(r * (Math.PI/180));

      ctx.beginPath();
      ctx.rect(-w/2, -h/2, w, h);
      ctx.closePath();

      ctx.strokeStyle = App.randRGB();
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