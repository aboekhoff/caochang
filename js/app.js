Math.TAU = Math.PI*2;

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

var App = {};

App.programs = {};

App.$select = null;

App.stopAnimation = function() {
  if (App.currentAnimation) {
    App.currentAnimation.isRunning = false;
    App.currentAnimation = null;
  }
}

App.startAnimation = function(animation) {
  var loop = function() {
    if (loop.isRunning) {
      window.requestAnimationFrame(loop);
      animation();
    }
  }
  App.currentAnimation = loop;
  loop.isRunning = true;
  loop();
};

App.randByte = function() {
  return Math.floor(Math.random() * 256);  
};

App.randRGB = function() {
  return 'rgb(' + [App.randByte(), App.randByte(), App.randByte()].join(',') + ')';
};

App.getContext = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  return ctx;
};

App.runCurrentSelection = function() {
  var name = App.$select.val();
  var program = App.programs[name];
  program();
};

App.resetCanvas = function() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - App.$select.height();
};

App.run = function() {
  App.stopAnimation();
  App.resetCanvas();
  App.runCurrentSelection();
};

App.initSelect = function() {
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
    App.run();
  });

  App.run();
};

$(function() {

  var url = 'js/programs';

  $.ajax({
    url: url,
    success: function(data) {
      var response = $(data);
      var links = $('li', response);
      var counter = links.length;

      function onload() {
        counter -= 1;
        if (counter === 0) {
          App.initSelect();
        }
      }

      links.each(function(_, link) {
        var script = document.createElement('script');
        script.onload = onload;
        $('head').append(script);
        script.src = url + '/' + $(link).text();
      });
    }
  });

});