App.programs.polygons = function() {
  var ctx = App.getContext();
  var n = 360, dr = 12, r = n*dr;

  for (var i=n; i>=0; i--) {
    ctx.save();
    ctx.poly(200, 200, r, i);
    ctx.fillStyle = App.randRGB();
    ctx.fill();
    ctx.restore();

    r -= dr;

  }
};