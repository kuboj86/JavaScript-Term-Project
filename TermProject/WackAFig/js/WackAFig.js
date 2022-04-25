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
    setTimeout(() => timeUp = true, 20000)
  }

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//Gets the total number of divs with the class of "holes" and creates a list
//Than will randomly pick one of those divs.
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

//Logic to handle the fig to appear for a random duration between .2 and 1 second
//When the duration is expired, the image 'disappears'
function peep() {
    console.log(setTimeout)
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

//Logic when the fig is clicked, the image will disappear and the score will get updated.
function gotem(event) {
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

figs.forEach(fig => fig.addEventListener('click', gotem));