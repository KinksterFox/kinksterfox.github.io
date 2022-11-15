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

const animationContainer = document.getElementById('animationContainer');

let scale;
let animContWidth;
let animContHeight;

window.addEventListener('load', () => {
    scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) + 0.10
    animContWidth = window.innerWidth;
    animContHeight = Math.min(window.innerWidth, window.innerHeight);

    animationContainer.style.width = `${animContWidth}px`;
    animationContainer.style.height = `${animContHeight}px`;

    iconCanvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
    document.getElementById('blur').style.transform = `translate(-50%, -50%) scale(${scale})`;
    document.getElementById('typeLogo').style.transform = `translate(-50%, -50%) scale(${scale})`;
})

window.addEventListener('resize', () => {
    scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080) + 0.10
    animContWidth = window.innerWidth;
    animContHeight = Math.min(window.innerWidth, window.innerHeight);

    animationContainer.style.width = `${animContWidth}px`;
    animationContainer.style.height = `${animContHeight}px`;

    iconCanvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
    document.getElementById('blur').style.transform = `translate(-50%, -50%) scale(${scale})`;
    document.getElementById('typeLogo').style.transform = `translate(-50%, -50%) scale(${scale})`;
});