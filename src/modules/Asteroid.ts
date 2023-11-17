import Enemy from "./Enemy";
import Game from "./Game";
import asteroidImage from "../assets/asteroid.png";

class Asteroid extends Enemy {
  constructor(game: Game) {
    super(game, asteroidImage);
  }
}

export default Asteroid;
