import Planet from "./Planet";

class Game {
  width: number;
  height: number;
  planet: Planet;
  mouse: { x: number; y: number };

  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.planet = new Planet(this);
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
    this.planet.draw(context);
  }
}

export default Game;
