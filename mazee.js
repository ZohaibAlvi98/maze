var canvas= document.getElementById("canvas");
var ctx= canvas.getContext("2d");

var maze = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],  
[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
[1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
[0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
[1, 0, 1, 0, 0,-1, 0, 1, 0, 1, 0],
[1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0],
[1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
[1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
[0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
[2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
];

var player = {

   x: 0,
   y: 0
};

function drawBall() {

  var ballSize = blocksize/2;
  ctx.beginPath();
  ctx.arc(player.x* blocksize + ballSize, player.y* blocksize + ballSize, ballSize, 0, 2*Math.PI);
  ctx.fillStyle="blue";
  ctx.fill();
  ctx.closePath();
}

var width = canvas.width;
var blocksize=width/maze.length;
var time = 100;
document.addEventListener("keydown",keyDownHandler)


function checkWin(x, y) {
if(maze[y][x]=== 2)
  { 
    alert("YOU WON!!!");
    clearInterval(timeRem);
  }

}

function canMove(x, y)
{
  if(y>=0 && y<maze.length && x>=0 && x<maze[y].length && maze[y][x]!=1)
  {
    return true;
  }
}

function timer() {

  if(time!=0)
  {
    time--;
    document.getElementById("showtime").innerHTML = "Time remain: " + time + "s";
  }
  else
  {
    alert("GameOver");
    document.location.assign(location);
  }
}

function drawWall(x, y) {
    ctx.beginPath();
    ctx.fillStyle="red";
    ctx.fillRect(x*blocksize,y*blocksize,blocksize,blocksize);
    ctx.strokeRect(x*blocksize,y*blocksize,blocksize,blocksize);
    ctx.stroke();

}

function drawGoal(x, y) {

  var image = document.getElementById("goal");
  ctx.drawImage(image,x*blocksize,y*blocksize,blocksize,blocksize);
}



function draw() {
     ctx.clearRect(0,0,canvas.width,canvas.height);
     for(var y=0;y<maze.length;y++)
     {
        for(var x=0;x<maze[y].length;x++)
        { 
          if(maze[y][x]===1)
          {
            drawWall(x, y);
          }
          else if(maze[y][x]===2)
          {
            drawGoal(x, y);
          }
        }
      }
      drawBall();
}
draw();
var timeRem = setInterval(timer, 1000);

function keyDownHandler(e) {
  if(time>0 && maze[player.y][player.x]!=2)
  {
     if(e.which == 38 && canMove(player.x, player.y-1) && !checkWin(player.x, player.y-1)) 
     {
      player.y--;
     }
     else if(e.which == 40 && canMove(player.x, player.y+1) && !checkWin(player.x, player.y+1))
     {
      player.y++;
     }
     else if(e.which == 37 && canMove(player.x-1, player.y) && !checkWin(player.x-1, player.y))
     {
      player.x--;

     }
     else if(e.which == 39 && canMove(player.x+1, player.y) && !checkWin(player.x+1, player.y))
     {
      player.x++;
     }
   }
     draw();

 }

// ctx.beginPath();
// ctx.arc(20,20,20,0,2*Math.PI);
// ctx.fillStyle="blue";
// ctx.fill();
// ctx.closePath();