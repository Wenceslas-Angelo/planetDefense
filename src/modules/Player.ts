import { createImage } from "../utils/createImage";
import Game from "./Game";
import playerImage from "../assets/player.png";
import { calcAim } from "../utils/calcAim";

class Player {
  private x: number;
  private y: number;
  private radius: number;
  private image: HTMLImageElement;
  game: Game;
  private aim: number[];
  private angle: number;

  constructor(game: Game) {
    this.game = game;
    this.x = game.width / 2 - this.game.planet.getRadius();
    this.y = game.height / 2;
    this.radius = 40;
    this.image = createImage(playerImage);
    this.aim = [];
    this.angle = 0;
  }

  update() {
    const planetX = this.game.planet.getX();
    const planetY = this.game.planet.getY();
    const planetRadius = this.game.planet.getRadius();
    this.aim = calcAim(this.game.mouse, { x: planetX, y: planetY });
    this.x = planetX + (planetRadius + this.radius) * this.aim[0];
    this.y = planetY + (planetRadius + this.radius) * this.aim[1];
    this.angle = Math.atan2(-this.aim[3], -this.aim[2]);
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(this.image, -this.radius, -this.radius);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.strokeStyle = "white";
    context.restore();
  }
}

export default Player;
