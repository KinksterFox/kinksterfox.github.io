// HUD
const speedometer = document.getElementById('speedometer');
const coordinates = document.getElementById('coordinates');

// Sub
const sub = document.getElementById('sub');

const subP = {};
subP['transform'] = {
    width: 400,
    height: 200,
    x: window.innerWidth * 0.5,
    y: 260,
    angle: 0
}

subP['destination'] = {
    x: subP.transform.x,
    y: subP.transform.y
}
subP['speed'] = {
    x: 0,
    y: 0,

    xMax: 6,
    yMax: 2,

    xAccel: 0.02,
    yAccel: 0.01
}

// Initialization
let transformXBig = 0, transformXSmall = 0;
let transformXRange;
let transformXDisplay = subP.transform.x;
let destinationXDisplay = subP.destination.x;

let transformYBig = 0, transformYSmall = 0;
let transformYRange;
let transformYDisplay = subP.transform.y;
let destinationYDisplay = subP.destination.y;

let speedXDisplay = subP.speed.x;
let speedYDisplay = subP.speed.y;;

let angle;

window.addEventListener('load', function () {

    function float() {
        // Dashboard
        transformXDisplay = Math.round(subP.transform.x);
        destinationXDisplay = Math.round(subP.destination.x);

        transformYDisplay = Math.round(subP.transform.y);
        destinationYDisplay = Math.round(subP.transform.y);

        speedXDisplay = Math.round(subP.speed.x * 100) / 100;
        speedYDisplay = Math.round(subP.speed.y * 100) / 100;

        coordinates.innerHTML = `Current XY: (${transformXDisplay} , ${transformYDisplay})<br> 
        Destination: (${destinationXDisplay} , ${destinationYDisplay})`;
        speedometer.innerHTML = `Horizontal Speed ${speedXDisplay} <br> Vertical Speed ${speedYDisplay}`;

        // Horizontal Movement
        subP.transform.x += Math.round(subP.speed.x * 100) / 100;

        if (subP.speed.x <= subP.speed.xMax && subP.speed.x >= -subP.speed.xMax) {
            subP.speed.x += Math.round(subP.speed.xAccel * 100) / 100;
        }
        if (subP.speed.x > subP.speed.xMax) {
            subP.speed.x = subP.speed.xMax;
        }
        if (subP.speed.x < -subP.speed.xMax) {
            subP.speed.x = -subP.speed.xMax;
        }

        sub.style.left = subP.transform.x + 'px';

        if (subP.transform.x > subP.destination.x) {
            transformXSmall = subP.destination.x
            transformXBig = subP.transform.x
        } else {
            transformXSmall = subP.transform.x
            transformXBig = subP.destination.x
        }
        transformXRange = (transformXBig - transformXSmall);

        // Acceleration
        if (subP.transform.x < subP.destination.x) {
            subP.speed.xAccel = 0.02 * (transformXRange * 0.01);
        }
        if (subP.transform.x > subP.destination.x) {
            subP.speed.xAccel = -0.02 * (transformXRange * 0.01);
        }

        // Vertical Movement
        subP.transform.y += Math.round(subP.speed.y * 100) / 100;

        if (subP.speed.y <= subP.speed.yMax && subP.speed.y >= -subP.speed.yMax) {
            subP.speed.y += Math.round(subP.speed.yAccel * 100) / 100;
        }
        if (subP.speed.y > subP.speed.yMax) {
            subP.speed.y = subP.speed.yMax;
        }
        if (subP.speed.y < -subP.speed.yMax) {
            subP.speed.y = -subP.speed.yMax;
        }

        sub.style.top = subP.transform.y + 'px';

        if (subP.transform.y > subP.destination.y) {
            transformYSmall = subP.destination.y
            transformYBig = subP.transform.y
        } else {
            transformYSmall = subP.transform.y
            transformYBig = subP.destination.y
        }
        transformYRange = (transformYBig - transformYSmall);

        // Ease In Out
        if (subP.transform.y < subP.destination.y) {
            subP.speed.yAccel = 0.01 * transformYRange * 0.01;
        }
        if (subP.transform.y > subP.destination.y) {
            subP.speed.yAccel = -0.01 * transformYRange * 0.01;
        }

        // Brake
        if (transformXRange < 300 || transformXRange < 100) {
            if (transformXRange < 10 && transformYRange < 10) {
                subP.speed.x = 0;
                subP.speed.y = 0;
            }

            if (transformXRange < 300) {
                if (subP.speed.x != 0) {
                    subP.speed.x = lerp(subP.speed.x, 0, 0.06);
                }
            }

            if (transformYRange < 75) {
                if (subP.speed.y != 0) {
                    subP.speed.y = lerp(subP.speed.y, 0, 0.04);
                }
            }

            if (speedXDisplay == 0 && speedYDisplay == 0) {
                clearMarker();
            }
        }

        // Transform Submarine
        subP.transform.angle = subP.speed.y * 5;

        if (subP.speed.x < 0) {
            sub.style.transform = `scaleX(-1)  rotate(${subP.transform.angle}deg)`
            sub.lastElementChild.style.transform = `scaleX(-1)`
        } else {
            sub.style.transform = `scaleX(1)  rotate(${subP.transform.angle}deg)`
            sub.lastElementChild.style.transform = `scaleX(1)`
        }
    }
    setInterval(float, 7.14);
})

document.getElementById('sealine').addEventListener('click', (event) => {
    subP.destination.x = event.x;
    subP.destination.y = event.y;
    drawMarker();
})

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

// Canvas
const canvas = document.getElementById('marker');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function drawMarker() {
    clearMarker();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(subP.destination.x, subP.destination.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function clearMarker() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* // Canvas Game
let myGamePiece;

function startGame() {
    myGamePiece = new component();
    myGameArea.start();
}

const myGameArea = {
    canvas: document.createElement("canvas"),

    start: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 7.14);
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    
    stop: function () {
        this.clear(this.interval);
    }
}

function component() {
    this.image = new Image();
    this.image.src = "images/submarine.svg";
    this.width = subP.transform.width;
    this.height = subP.transform.height;
    this.x = subP.transform.x;
    this.y = subP.transform.y;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.x += subP.speed.xAccel;
        this.y += subP.speed.yAccel;        
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

window.addEventListener('load', startGame()) */