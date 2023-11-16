import Planet from "./Planet";
import Player from "./Player";

class Game {
  width: number;
  height: number;
  planet: Planet;
  player: Player;
  mouse: { x: number; y: number };

  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.planet = new Planet(this);
    this.player = new Player(this);
    this.mouse = { x: 0, y: 0 };
    this.moveMouse();
  }

  moveMouse() {
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.offsetX;
      this.mouse.y = event.offsetY;
    });
  }

  render(context: CanvasRenderingContext2D) {
    // Updates
    this.player.update();

    // Draws
    this.planet.draw(context);
    this.player.draw(context);
  }
}

export default Game;
