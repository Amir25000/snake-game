import { Canvas } from './snake-canvas-class.js';

let canvasElement = document.querySelector('canvas');
let ctx = canvasElement.getContext('2d');
let result = document.querySelector('.result');
let newGame = document.querySelector('.js-new-game')
let newGame1 = document.querySelector('.js-new-game1')
let gameOverDiv = document.querySelector('.game-over')
let btnGameOver = document.querySelector('.js-game-over')

let myCanvas = new Canvas(canvasElement, ctx);
myCanvas.editCanvas(500, 400, `2px solid black`);
myCanvas.animate(result,gameOverDiv);


newGame.addEventListener('click' , (event) => {
  event.preventDefault()
  myCanvas.gameOver(result)
})

newGame1.addEventListener('click' , (event) => {
  event.preventDefault()
  gameOverDiv.classList.add('hidden')
  myCanvas.isGameOver = false;
  myCanvas.gameOver(result)
  myCanvas.animate(result, gameOverDiv)
})

btnGameOver.addEventListener('click', event => {
  event.preventDefault();
  if (myCanvas.isGameOver) {
    btnGameOver.textContent = 'Pause';
    myCanvas.isGameOver = false;
    myCanvas.animate(result, gameOverDiv); 
  } else {
    btnGameOver.textContent = 'Play';
    myCanvas.isGameOver = true;
  }
});

function particles(){
  for( let i = 0 ; i < 200 ; i++){
    const div = document.createElement('div')
    div.classList.add('circle')
    div.style.position = 'absolute'
    div.style.zIndex = 0
    div.style.width = `5px` 
    div.style.height = `5px` 
    const xPos = Math.random() * (window.innerWidth - 5); // Avoid overflowing horizontally
    const yPos = Math.random() * (window.innerHeight - 5);
      
    div.style.left = `${xPos}px`
    div.style.top = `${yPos}px`
    document.body.appendChild(div)
  }
}

particles()
