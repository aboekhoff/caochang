App.programs.aawesome = function() {

  var ctx = App.getContext();

  function Square(x, y, r, dx, dy, dr, w, h, c) {
    this.x = x || 0;
    this.y = y || 0;
    this.r = r || 0;
    this.dx = dx || 0;
    this.dy = dy || 0;
    this.dr = dr || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.c = c || null;
  }

  Square.prototype.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    this.r += this.dr;

    if (this.x < 0) { 
      this.dx = -this.dx; 
      this.x = 0; 
    }
    if (this.x > ctx.canvas.width) { 
      this.dx = -this.dx; 
      this.x = ctx.canvas.width; 
    }
    if (this.y < 0) { 
      this.dy = -this.dy; 
      this.y = 0; 
    }
    if (this.y > ctx.canvas.height) { 
      this.dy = -this.dy; 
      this.y = ctx.canvas.height; 
    }
  }

  Square.prototype.draw = function() {
    ctx.save();
    ctx.translate(this.x + this.w/2, this.y + this.h/2);
    ctx.rotate(this.r);
    ctx.beginPath();
    ctx.rect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.closePath();
    ctx.fillStyle = this.c;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  var numSquares = 160;
  var squares = [];

  for (var i=0; i<numSquares; i++) {
    squares.push(
      new Square(
        Math.random() * ctx.canvas.width,
        Math.random() * ctx.canvas.height,
        0,
        ((Math.random() * 8) - 4) || 0.1,
        ((Math.random() * 8) - 4) || 0.1,
        ((Math.random() || 0.1) - 0.5) * 0.2 ,
        Math.random() * 40 + 10,
        Math.random() * 40 + 10,
        App.randRGB()  
      )
    );
  }

  // var x = Math.random() * screenWidth;
  // var y = Math.random() * screenHeight;

  function clearScreen() {
    ctx.canvas.width = canvas.width;
  }

  function draw() {
    clearScreen();
    squares.forEach(function(square) {
      square.draw();
    })
  }

  function update() {
    squares.forEach(function(square) {
      square.update();
    });
  }

  App.startAnimation(function(time) {
    draw();
    update();
  })

};