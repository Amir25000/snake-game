let canvasElement = document.querySelector('canvas');

export let coordinates = {
  snake: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
  foodX: Math.random() * canvasElement.width,
  foodY: Math.random() * canvasElement.height,
  speed: { x: 9, y: 0 }
};

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    coordinates.speed = { x: 9, y: 0 };
  }
  if (event.key === 'ArrowLeft') {
    coordinates.speed = { x: -9, y: 0 };
  }
  if (event.key === 'ArrowUp') {
    coordinates.speed = { x: 0, y: -9 };
  }
  if (event.key === 'ArrowDown') {
    coordinates.speed = { x: 0, y: 9 };
  }
});

