// window.onload = () => {
//   document.getElementById('start-button').onclick = () => {
//     startGame();
//   };

//   function startGame() {}
// };

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const roadImg = new Image(); 
roadImg.src = "../images/road.png";
const carImg = new Image(); 
carImg.src = "../images/car.png";

const carWidth = 40
const carHeight = 80

let isMovingLeft = false;
let isMovingRight = false;

let carX = canvas.width / 2-20;
let carY = canvas.height - carHeight-20;

let animateId;
let gameOver = false;

let obstacles = []

class obstacle{
  constructor(positionX, positionY, width, height){
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height; 
  }
  
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height )
    this.positionY += 2;
    // console.log("this.positionY......",this.positionY)
  }

  checkCollision(){
    if(carX < this.positionX + this.width &&
      carX +carWidth > this.positionX &&
      carY < this.positionY + this.height &&
      carHeight + carY > this.positionY){

        gameOver = true;

      }
  }
}


const animate = () => {
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(carImg, carX , carY, carWidth, carHeight)

  obstacles.forEach((obstacle) => {
    obstacle.checkCollision();
    obstacle.draw() 
  })

  obstacles = obstacles.filter((obstacle) => obstacle.positionY < canvas.height)
  console.log()

  if(isMovingLeft && carX > 60  ) {
    carX -= 5
  }
  if(isMovingRight && carX < canvas.width - 100) {
    carX += 5
  }

  if(animateId % 100 === 0){
    obstacles.push(new obstacle((canvas.width * Math.random())-100, -50, 50, 50))
  }
  console.log(obstacles)
  if(gameOver){
    cancelAnimationFrame(animateId);
  }else{
    animateId = requestAnimationFrame(animate);
  }
  console.log(animateId)
}

const startGame = () => {
  animate()
}

window.addEventListener("load",()=>{
  document.getElementById('start-button').onclick = () => {
    document.querySelector(".game-intro").style.display = "none";
    startGame();
  }

  document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowLeft') {
      isMovingLeft = true;
    }
    if(event.key === 'ArrowRight') {
      isMovingRight = true;
    }
  })
  
  document.addEventListener('keyup', (event) => {
    if(event.key === 'ArrowLeft') {
      isMovingLeft = false;
    }
    if(event.key === 'ArrowRight') {
      isMovingRight = false;
    }
  })

})