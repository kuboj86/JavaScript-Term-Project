const startSpeed = 0.04
const speedIncrease = 0.000001

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    return this.ballElem.getBoundingClientRect();
  }


  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    //To determine the "random" direction the ball will start moving once the game begins
    while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) 
    {
      var heading = randomNumberBetween(0, 4 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = startSpeed;
  }

//This is updating the speed of the ball, which in turn will increase the speed of the AI paddle
//Also determines the direction the ball travels when it hits something
  update(elapsedTime, paddleRects) {
    this.x += this.direction.x * this.velocity * elapsedTime;
    this.y += this.direction.y * this.velocity * elapsedTime;
    this.velocity += speedIncrease * elapsedTime;
    var rect = this.rect()

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if (paddleRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}

//Determining what collision occurs, whether its the paddles or the top/bottom of the game area
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  )
}