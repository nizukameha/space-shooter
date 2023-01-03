//Game level
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ship = document.querySelector<HTMLImageElement>("#ship");
const blackHole = document.querySelector<HTMLImageElement>("#black-hole");
const redPlanet = document.querySelector<HTMLImageElement>("#red-planet");
const galaxy = document.querySelector<HTMLImageElement>("#galaxy");

let health = document.querySelector<HTMLSpanElement>('#health');
let healthCounter: number = 100;
let random = getRandomInt(50, 150);
let randomStar = getRandomInt(50, 150);
let randomX = Math.trunc(getRandomInt(0, 450));
let randomY = Math.trunc(getRandomInt(-800, -50));

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
    ennemieX: randomX,
    ennemieY: randomY,
    ennemieWidth: random,
    ennemieHeight: random
}

const gala = {
    ennemieX: randomX,
    ennemieY: randomY,
    ennemieWidth: random,
    ennemieHeight: random
}

const rPlanet = {
    ennemieX: randomX,
    ennemieY: randomY,
    ennemieWidth: random,
    ennemieHeight: random
}


//Key pressed
let rightPressed: boolean = false;
let leftPressed: boolean = false;
let downPressed: boolean = false;
let upPressed: boolean = false;

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
function drawStars(stars: any) {
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
function getRandomInt(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

/**
 * Generate stars randomly in the canvas
 */
function generateStars() {
    for (let index = 0; index < 150; index++) {
        const stars = {
            starRadius: Math.trunc(getRandomInt(0, 3)),
            starX: Math.trunc(getRandomInt(0, 500)),
            starY: Math.trunc(getRandomInt(0, 700)),
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
    collisionDetection(gala);
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
    if (healthCounter < 0) {
        alert('GAME OVER');
        document.location.reload();//Restart the game
    }
};

/**
 * Draw ennemies
 */
function drawEnnemies(eImg: any, e: any) {
    moveEnnemies(e);
    if (ctx && e) {
        ctx.drawImage(eImg, e.ennemieX, e.ennemieY, e.ennemieWidth, e.ennemieHeight);
    }
};

/**
 * Move ennemies on Y axis
 */
function moveEnnemies(e: any) {
    if (ctx) {
        ctx.clearRect(e.ennemieX, e.ennemieY, e.ennemieWidth, e.ennemieHeight);
    }
    if (e.ennemieY <= 700) {
        e.ennemieY += 3;
    } else {
        e.ennemieX = Math.trunc(getRandomInt(-50, 450));
        e.ennemieY = Math.trunc(getRandomInt(-800, -50));
        random = Math.trunc(getRandomInt(50, 150));
        e.ennemieWidth = random;
        e.ennemieHeight = random;
    }
}

/**
 * Detect if there is a collision between the space ship and an ennemie
 * @param e event
 */
function collisionDetection(e: any) {
    if (spaceShip.shipX > e.ennemieX && spaceShip.shipX < e.ennemieX + e.ennemieWidth) {
        if (spaceShip.shipY > e.ennemieY && spaceShip.shipY < e.ennemieY + e.ennemieHeight) {
            healthCounter--;
            if (health) {
                health.innerHTML = String(healthCounter);
                health.style.color = 'red';
            }
        }
    } else {
        if (health) {
            health.style.color = 'white';
        }
    }
}


generateStars();
drawShip();

/*
Les points de vie ne s'affichent pas toujours en rouge quand ils diminuent
Des fois les ennemis se génerent les uns sur les autres
Il arrive ausi que le space ship prennent des dégats sans etre en collision avec un ennemi
*/