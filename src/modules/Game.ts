import Planet from "./Planet";
import Player from "./Player";
import Projectile from "./Projectile";

class Game {
  width: number;
  height: number;
  planet: Planet;
  player: Player;
  mouse: { x: number; y: number };
  debug: boolean;
  projectilePool: Projectile[];
  numberOfProjectiles: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.planet = new Planet(this);
    this.player = new Player(this);
    this.mouse = { x: 0, y: 0 };
    this.moveMouse();
    this.debug = false;
    this.changeDebugValue();
    this.projectilePool = [];
    this.numberOfProjectiles = 20;
    this.createProjectilePool();
    this.shootPlayerEvent();
  }

  moveMouse() {
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.offsetX;
      this.mouse.y = event.offsetY;
    });
  }

  shootPlayerEvent() {
    window.addEventListener("mousedown", () => {
      this.player.shoot();
    });
    window.addEventListener("keyup", (event) => {
      if (event.key === " ") {
        this.player.shoot();
      }
    });
  }

  changeDebugValue() {
    window.addEventListener("keyup", (event) => {
      if (event.key === "d") {
        this.debug = !this.debug;
      }
    });
  }

  createProjectilePool() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilePool.push(new Projectile(this));
    }
  }

  getProjectile() {
    for (let i = 0; i < this.projectilePool.length; i++) {
      if (this.projectilePool[i].free) return this.projectilePool[i];
    }
  }

  render(context: CanvasRenderingContext2D) {
    this.planet.draw(context);

    this.player.draw(context);
    this.player.update();

    for (let projectile of this.projectilePool) {
      projectile.draw(context);
      projectile.update();
    }
  }
}

export default Game;
