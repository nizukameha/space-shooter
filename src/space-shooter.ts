//Game level
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ship = document.querySelector<HTMLImageElement>("#ship");
const blackHole = document.querySelector<HTMLImageElement>("#black-hole");
const redPlanet = document.querySelector<HTMLImageElement>("#red-planet");
const galaxy = document.querySelector<HTMLImageElement>("#galaxy");

let health = document.querySelector<HTMLSpanElement>('#health');
let healthCounter:number = 100;
let random = getRandomInt(50, 150);
let randomStar = getRandomInt(50, 150);

if (health) {
    health.innerHTML = String(healthCounter);
}

//Space ship object
const spaceShip = {
    shipX: 225,
    shipY: 640,
    shipWidth: 50,
    shipHeight: 50
}

//Ennemies object
const bHole = {
    ennemieX : getRandomInt(0, 450),
    ennemieY : getRandomInt(-100, -50),
    ennemieWidth: random,
    ennemieHeight: random
}

const gala = {
    ennemieX : getRandomInt(0, 450),
    ennemieY : getRandomInt(-100, -50),
    ennemieWidth: random,
    ennemieHeight: random
}

const rPlanet = {
    ennemieX : getRandomInt(0, 450),
    ennemieY : getRandomInt(-600, -200),
    ennemieWidth : random,
    ennemieHeight : random
}

//Key pressed
let rightPressed: boolean = false;
let leftPressed: boolean = false;
let downPressed:boolean = false;
let upPressed:boolean = false;

//If a key is pressed a function is called
document.addEventListener("keydown", (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
    }

});
document.addEventListener("keyup", (event) => {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key == "Down" || event.key == "ArrowDown") {
        downPressed = true;
    }
    else if (event.key == "Up" || event.key == "ArrowUp") {
        upPressed = true;
    }

});
document.addEventListener("keyup", (event) => {
    if (event.key == "Down" || event.key == "ArrowDown") {
        downPressed = false;
    }
    else if (event.key == "Up" || event.key == "ArrowUp") {
        upPressed = false;
    }
});


/**
 * Draw stars
 */
function drawStars(stars:any) {
    if (ctx) {
        ctx.beginPath();
        ctx.rect(stars.starY, stars.starRadius, 0, Math.PI * 2);
        ctx.arc(stars.starX, stars.starY, stars.starRadius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

/**
 * Generate random int between the given interval
 * @param min interval minimum
 * @param max interval maximum
 * @returns random int
 */
function getRandomInt(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

/**
 * Generate stars randomly in the canvas
 */
function generateStars() {
    for (let index = 0; index < 150; index++) {      
        const stars = {
            starRadius: getRandomInt(0, 3),
            starX: getRandomInt(0, 500),
            starY: getRandomInt(0, 700),
            starWidth: randomStar,
            starHeight: randomStar
        }
        drawStars(stars);
    }
}

/**
 * Draw the space ship
 */
function drawShip() {
    requestAnimationFrame(drawShip);//draw ship infinite
    collisionDetection(bHole);
    collisionDetection(rPlanet);
    drawEnnemies(blackHole, bHole);
    drawEnnemies(redPlanet, rPlanet);
    drawEnnemies(galaxy, gala);
    if (ctx && ship) {
        ctx.clearRect(spaceShip.shipX, spaceShip.shipY, spaceShip.shipWidth, spaceShip.shipHeight);
        if (rightPressed && spaceShip.shipX <= (canvas.width - 50)) {
            spaceShip.shipX += 5;
        } else if (leftPressed && spaceShip.shipX > 0) {
            spaceShip.shipX -= 5;
        }
        if (upPressed && spaceShip.shipY > 0) {
            spaceShip.shipY -= 5;
        } else if (downPressed && spaceShip.shipY <= (canvas.height - 60)) {
            spaceShip.shipY += 5;
        }
        ctx.drawImage(ship, spaceShip.shipX, spaceShip.shipY, spaceShip.shipWidth, spaceShip.shipHeight);
    }
    if(healthCounter < 0) {
        alert('GAME OVER');
        document.location.reload();//Restart the game
    }
};

/**
 * Draw ennemies
 */
function drawEnnemies(eImg:any, e:any) {
    moveEnnemies(e);
    if (ctx && e) {
        ctx.drawImage(eImg, e.ennemieX, e.ennemieY, e.ennemieWidth, e.ennemieHeight);
    }
};

/**
 * Move ennemies on Y axis
 */
function moveEnnemies(e:any) {
    if (ctx) {
        ctx.clearRect(e.ennemieX, e.ennemieY, e.ennemieWidth, e.ennemieHeight);
    }
    if (e.ennemieY <= 700) {
        e.ennemieY += 3;
    } else {
        e.ennemieX = getRandomInt(-50, 450);
        e.ennemieY = getRandomInt(-600, -50);
        random = getRandomInt(50, 150);
        e.ennemieWidth = random;
        e.ennemieHeight = random;
    }
}


function collisionDetection(e) {
    if (spaceShip.shipX > e.ennemieX - e.ennemieWidth && spaceShip.shipX < e.ennemieX + e.ennemieWidth){
        if (spaceShip.shipY > e.ennemieY && spaceShip.shipY < e.ennemieY + e.ennemieHeight){
            healthCounter--;
            if (health) {
                health.innerHTML = String(healthCounter);
                health.style.color = 'red';
            }
        }
    } else {
        if(health) {
            health.style.color = 'white';
        }
    }
    
}


generateStars();
drawShip();