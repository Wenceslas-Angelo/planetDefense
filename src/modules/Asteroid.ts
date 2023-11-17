import Enemy from "./Enemy";
import Game from "./Game";
import asteroidImage from "../assets/asteroid.png";

class Asteroid extends Enemy {
  constructor(game: Game) {
    super(game, asteroidImage, Math.floor(Math.random() * 4), 5, 7);
  }
}

export default Asteroid;
