var myGamePiece;
var myObstacles = [];
var myScore;
function startGame() {
    myGamePiece = new component(75, 60, "media/dogeRocket.jpg", 10, 10, 'image');
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");    
    myLevel = new component("30px", "Consolas", "black", 80, 40, "text");
    myGameArea.start();
  }
  
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 1000;
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
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
      var mytop = this.y + 15;
      var mybottom = this.y + (this.height) - 19;
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
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 100;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        // myObstacles.push(new component(30, height, "media/vectorSnakeDown.png", x, 0, "image"));
        // myObstacles.push(new component(30, x-height-gap, "media/vectorSnakeUpSmaller.png", x, height+gap, "image"));
 		//myObstacles.push(new component(10, height, "brown", x, 0));
        //myObstacles.push(new component(10, x - height - gap, "brown", x, height + gap));

    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -1;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myLevel.text="Level: " + Math.round(myGameArea.frameNo/500);
    myLevel.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    if (myGameArea.keys && myGameArea.keys[32]) {myGamePiece.image.src = "media/dogeRocket.jpg"}
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -3, myGamePiece.image.src = "media/dogeRocket.jpg"}
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 3, myGamePiece.image.src = "media/dogeRocket.jpg" }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -3 ,myGamePiece.image.src = "media/dogeRocket.jpg" }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 3, myGamePiece.image.src = "media/dogeRocket.jpg" }
}
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

// function moveup() {
//   myGamePiece.speedY = -1; 
// }

// function movedown() {
//   myGamePiece.speedY = 1; 
// }

// function moveleft() {
//   myGamePiece.speedX = -1; 
// }

// function moveright() {
//   myGamePiece.speedX = 1; 
// }

// function clearmove() {
//   myGamePiece.speedX = 0; 
//   myGamePiece.speedY = 0; 
// }
  
