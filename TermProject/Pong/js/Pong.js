import Ball from './Ball.js';
import Paddle from './Paddle.js'
var lastTime;
var ball = new Ball(document.getElementById("ball"));


var playerPaddle = new Paddle(document.getElementById("player-paddle"));
var playerScore = document.getElementById("player");
var computerPaddle = new Paddle(document.getElementById("computer-paddle"));
var computerScore = document.getElementById("opponent");


//The main function that handles the
function update(time){
    if (lastTime != null){
        //determing the amount of time that has passed from one call of update to the next
        var elapsedTime = time - lastTime;
        ball.update(elapsedTime, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(elapsedTime, ball.y);

        if(gameLost())
            gameOver();
        
    }

    lastTime = time;
    window.requestAnimationFrame(update);
}

function gameLost(){
    var rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

//check to determine which side of the gamearea the ball crosses to determine who gets a point
function gameOver(){
    var rect = ball.rect();
    if(rect.right >= window.innerWidth){
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    }
    else{

        computerScore.textContent = parseInt(computerScore.textContent) + 1;

    }
    ball.reset();
    computerPaddle.reset();
}
document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})
window.requestAnimationFrame(update);