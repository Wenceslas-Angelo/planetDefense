import { calcAim } from "../utils/calcAim";
import { checkCollision } from "../utils/checkCollision";
import Game from "./Game";

class Enemy {
  private x: number;
  private y: number;
  //   private width: number;
  //   private height: number;
  private radius: number;
  game: Game;
  free: boolean;
  private speedX: number;
  private speedY: number;

  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.radius = 50;
    // this.width = this.radius * 2;
    // this.height = this.radius * 2;
    this.free = true;
    this.speedX = 0;
    this.speedY = 0;
  }

  start() {
    this.free = false;
    this.x = Math.random() * this.game.width;
    this.y = Math.random() * this.game.height;
    const aim = calcAim(
      { x: this.x, y: this.y },
      { x: this.game.planet.getX(), y: this.game.planet.getY() }
    );
    this.speedX = aim[0];
    this.speedY = aim[1];
  }

  reset() {
    this.free = true;
  }

  update() {
    if (!this.free) {
      this.x -= this.speedX;
      this.y -= this.speedY;
    }

    // CheckCollision between enemy / planet
    if (
      checkCollision(
        { x: this.x, y: this.y, radius: this.radius },
        {
          x: this.game.planet.getX(),
          y: this.game.planet.getY(),
          radius: this.game.planet.getRadius(),
        }
      )
    ) {
      this.reset();
    }

    // CheckCollision between enemy / player
    if (
      checkCollision(
        { x: this.x, y: this.y, radius: this.radius },
        {
          x: this.game.player.getX(),
          y: this.game.player.getY(),
          radius: this.game.player.getRadius(),
        }
      )
    ) {
      this.reset();
    }

    if (
      this.x < 0 ||
      this.x > this.game.width ||
      this.y < 0 ||
      this.y > this.game.height
    ) {
      this.reset();
    }
  }

  draw(context: CanvasRenderingContext2D) {
    if (!this.free) {
      // context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.stroke();
      // context.restore();
    }
  }
}

export default Enemy;
