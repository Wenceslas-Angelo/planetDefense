import Game from "./modules/Game";

const canvas = document.querySelector("canvas");

if (canvas) {
  const context = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  if (context) {
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    const animate = (timeStamp: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      game.render(context, deltaTime);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}
