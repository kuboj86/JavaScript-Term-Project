const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const figs = document.querySelectorAll('.fig');
var lastHole;
var timeUp = false;
var score;
var gametime;

function startGame() {
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
  }

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const holeNum = Math.floor(Math.random() * holes.length);
  const hole = holes[holeNum];
  if (hole === lastHole) {
      console.log(hole)
    console.log('nope');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
    console.log(setTimeout)
  const time = randomTime(500, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function gotem(event) {
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

figs.forEach(fig => fig.addEventListener('click', gotem));