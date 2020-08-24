import Canvas from './canvas';

const canvas = new Canvas();
const { ctx } = canvas;

// Rect
ctx.fillStyle = 'tomato';
ctx.fillRect(100, 100, 50, 50);
ctx.fillStyle = 'aqua';
ctx.fillRect(150, 200, 60, 60);
ctx.fillStyle = 'grey';
ctx.fillRect(300, 120, 40, 40);
