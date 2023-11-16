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

  constructor(game: Game) {
    this.game = game;
    this.x = game.width / 2 - this.game.planet.getRadius();
    this.y = game.height / 2;
    this.radius = 40;
    this.image = createImage(playerImage);
    this.aim = [];
  }

  update() {
    const planetX = this.game.planet.getX();
    const planetY = this.game.planet.getY();
    const planetRadius = this.game.planet.getRadius();
    this.aim = calcAim(this.game.mouse, { x: planetX, y: planetY });
    this.x = planetX + (planetRadius + this.radius) * this.aim[0];
    this.y = planetY + (planetRadius + this.radius) * this.aim[1];
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x - this.radius, this.y - this.radius);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.strokeStyle = "white";
  }
}

export default Player;
