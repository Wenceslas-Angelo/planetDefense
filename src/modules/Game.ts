import Asteroid from "./Asteroid";
import Enemy from "./Enemy";
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
  enemyPool: Enemy[];
  numberOfEnemies: number;
  enemyInterval: number;
  enemyTimer: number;

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

    this.enemyPool = [];
    this.numberOfEnemies = 20;
    this.createEnemyPool();
    this.enemyInterval = 5000;
    this.enemyTimer = 0;
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

  createEnemyPool() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      this.enemyPool.push(new Asteroid(this));
    }
  }

  getEnemy() {
    for (let i = 0; i < this.enemyPool.length; i++) {
      if (this.enemyPool[i].free) return this.enemyPool[i];
    }
  }

  render(context: CanvasRenderingContext2D, deltaTime: number) {
    this.planet.draw(context);

    this.player.draw(context);
    this.player.update();

    for (let projectile of this.projectilePool) {
      projectile.draw(context);
      projectile.update();
    }

    for (let enemy of this.enemyPool) {
      enemy.draw(context);
      enemy.update();
    }

    if (this.enemyTimer < this.enemyInterval) {
      this.enemyTimer += deltaTime;
    } else {
      this.enemyTimer = 0;
      const enemy = this.getEnemy();
      if (enemy) {
        enemy.start();
      }
    }
  }
}

export default Game;
