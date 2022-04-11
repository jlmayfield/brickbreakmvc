import * as Model from './modules/model.mjs'
import * as Controller from './modules/controller.mjs'
import * as View from './modules/view.mjs'

function gameloop(timestamp) {
  // Controllers handle UI events as they happen
  // We need loop over model updates, end-state
  // detection, and refresh the drawing.

  // 1. Model Update
  Model.moveBall();  // advance the ball
  Model.collisionDetection(); //clear hit bricks

  // Game Over?
  if( Model.haswon() ){
    alert("YOU WIN, CONGRATS!");
    Model.initgame()
    document.location.reload();
  }
  if( Model.youded() ){
    alert("GAME OVER");
    Model.initgame()
    document.location.reload();
  }

  //3. Draw Current Model
  View.draw();

  requestAnimationFrame(gameloop)

}

function startGame(){
  // init game state -- Independent of View and Controllers
  Model.initgame();
  // Init the View, which is dependent on the model
  View.initView(Model.dims,Model.bricks,Model.ball,Model.player,Model.paddle);
  // Init Controller, which is dependent of both Model and View.
  Controller.initControllers(Model.dims,Model.paddle,View.canvas);

  // Now start the loop
  requestAnimationFrame(gameloop)
}

// Let's Go!
startGame()
