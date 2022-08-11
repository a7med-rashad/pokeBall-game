const GRASS_COUNT = 200, GRASS_CLASS = 'grass';
const POKEBALL_COUNT = 7, POKEBALL_CLASS = 'pokeball';

const PLAYER_SPEED = 2;
const PLAYER = document.querySelector(".player")
const SCORE = document.querySelector(".score")
let scoreCount = 0;
let playerPosition = {
  x: 0,
  y: 0,
}
let playerVelocity = {
  x: 0,
  y: 0,
}

const START_PLAYER_POSITION = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}
// ========== GAME FUNCTIONS ============= 
function start() {
  generateRandomItems(GRASS_CLASS , GRASS_COUNT)
  generateRandomItems(POKEBALL_CLASS , POKEBALL_COUNT)
  playerPosition = START_PLAYER_POSITION;
  SCORE.innerHTML = `Your Score: ${scoreCount}`
}; 

function update() {
  playerPosition.x += playerVelocity.x
  playerPosition.y += playerVelocity.y

  PLAYER.style.left = playerPosition.x + "px"
  PLAYER.style.top = playerPosition.y + "px"

  checkColleisions()
  requestAnimationFrame(update)
}; 



// ============= HANDLE PLAYER MOVEMENT  =============
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    playerVelocity.y = -1 * PLAYER_SPEED;
  }
  if (e.key === "ArrowDown") {
    playerVelocity.y = 1 * PLAYER_SPEED;
  }
  if (e.key === "ArrowLeft") {
    playerVelocity.x = -1 * PLAYER_SPEED;
  }
  if (e.key === "ArrowRight") {
    playerVelocity.x = 1 * PLAYER_SPEED;
  }
})

window.addEventListener("keyup", (e) => {
  playerVelocity.x = 0;
  playerVelocity.y = 0;
});


function generateRandomItems(className, itemCount) {
  for (let count = 0; count < itemCount; count++) {
    const item = document.createElement("div");
    item.classList.add(className);
    item.style.left = Math.random() * 100 + "%";
    item.style.top = Math.random() * 100 + "%";
    document.body.appendChild(item);
  }
} 

function checkColleisions(){
  pokeBalls = document.querySelectorAll(".pokeball") 
  pokeBalls.forEach((ball) => {
    if (collision(ball, PLAYER)) {
      ball.style.left = Math.random() * 100 + "%";
      ball.style.top = Math.random() * 100 + "%";
      scoreCount += 1
      SCORE.innerHTML = `Your Score: ${scoreCount}`
      console.log("1")
      ball.style.display = "none"
    }
    
  });
}

function win(){
  if (scoreCount === 7) {
      let win = document.createElement("div") 
      win.classList.add("win")
      win.innerHTML = "you win"
      window.body.appendChild(win)
  }
}


// ============= Check collision between 2 divs ===========
function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}
// ========== RUN THE GAME ============= 


start()
update()
win()
