const defaultStyle = {
  fontFamily: 'Press Start 2P',
};

export const big = (color, fontsize) => ({
  ...defaultStyle,
  fontSize: fontsize || 36,
  fill: color,
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});

export const small = (color) => ({
  ...defaultStyle,
  fontSize: 20,
  fill: color,
  stroke: '#4a1850',
  strokeThickness: 3,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 3,
});
