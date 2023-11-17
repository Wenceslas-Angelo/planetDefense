import { createImage } from "../utils/createImage";
import Game from "./Game";
import planetImage from "../assets/planet.png";

class Planet {
  private x: number;
  private y: number;
  private radius: number;
  private image: HTMLImageElement;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.x = game.width / 2;
    this.y = game.height / 2;
    this.radius = 80;
    this.image = createImage(planetImage);
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x - 100, this.y - 100);

    if (this.game.debug) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.moveTo(this.x, this.y);
      context.lineTo(this.game.mouse.x, this.game.mouse.y);
      context.stroke();
      context.strokeStyle = "white";
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

export default Planet;
