type Param = {
  x: number;
  y: number;
};

export const calcAim = (a: Param, b: Param) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.hypot(dx, dy);
  const aimX = dx / distance;
  const aimY = dy / distance;
  return [aimX, aimY, dx, dy];
};
