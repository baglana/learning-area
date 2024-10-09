// setup canvas

import { Ball } from "./ball.js";
import { EvilCircle } from "./evilCircle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

const scorePara = document.querySelector("p");

const evilCircle = new EvilCircle(
  random(0 + EvilCircle.size, width - EvilCircle.size),
  random(0 + EvilCircle.size, width - EvilCircle.size)
);

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (!ball.exists) {
      continue;
    }
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
    
  scorePara.textContent = `Ball count: ${Ball.count}`;

  requestAnimationFrame(loop);
}

loop();

export { ctx, width, height, balls, randomRGB };
