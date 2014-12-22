function randByte() {
  return Math.floor(Math.random() * 256);
}

function randRGB() {
  return 'rgb(' + [randByte(), randByte(), randByte()].join(',') + ')';
}

function getContext() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  return ctx;
}

var App = {
  programs: {}
};


App.drawCurrentSelection = function() {
  var programName = App.$select.val();
  var program = App.programs[programName];
  program();
};

App.resetCanvas = function() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - $('#select').height();
};

App.render = function() {
  App.resetCanvas();
  App.drawCurrentSelection();
};

App.programs.simpleRectangle = function() {
  var ctx = getContext();
  ctx.rect(20, 20, 100, 50);
  ctx.stroke();
};

App.programs.rainbowRectangles = function() {
  var ctx = getContext();

  var dx = 2;
  var dy = 2;
  var dw = 2;
  var dh = 2;

  var x = 20;
  var y = 20;
  var w = 200;
  var h = 100;

  for (var i=0; i<30; i++) {
    
    // draw the shape
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();

    // set the fill color and paint it
    var color = randRGB();
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
    var ctx = getContext();

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
      ctx.fillStyle = randRGB();
      ctx.fill();
      ctx.restore();

      x += dx;
      y += dy;
      w += dw;
      h += dh;
      r += dr;

    }
};

$(function() {
  App.$select = $('#select');
  for (var func in App.programs) {
    App.$select.append($('<option value="' + func + '">' + func + '</option>'));
  }
 App.$select.on('change', function(e) {
    App.render();
  }).trigger('change');
});
