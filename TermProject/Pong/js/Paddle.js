var speed = 0.02;

//creating a Paddle class
export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    )
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  //logic for increasing the speed of the AI paddle
  //This needs works becuase the AI will always move at the same speed of the ball
  update(delta, ballHeight) {
    this.position += (speed - .013) * delta * (ballHeight - this.position);
  }
}