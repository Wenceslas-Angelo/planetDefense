import { calcAim } from "../utils/calcAim";
import { checkCollision } from "../utils/checkCollision";
import { createImage } from "../utils/createImage";
import Game from "./Game";

class Enemy {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private radius: number;
  private image: HTMLImageElement;
  game: Game;
  free: boolean;
  private speedX: number;
  private speedY: number;
  private frameY: number;
  private frameX: number;
  private maxFrame: number;
  private lives: number;
  private maxLives: number;
  private angle: number;
  private collided: boolean;

  constructor(
    game: Game,
    imageSrc: string,
    frameY: number,
    lives: number,
    maxFrame: number
  ) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.radius = 40;
    this.image = createImage(imageSrc);
    this.width = this.radius * 2;
    this.height = this.radius * 2;
    this.free = true;
    this.speedX = 0;
    this.speedY = 0;
    this.frameY = frameY;
    this.frameX = 0;
    this.maxFrame = maxFrame;
    this.lives = lives;
    this.maxLives = lives;
    this.angle = 0;
    this.collided = false;
  }

  start() {
    this.free = false;
    this.frameX = 0;
    this.collided = false;
    this.lives = this.maxLives;
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
    this.angle = Math.atan2(aim[3], aim[2]) + Math.PI * 0.5;
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
      this.lives = 0;
      this.speedX = 0;
      this.speedY = 0;
      this.collided = true;
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
      this.lives = 0;
      this.speedX = 0;
      this.speedY = 0;
      this.collided = true;
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
        ) &&
        this.lives >= 1
      ) {
        projectile.reset();
        this.hit(1);
      }
    }

    if (this.lives < 1 && this.game.spriteUpdate) this.frameX++;

    if (this.frameX > this.maxFrame) {
      this.reset();
      if (!this.collided) this.game.score += this.maxLives;
    }
  }

  update() {
    if (!this.free) {
      this.x -= this.speedX;
      this.y -= this.speedY;

      this.checkCollisionWithPlanet();

      this.checkCollisionWithPlayer();

      this.checkCollisionWithProjectile();
    }
  }

  hit(damage: number) {
    this.lives -= damage;
    if (this.lives >= 1) this.frameX++;
  }

  draw(context: CanvasRenderingContext2D) {
    if (!this.free) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        -this.radius,
        -this.radius,
        this.width,
        this.height
      );
      if (this.game.debug) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.strokeStyle = "white";
        context.fillText(`${this.lives}`, 0, 0);
        context.fillStyle = "white";
        context.font = "50px Helvetica";
        context.textBaseline = "middle";
        context.textAlign = "center";
      }
      context.restore();
    }
  }
}

export default Enemy;
