import Canvas from './canvas';

const canvas = new Canvas();
const { ctx } = canvas;

// Line
ctx.strokeStyle = 'aqua';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(500, 230);
ctx.lineTo(500, 100);
ctx.lineTo(600, 200);
ctx.lineTo(700, 100);
ctx.lineTo(800, 200);
ctx.lineTo(900, 100);
ctx.lineTo(900, 230);
ctx.lineTo(500, 230);
ctx.stroke();
