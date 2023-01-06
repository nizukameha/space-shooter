//Interface
import { SpaceShip, Ennemies } from "./entities";

//Game level
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const canvaBackground: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvaBackground");
const ctx = canvas.getContext("2d");
const ctxBackground = canvaBackground.getContext("2d");
const ship = document.querySelector<HTMLImageElement>("#ship");
const blackHole = document.querySelector<HTMLImageElement>("#black-hole");
const redPlanet = document.querySelector<HTMLImageElement>("#red-planet");
const galaxy = document.querySelector<HTMLImageElement>("#galaxy");
const shotImg = document.querySelector<HTMLImageElement>("#shot");

let health = document.querySelector<HTMLSpanElement>('#health');
let time = document.querySelector<HTMLSpanElement>('#time');
let healthCounter: number = 3;
let timeCounterS: number = 0;
let timeCounterM: number = 0;
let random = getRandomInt(50, 130);
let randomStar = getRandomInt(50, 150);
let movingEnnemie: number = 5;
let movingShip: number = 5;

//Key pressed
let rightPressed: boolean = false;
let leftPressed: boolean = false;
let downPressed: boolean = false;
let upPressed: boolean = false;
let spacePressed: boolean = false;


const spaceShip:SpaceShip = {
    image: ship,
    shipX: 225,
    shipY: 640,
    shipWidth: 50,
    shipHeight: 50
}

const shot = {
    image: shotImg,
    shotX: spaceShip.shipX,
    shotY: spaceShip.shipY,
    shotWidth: 40,
    shotHeight: 40
}

const bHole:Ennemies = {
    image: blackHole,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random,
    isTouch: false
}

const gala:Ennemies = {
    image: galaxy,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random,
    isTouch: false
}

const rPlanet:Ennemies = {
    image: redPlanet,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random,
    isTouch: false
}

//Array of ennemies
let ennemies = [bHole, gala, rPlanet];

//Generate ennemies first time
for (let i = 0; i < ennemies.length; i++) {
    ennemieAxisRandom(ennemies[i]);
}

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
document.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        spacePressed = true;
    }

});
document.addEventListener("keyup", (event) => {
    if (event.code == "Space") {
        spacePressed = false;
    }
});

/**
 * Draw stars
 */
function drawStars(stars: any) {
    if (ctxBackground) {
        ctxBackground.beginPath();
        ctxBackground.rect(stars.starY, stars.starRadius, 0, Math.PI * 2);
        ctxBackground.arc(stars.starX, stars.starY, stars.starRadius, 0, Math.PI * 2);
        ctxBackground.fillStyle = "white";
        ctxBackground.fill();
        ctxBackground.closePath();
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
 * Launch the game
 */
function init() {
    requestAnimationFrame(init);
    collisionDetection(ennemies);
    shipShot();
    shotDetection(ennemies);
    moveEnnemies(ennemies);
    drawEnnemies(ennemies);
    moveShip();
};

function timer() {
    setInterval(() => {
        if (time && timeCounterS < 60) {
            timeCounterS++;
            if (timeCounterM >= 1) {
                time.innerHTML = String(timeCounterM + ':' + timeCounterS);
            } else {
                time.innerHTML = String(timeCounterS);
            }
        } else {
            if (time) {
                timeCounterS = 0;
                timeCounterM++;
                time.innerHTML = String(timeCounterM + ':' + timeCounterS);
            }
        }
    }, 1000)
    setInterval(() => {
        movingEnnemie += 1;
        movingEnnemie += 1;
    }, 5000)
}

function moveShip() {
    if (ctx && spaceShip.image && shot.image) {
        ctx.clearRect(spaceShip.shipX, spaceShip.shipY, spaceShip.shipWidth, spaceShip.shipHeight);
        if (rightPressed && spaceShip.shipX <= (canvas.width - 50)) {
            spaceShip.shipX += movingEnnemie;
            shot.shotX += 5;
        } else if (leftPressed && spaceShip.shipX > 0) {
            spaceShip.shipX -= movingEnnemie;
            shot.shotX -= 5;
        }
        if (upPressed && spaceShip.shipY > 0) {
            spaceShip.shipY -= movingEnnemie;
            shot.shotY -= 5;
        } else if (downPressed && spaceShip.shipY <= (canvas.height - 60)) {
            spaceShip.shipY += movingEnnemie;
            shot.shotY += 5;
        }
        ctx.drawImage(spaceShip.image, spaceShip.shipX, spaceShip.shipY, spaceShip.shipWidth, spaceShip.shipHeight);
    }
    if (healthCounter <= 0) {
        alert('GAME OVER');
        document.location.reload();//Restart the game
    }
}

/**
 * Shot of the ship
 */
function shipShot() {
    if (spacePressed && ctx && shot.image) {
        ctx.clearRect(shot.shotX, shot.shotY, shot.shotWidth, shot.shotHeight);
        ctx.drawImage(shot.image, shot.shotX, shot.shotY, shot.shotWidth, shot.shotHeight);
        shot.shotY -= 15;
    } else {
        if (ctx) {
            ctx.clearRect(shot.shotX, shot.shotY, shot.shotWidth, shot.shotHeight);
            shot.shotY = spaceShip.shipY;
        }
    }
}

/**
 * Draw ennemies
 */
function drawEnnemies(e: any) {
    for (let i = 0; i < ennemies.length; i++) {
        if (ctx && e) {
            ctx.drawImage(e[i].image, e[i].ennemieX, e[i].ennemieY, e[i].ennemieWidth, e[i].ennemieHeight);
        }
    }
};

/**
 * Move ennemies on Y axis
 */
function moveEnnemies(en: any) {
    if (ctx) {
        for (let i = 0; i < ennemies.length; i++) {
            ctx.clearRect(en[i].ennemieX, en[i].ennemieY, en[i].ennemieWidth, en[i].ennemieHeight);
            if (en[i].ennemieY <= canvas.height) {
                en[i].ennemieY += movingEnnemie;//
            } else {
                en[i].isTouch = false;
                ennemieAxisRandom(en[i]);
                random = Math.trunc(getRandomInt(50, 130));
                en[i].ennemieWidth = random;
                en[i].ennemieHeight = random;
            }
        }
    }
}

/**
 * generate random postion on the X axis
 * @returns randomX who is an array with position
 */
function generateRandomX() {
    let randomX = [];
    let intervalMin = -64;
    let intervalMax = (Math.trunc((canvas.width) / ennemies.length));
    for (let i = 0; i < ennemies.length; i++) {
        randomX[i] = Math.trunc(getRandomInt(intervalMin + intervalMax, intervalMax / 2));
        intervalMax += intervalMax;
    }
    randomX.sort(() => 0.5 - Math.random());
    return (randomX)
}

/**
 * generate random postion on the Y axis
 * @returns randomY who is an array with position
 */
function generateRandomY() {
    let randomY = [];
    let intervalMin = -783;
    let intervalMax = (Math.trunc((canvas.height) / ennemies.length - 150));
    for (let i = 0; i < ennemies.length; i++) {
        randomY[i] = Math.trunc(getRandomInt(intervalMin + intervalMax, intervalMin + intervalMax * 2));
        intervalMax += intervalMax;
    }
    randomY.sort(() => 0.5 - Math.random());
    return (randomY)
}

/**
 * Define random value for the Y axis of the ennemie
 */
function ennemieAxisRandom(enn: any) {
    let randomX = generateRandomX();
    let randomY = generateRandomY();
    for (let i = 0; i < randomX.length; i++) {
        //ennemies[i].ennemieX = randomX[i];
        enn.ennemieX = Number(randomX.splice(i, 1));
        enn.ennemieY = Number(randomY.splice(i, 1))
    }
    if (randomX.length == 0 && randomY.length == 0) {
        generateRandomX();
        generateRandomY();
    }
}

/**
 * Detect if there is a collision between the space ship and an ennemie
 * @param e event
 */
function collisionDetection(e: any) {
    for (let i = 0; i < e.length; i++) {
        if (spaceShip.shipX > e[i].ennemieX - (e[i].ennemieWidth / 2) && spaceShip.shipX < e[i].ennemieX + e[i].ennemieWidth) {// - (e[i].ennemieWidth / 2) car x est situé au centre de l'objet
            if (spaceShip.shipY > e[i].ennemieY - (e[i].ennemieHeight / 2) && spaceShip.shipY < e[i].ennemieY + e[i].ennemieHeight) {
                healthCounter--;
                if (health) {
                    health.innerHTML = String(healthCounter);
                    health.style.color = 'red';
                }
            } else {
                if (health) {
                    health.style.color = 'white';
                }
            }
        }
    }
    
}

function shotDetection(e:any) {
    for (let i = 0; i < e.length; i++) {
        if (shot.shotX > e[i].ennemieX - (e[i].ennemieWidth / 2) && shot.shotX < e[i].ennemieX + e[i].ennemieWidth) {
            if (shot.shotY > e[i].ennemieY - (e[i].ennemieHeight / 2) && shot.shotY < e[i].ennemieY + e[i].ennemieHeight) {
                if (ctx) {
                    e[i].isTouch = true;
                    ctx.clearRect(e[i].ennemieX, e[i].ennemieY, e[i].ennemieWidth, e[i].ennemieHeight);
                    ennemieAxisRandom(e[i]);
                }   
            }
        }
    }
}


generateStars();
init();
timer();

//Display health
if (health) {
    health.innerHTML = String(healthCounter);
}

/*
REVOIR LA GENERATION ALEATOIRE D'ENNEMIES CAR C'EST LA MERDE
FAIRE EN SORTE D'AVOIR 3 OU 4 ENNEMIES EN MEME TEMPS ET QUE CE NE SOIT PAS TOUJOURS LES MEMES
*/