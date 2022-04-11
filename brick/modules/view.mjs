
// Module variables for model objects
var dims = null
var bricks = null
var paddle = null
var player = null
var ball = null
var canvas = null
var ctx = null
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


function initView(d,br,ba,pl,pd){
  dims = d;
  bricks = br;
  ball = ba;
  player = pl;
  paddle = pd;
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, dims.ball.r, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.X, dims.world.h-dims.paddle.h, dims.paddle.w, dims.paddle.h);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<bricks.ncols; c++) {
        for(var r=0; r<bricks.nrows; r++) {
            if((bricks.arr[c][r]).status == 1) {
                var brickX = (r*(dims.brick.w+brickPadding))+brickOffsetLeft;
                var brickY = (c*(dims.brick.h+brickPadding))+brickOffsetTop;
                bricks.arr[c][r].x = brickX;
                bricks.arr[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, dims.brick.w, dims.brick.h);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+ player.score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+ player.lives, dims.world.w-65, 20);
}

function draw() {
    //1. Draw Current Model
    ctx.clearRect(0, 0, dims.world.w, dims.world.h);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();

}

export { initView, draw, canvas }
