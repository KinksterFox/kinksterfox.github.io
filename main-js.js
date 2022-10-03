// Initialization
let speedometer = document.getElementById('speedometer');
let position = document.getElementById('position');
let sub = document.getElementById('sub');

let positionX = 860;
let positionXEnd = positionX;
let positionXRange;
let positionXRangeDisplay = positionXRange;
let positionXDisplay = positionX;
let destinationXDisplay = positionXEnd;
let positionXBig = 0, positionXSmall = 0;

let positionY = 280;
let positionYEnd = positionY;
let positionYRange;
let positionYRangeDisplay = positionYRange;
let positionYDisplay = positionY;
let destinationYDisplay = positionYEnd;
let positionYBig = 0, positionYSmall = 0;

let speedX = 0, speedXMax = 10; accelX = 0.02
let speedY = 0; speedYMax = 2; accelY = 0.01
let speedXDisplay = speedX;
let speedYDisplay = speedY;

let angle;

window.addEventListener('load', function () {

    function float () {
        // Dashboard
        positionXDisplay = Math.round(positionX);
        destinationXDisplay = Math.round(positionXEnd);
        positionXRangeDisplay = Math.round(positionXRange);

        positionYDisplay = Math.round(positionY);
        destinationYDisplay = Math.round(positionYEnd);
        positionYRangeDisplay = Math.round(positionYRange);

        speedXDisplay = Math.round(speedX * 100) / 100;
        speedYDisplay = Math.round(speedY * 100) / 100;
        
        position.innerHTML = `Position XY (${positionXDisplay} , ${positionYDisplay}) Destination: (${destinationXDisplay} , ${destinationYDisplay})`;
        speedometer.innerHTML = `Horizontal Speed ${speedXDisplay} <br> Vertical Speed ${speedYDisplay}`;

        // Horizontal Movement
        positionX += Math.round(speedX * 100) / 100;

        if (speedX <= speedXMax && speedX >= -speedXMax) {
            speedX += Math.round(accelX * 100) / 100;
        }
        if (speedX > speedXMax) {
            speedX = speedXMax;
        }
        if (speedX < -speedXMax) {
            speedX = -speedXMax;
        }

        sub.style.left = positionX + 'px';

        if (positionX > positionXEnd) {
            positionXSmall = positionXEnd
            positionXBig = positionX
        } else {
            positionXSmall = positionX
            positionXBig = positionXEnd
        }
        positionXRange = (positionXBig - positionXSmall);

        // Ease In Out
        if (positionX < positionXEnd) {
            accelX = 0.02 * (positionXRange * 0.01);
        }
        if (positionX > positionXEnd) {
            accelX = -0.02 * (positionXRange * 0.01);
        }

        // Vertical Movement
        positionY += Math.round(speedY * 100) / 100;

        if (speedY <= speedYMax && speedY >= -speedYMax) {
            speedY += Math.round(accelY * 100) / 100;
        }
        if (speedY > speedYMax) {
            speedY = speedYMax;
        }
        if (speedY < -speedYMax) {
            speedY = -speedYMax;
        }

        sub.style.top = positionY + 'px';
        
        if (positionY > positionYEnd) {
            positionYSmall = positionYEnd
            positionYBig = positionY
        } else {
            positionYSmall = positionY
            positionYBig = positionYEnd
        }
        positionYRange = (positionYBig - positionYSmall);

        // Ease In Out
        if (positionY < positionYEnd) {
            accelY = 0.01 * positionYRange * 0.01;
        }
        if (positionY > positionYEnd) {
            accelY = -0.01 * positionYRange * 0.01;
        }

        // Brake
        if (positionXRange < 300 || positionXRange < 100) {
            if (positionXRange < 10 && positionYRange < 10) {
                speedX = 0;
                speedY = 0;
            }
            
            if (positionXRange < 300) {
                if (speedX != 0) {
                    speedX = lerp (speedX, 0, 0.06);
                }
            }

            if (positionYRange < 75) {
                if (speedY != 0) {
                    speedY = lerp (speedY, 0, 0.04);
                }
            }
        }

        // Transform Submarine
        angle = speedY * 5;

        if (speedX < 0) {
            sub.style.transform = `scaleX(-1)  rotate(${angle}deg)`
            sub.lastElementChild.style.transform = `scaleX(-1)`
        } else {
            sub.style.transform = `scaleX(1)  rotate(${angle}deg)`
            sub.lastElementChild.style.transform = `scaleX(1)`
        }
    }
    setInterval(float, 7.14);
})

document.getElementById('sealine').addEventListener('mousedown', function (event) {
    positionXEnd = event.pageX;
    positionYEnd = event.pageY;
})

function lerp (start, end, amt){
    return (1-amt)*start+amt*end
  }