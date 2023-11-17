import Enemy from "./Enemy";
import Game from "./Game";
import lobstermorphImage from "../assets/lobstermorph.png";

class Lobstermorph extends Enemy {
  constructor(game: Game) {
    super(game, lobstermorphImage, Math.floor(Math.random() * 4), 8, 14);
  }
}

export default Lobstermorph;
