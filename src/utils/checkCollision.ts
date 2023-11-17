type Param = {
  x: number;
  y: number;
  radius: number;
};

export const checkCollision = (a: Param, b: Param) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dx, dy);
  const sumOfRadius = a.radius + b.radius;
  return distance < sumOfRadius;
};
