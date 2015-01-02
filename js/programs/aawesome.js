App.programs.aawesome = function() {

  var ctx = App.getContext();
  var screenWidth = ctx.canvas.width;
  var screenHeight = ctx.canvas.height;

  // var x = Math.random() * screenWidth;
  // var y = Math.random() * screenHeight;

  var x = 10;
  var y = 10;

  var dx = 14;
  var dy = 1;

  function clearScreen() {
    ctx.canvas.width = canvas.width;
  }

  function draw() {
    clearScreen();
    ctx.rect(x, y, 30, 30);
    ctx.fillStyle = App.randRGB();
    ctx.fill();
  }

  function update() {
    x += dx;
    y += dy;

    if (x < 0) { dx = -dx; x = 0; }
    if (x > screenWidth) { dx = -dx; x = screenWidth; }
    if (y < 0) { dy = -dy; y = 0; }
    if (y > screenHeight) { dy = -dy; y = screenHeight; }
  }

  function animate(time) {
    window.requestAnimationFrame(animate);
    draw();
    update();
  }

  animate();

};