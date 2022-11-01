const iconCanvas = document.getElementById('iconCanvas');
let iconCtx = iconCanvas.getContext('2d');
let angle = 0;

iconCanvas.width = 500; iconCanvas.height = 500;

// Image
const img = new Image();
img.src = 'images/Profile Picture - Circle.png';

// Circle
iconCtx.strokeStyle = 'white';
iconCtx.fillStyle = 'black';
iconCtx.lineWidth = 10;

iconCtx.beginPath();
iconCtx.arc(250, 250, 250, 0, 2 * Math.PI);
iconCtx.closePath();
iconCtx.fill();
iconCtx.stroke();

img.addEventListener('load', () => {
    iconCtx.drawImage(img, 0, 0, 500, 500)
});