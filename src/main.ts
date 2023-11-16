import Game from "./modules/Game";

const canvas = document.querySelector("canvas");

if (canvas) {
  const context = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  if (context) {
    const game = new Game(canvas.width, canvas.height);

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      game.render(context);
      requestAnimationFrame(animate);
    };
    animate();
  }
}
