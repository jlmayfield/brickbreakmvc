
// Model refs
var dims = null;
var canvas = null;
var paddle = null;

function initControllers(dm,pad,can){
  registerDims(dm);
  registerPaddle(pad);
  registerCanvas(can);
  registerHandlers()
}

function registerHandlers() {// Control/EventHandlers
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);
}

function registerDims(d){
  dims = d;
}

function registerCanvas(can) {
  canvas = can;
}

function registerPaddle(pad){
  paddle = pad;
}

function keyDownHandler(e) {
    if(e.code  == 'ArrowRight'){
      paddle.move('r');
    }
    else if(e.code == 'ArrowLeft') {
      paddle.move('l')
    }
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < dims.world.w) {
        paddle.X = relativeX - dims.paddle.w/2;
    }
}

export {initControllers};
