import { coordinates } from "./coordinates.js";


let highScoreDiv = document.querySelector('.highest-score')
export class Canvas {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.score = 0;
    this.hue = 0;
    this.isGameOver = false;
    this.highScore = localStorage.getItem('highScore') || 0 
    highScoreDiv.innerHTML = `${this.highScore}`
  }
  
  editCanvas(theWidth, theHeight, borderProperties) {
    this.canvas.style.backdropFilter = 'blur(10px)'
    this.canvas.width = theWidth;
    this.canvas.height = theHeight;
    this.canvas.style.border = borderProperties;
  }
  
  // Draw food
  createFood() {
    this.ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    this.ctx.fillRect(coordinates.foodX, coordinates.foodY, 10, 10);
    this.ctx.strokeStyle = 'black'; 
    this.ctx.lineWidth = 1; 
    this.ctx.strokeRect(coordinates.foodX, coordinates.foodY, 10, 10);
  }
  
  // Draw snake
  drawSnake() {
    coordinates.snake.forEach(bodyPart => {
      this.ctx.fillStyle = 'yellow';
      this.ctx.fillRect(bodyPart.x, bodyPart.y, 10, 10);
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(bodyPart.x, bodyPart.y, 10, 10);
    });
  }
  
  update(result,gameOverDiv) {
    
    result.style.color = `hsl(${this.hue}, 100%, 50%)`
    //create the head
    let head = { x: coordinates.snake[0].x + coordinates.speed.x, y: coordinates.snake[0].y + coordinates.speed.y };
    coordinates.snake.unshift(head);
    coordinates.snake.pop();
    
    if (head.x >= this.canvas.width) {
      head.x = 0;
    } else if (head.x < 0) {
      head.x = this.canvas.width - 10;
    }
    if (head.y >= this.canvas.height) {
      head.y = 0;
    } else if (head.y < 0) {
      head.y = this.canvas.height - 10;
    }
    
    //check if the snake eats the food or if the head of the snake has the same coordinates as the food
    if (Math.abs(head.x - coordinates.foodX) < 10 && Math.abs(head.y - coordinates.foodY) < 10) {
      coordinates.foodX = Math.random() * (this.canvas.width - 10);
      coordinates.foodY = Math.random() * (this.canvas.height - 10);
      this.hue += 10;
      this.score++;
      result.innerHTML = this.score;
      let lastBodyPart = coordinates.snake[coordinates.snake.length - 1];
      coordinates.snake.push({ x: lastBodyPart.x, y: lastBodyPart.y });
    }
    
    //if the snake collides with its own body
    for (let i = 1; i < coordinates.snake.length; i++) {
      if (head.x === coordinates.snake[i].x && head.y === coordinates.snake[i].y) {
        gameOverDiv.classList.remove('hidden')
        this.isGameOver = true;
        this.checkHighScore(highScoreDiv);
        this.gameOver(result)
      }
    }
  }
  
   checkHighScore(highScoreDiv) {
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore); 
      highScoreDiv.innerHTML = `${this.highScore}`;
    }
  }
  
  gameOver(result){
    this.score = 0;
    result.innerHTML = this.score;
    coordinates.snake = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    coordinates.speed = { x: 9, y: 0 };
  }

  
  // Animate the canvas
  animate(result,gameOverDiv) {
    const animateFrame = () => {
       if (!this.isGameOver){
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.createFood();
          this.drawSnake();
          this.update(result,gameOverDiv);
          requestAnimationFrame(animateFrame);
       }
    };
    animateFrame();
  }
}