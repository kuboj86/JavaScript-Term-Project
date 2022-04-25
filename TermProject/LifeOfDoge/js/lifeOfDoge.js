var myGamePiece;
var myObstacles = [];
var myScore;
function startGame() {
    myGamePiece = new component(70, 50, "media/doge.png", 25, 300, 'image');
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");    
    myLevel = new component("30px", "Consolas", "black", 80, 40, "text");
    myGameArea.start();
  }
  var restart = document.getElementById("restart");
  if(restart){
      restart.addEventListener("click", function(){
          startGame();
      })
  }
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 1200;
      this.canvas.height = 700;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.frameNo = 0;
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function (e) {
        myGameArea.keys = (myGameArea.keys || []);
        myGameArea.keys[e.keyCode] = true;
      })
      window.addEventListener('keyup', function (e) {
        myGameArea.keys[e.keyCode] = false;
      })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      stop : function() {
          clearInterval(this.interval);
      }
  }
  function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }  
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;        
  }
  this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          crash = false;
      }
      return crash;
  }
}
  function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        x = myGameArea.canvas.width;
        minHeight = 60;
        maxHeight = 300;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1) + minHeight);
        minGap = 90;
        maxGap = 230;
        gap = Math.floor(Math.random()*(maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(15, height, "media/redCandle.png", x, 0, "image"));
        myObstacles.push(new component(15, x - height - gap, "media/greenCandle.png", x, height+gap, "image"));

    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -3;
        // myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();

    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
    if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece.speedX = -2;}
    if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece.speedX = 2;}
    if (myGameArea.keys && myGameArea.keys[87]) {myGamePiece.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[83]) {myGamePiece.speedY = 2; }
    myGamePiece.newPos();    
    myGamePiece.update();
    
}
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
  
