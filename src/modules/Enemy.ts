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

    if (Math.random() < 0.5) {
      this.x = Math.random() * this.game.width;
      this.y =
        Math.random() < 0.5 ? -this.radius : this.game.height + this.radius;
    } else {
      this.x =
        Math.random() < 0.5 ? -this.radius : this.game.width + this.radius;
      this.y = Math.random() * this.game.height;
    }
    const aim = calcAim(
      { x: this.x, y: this.y },
      { x: this.game.planet.getX(), y: this.game.planet.getY() }
    );
    this.speedX = aim[0];
    this.speedY = aim[1];
  }

  reset() {
    this.free = true;
    this.x = 0;
    this.y = 0;
  }

  checkCollisionWithPlanet() {
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
  }

  checkCollisionWithPlayer() {
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
  }

  checkCollisionWithProjectile() {
    for (let projectile of this.game.projectilePool) {
      if (
        !projectile.free &&
        checkCollision(
          { x: this.x, y: this.y, radius: this.radius },
          {
            x: projectile.getX(),
            y: projectile.getY(),
            radius: projectile.getRadius(),
          }
        )
      ) {
        projectile.reset();
        this.reset();
      }
    }
  }

  update() {
    if (!this.free) {
      this.x -= this.speedX;
      this.y -= this.speedY;
    }

    this.checkCollisionWithPlanet();

    this.checkCollisionWithPlayer();

    this.checkCollisionWithProjectile();
  }

  draw(context: CanvasRenderingContext2D) {
    if (!this.free) {
      // context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.stroke();
      context.strokeStyle = "white";
      // context.restore();
    }
  }
}

export default Enemy;
