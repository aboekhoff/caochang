App.programs.aawesome = function() {

  function animate(time) {
    window.requestAnimationFrame(animate);
    console.log(time);
  }

  animate();

};