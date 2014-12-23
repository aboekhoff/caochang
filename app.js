Math.TAU = Math.PI*2;

var App = {};

App.programs = {};

App.$select = null;

App.randByte = function() {
  return Math.floor(Math.random() * 256);  
};

App.randRGB = function() {
  return 'rgb(' + [App.randByte(), App.randByte(), App.randByte()].join(',') + ')';
};

CanvasRenderingContext2D.prototype.poly = function(x, y, r, n) {
  this.beginPath();

  var d = Math.TAU/n;

  for (var i=0; i<n; i++) {
    var _x = x + Math.cos(i*d) * r;
    var _y = y + Math.sin(i*d) * r;

    if (i===0) {
      this.moveTo(_x, _y);
    } else {
      this.lineTo(_x, _y);
    }
  }

  this.closePath();

};

App.getContext = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  return ctx;
};

App.drawCurrentSelection = function() {
  var name = App.$select.val();
  var program = App.programs[name];
  program();
};

App.resetCanvas = function() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - App.$select.height();
};

App.render = function() {
  App.resetCanvas();
  App.drawCurrentSelection();
};

App.programs.simpleRectangle = function() {
  var ctx = App.getContext();
  ctx.rect(20, 20, 100, 50);
  ctx.stroke();
};

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
      var _w = Math.floor(w/2);
      var _h = Math.floor(h/2);

      ctx.save();

      ctx.translate(x + _w, y + _h);
      ctx.rotate(r * (Math.PI/180));

      ctx.beginPath();
      ctx.rect(-_w, -_h, w, h);
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

$(function() {
  // store a reference to the program selection widget
  App.$select = $('#select');

  // sort the programs in App.programs alphabetically
  var programNames = [];
  for (var name in App.programs) {
    programNames.push(name);
  }
  programNames.sort();

  // append an option tag for each program name to the select widget
  programNames.forEach(function(name) {
    App.$select.append($('<option value="' + name + '">' + name + '</option>'));
  });

  // make the app rerender whenever the selection changes;
  App.$select.on('change', function(e) {
    App.render();
  });

  // make the app render once at startup
  App.$select.trigger('change');
});
