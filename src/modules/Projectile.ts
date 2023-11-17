import Game from "./Game";

class Projectile {
  private x: number;
  private y: number;
  private radius: number;
  game: Game;
  free: boolean;
  private speedX: number;
  private speedY: number;

  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.radius = 5;
    this.free = true;
    this.speedX = 0;
    this.speedY = 0;
  }

  start(x: number, y: number, speedX: number, speedY: number) {
    this.free = false;
    this.x = x;
    this.y = y;
    this.speedX = speedX * 5;
    this.speedY = speedY * 5;
  }

  reset() {
    this.free = true;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (!this.free) {
      this.x += this.speedX;
      this.y += this.speedY;
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
      context.fill();
      context.fillStyle = "red";
      // context.restore();
    }
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getRadius() {
    return this.radius;
  }
}

export default Projectile;
