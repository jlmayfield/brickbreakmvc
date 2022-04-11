// Model/GameState Variables
// Game State Attributes:
//   dimensions: (world: width, height), (brick: width, height), (paddle: width,height),
//      (ball: radius)
//   brick: x,y,status
//   bricks : nRows,nCols,arr,
//   paddle: x
//   ball: x,y,dx,dy
//   player: score, lives

var dims =  {world:{w:480,h:320},brick:{w:75,h  :20},paddle:{w:75,h:10},ball:{r:10} };
// these attributes are dynamic, they change. We'll use initgame to set them up
var bricks = null;
var ball = null
var player = null
var paddle = null;

function initgame(){
  ball = {x:240,y:290,dx:2,dy:-2};
  player = {score:0,lives:3};
  paddle = {
    X:(dims.world.w - dims.paddle.w)/2,
    move (d){
      if(paddle.X < (dims.world.w - dims.paddle.w) && d == 'r') {
          paddle.X += 7;
      }
      else if(paddle.X > 0 && d == 'l') {
          paddle.X -= 7;
      }
    }
  };
  bricks = {nrows:5,ncols:3,arr:[]};
  initbricks();
}

function initbricks() {
  for(var c=0; c<bricks.ncols; c++) {
      bricks.arr[c] = [];
      for(var r=0; r<bricks.nrows; r++) {
          // each cell is a brick object
          bricks.arr[c][r] = { x: 0, y: 0, status: 1 };
      }
  }
}

// Stop When
function haswon() {
  return player.score == bricks.nrows*bricks.ncols;
}

function youded(){
  return !player.lives;
}

// Model Update

//  Update brick array based on current ball location
function collisionDetection() {
    for(var c=0; c<bricks.ncols; c++) {
        for(var r=0; r<bricks.nrows; r++) {
            var b = bricks.arr[c][r];
            if(b.status == 1) {
                if(ball.x > b.x && ball.x < b.x+dims.brick.w && ball.y > b.y && ball.y < b.y+dims.brick.h) {
                    ball.dy = -(ball.dy);
                    b.status = 0;
                    player.score++;
                }
            }
        }
    }
}

// Update Ball Location/Direction
function moveBall(){
  // hit side wall
  if(ball.x + ball.dx > dims.world.w-dims.ball.r || ball.x + ball.dx < dims.ball.r) {
      ball.dx = -ball.dx;
  }
  // hit ceiling
  if(ball.y + ball.dy < dims.ball.r) {
      ball.dy = -ball.dy;
  }
  // FLOOR!
  else if(ball.y + ball.dy > dims.world.h - dims.ball.r) {
      // Paddle Save
      if(ball.x > paddle.X && ball.x < paddle.X + dims.paddle.w) {
          ball.dy = -ball.dy;
      }
      // whoops
      else {
          player.lives--;
          ball.x = dims.world.w/2;
          ball.y = dims.world.h-30;
          ball.dx = 2;
          ball.dy = -2;
          paddle.X = (dims.world.w-dims.paddle.w)/2;
      }
  }
  // now that the ball direction (and maybe location) are set
  ball.x += ball.dx;
  ball.y += ball.dy;
}


export{ dims,bricks,player,ball,paddle,collisionDetection,haswon,youded,moveBall,initgame };
