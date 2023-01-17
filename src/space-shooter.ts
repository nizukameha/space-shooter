//Interface
import { SpaceShip, Ennemies, Bonus } from "./entities";
import ammo8 from '../assets/ammo8.png';
import ammo7 from '../assets/ammo7.png';
import ammo6 from '../assets/ammo6.png';
import ammo5 from '../assets/ammo5.png';
import ammo4 from '../assets/ammo4.png';
import ammo3 from '../assets/ammo3.png';
import ammo2 from '../assets/ammo2.png';
import ammo1 from '../assets/ammo1.png';
import ammo0 from '../assets/ammo0.png';
//Game level
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const canvaBackground: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvaBackground");
const ctx = canvas.getContext("2d");
const ctxBackground = canvaBackground.getContext("2d");
//DOM
const containerCanvas = document.querySelector<HTMLDivElement>(".container-canva");
const containerInfos = document.querySelector<HTMLDivElement>(".container-infos");
const containerStart = document.querySelector<HTMLDivElement>(".container-start");
const gameOver = document.querySelector<HTMLDivElement>(".gameOver");
const ship = document.querySelector<HTMLImageElement>("#ship");
const blackHole = document.querySelector<HTMLImageElement>("#black-hole");
const redPlanet = document.querySelector<HTMLImageElement>("#red-planet");
const galaxy = document.querySelector<HTMLImageElement>("#galaxy");
const shotImg = document.querySelector<HTMLImageElement>("#shot");
const ammoMax = document.querySelector<HTMLImageElement>("#ammoMax");
const normal = document.querySelector<HTMLButtonElement>("#normal");
const hard = document.querySelector<HTMLButtonElement>("#hard");
const retry = document.querySelector<HTMLButtonElement>("#retry");
let healthBarContainer = document.querySelector<HTMLDivElement>(".healthBar");
let healthBar = document.querySelector<HTMLDivElement>(".bar");
let time = document.querySelector<HTMLSpanElement>('#time');
let score = document.querySelector<HTMLSpanElement>('#score');
let ammo = document.querySelector<HTMLImageElement>('#ammo');
const shootSoundSrc = document.querySelector<HTMLAudioElement>('#shootSound');
const loopEnioSrc = document.querySelector<HTMLAudioElement>('#loopEnio');
const gameOverSoundSrc = document.querySelector<HTMLAudioElement>('#gameOverSound');
//Array
let shots: any = [];
//Number
let healthCounter: number = 200;
let scoreCounter: number = 0;
let ammoCounter: number = 8;
let timeCounterS: number = 0;
let timeCounterM: number = 0;
let random = getRandomInt(50, 100);
let randomStar = getRandomInt(50, 150);
let movingEnnemie: number = 6;
//Key pressed
let rightPressed: boolean = false;
let leftPressed: boolean = false;
let downPressed: boolean = false;
let upPressed: boolean = false;
let isHard: boolean = false;
let isEasy: boolean = false;
let isGameOver: boolean = false;


const spaceShip: SpaceShip = {
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

const bHole: Ennemies = {
    image: blackHole,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random,
    isTouch: false
}

const gala: Ennemies = {
    image: galaxy,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random,
    isTouch: false
}

const rPlanet: Ennemies = {
    image: redPlanet,
    ennemieX: 50,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random,
    isTouch: false
}

const ammoBonus: Bonus = {
    image: ammoMax,
    bonusX: 50,
    bonusY: 0,
    bonusWidth: 30,
    bonusHeight: 30,
    isTouch: false
}

//Array of ennemies
let ennemies = [bHole, gala, rPlanet];

//Array of bonus
let bonus = [ammoBonus];

// First generation of X and Y axis
let randomX = generateRandomX();
let randomY = generateRandomY();

//First random generation of ennemies
for (const iterator of ennemies) {
    ennemieAxisRandom(iterator);
}

//Generation of bonus item
setInterval(() => {
    for (const iterator of bonus) {
        iterator.isTouch = false;
        bonusAxisRandom(iterator);
    }
}, 7000);

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
    // On peux limiter les tirs avecv la taille du tableau
    if (event.code == "Space" && shots.length < 8 && (isEasy == true || isHard == true)) {
        if (shootSoundSrc) {
            shootSoundSrc.loop = false;
            shootSoundSrc?.play();
            shootSoundSrc.currentTime = 0;
            shootSoundSrc.volume = 0.1;
        }
        const shot = {
            image: shotImg,
            shotX: spaceShip.shipX,
            shotY: spaceShip.shipY,
            shotWidth: 40,
            shotHeight: 40
        }
        if (ammo) {
            ammoCounter--;
            switch (ammoCounter) {
                case 7:
                    ammo.src = ammo7;
                    break;
                case 6:
                    ammo.src = ammo6;
                    break;
                case 5:
                    ammo.src = ammo5;
                    break;
                case 4:
                    ammo.src = ammo4;
                    break;
                case 3:
                    ammo.src = ammo3;
                    break;
                case 2:
                    ammo.src = ammo2;
                    break;
                case 1:
                    ammo.src = ammo1;
                    break;
                case 0:
                    ammo.src = ammo0;
                    break;
            }

        }
        shots.push(shot);
    }
});

//Konami code
let KonamiActivated = false;
let k = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    n = 0;
document.addEventListener("keydown", (event) => {
    if (event.key === k[n++]) {
        if (n === k.length) {
            KonamiActivated = true;
            n = 0;
            return false;
        }
    }
    else {
        n = 0;
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
    if (isGameOver == false) {
        if (KonamiActivated == true && healthBar && healthCounter > 10) {
            healthCounter = 10;
            healthBar.style.width = String(healthCounter) + 'px';
            healthBar.style.backgroundColor = 'red';
            KonamiActivated = false;
        }
        if (loopEnioSrc) {
            loopEnioSrc.volume = 0.5;
            loopEnioSrc.loop = true;
            loopEnioSrc.play();
        }
        collisionDetection(ennemies);
        shipShot();
        shotDetection(ennemies, shots);
        bonusCollisionDetection(bonus);
        moveEnnemies(ennemies);
        drawEnnemies(ennemies);
        moveShip();
        for (const iterator of bonus) {
            if (iterator.isTouch == false) {
                moveBonus(bonus)
                drawBonus(bonus);
            } else {
                if (ctx) {
                    ctx.clearRect(iterator.bonusX, iterator.bonusY, iterator.bonusWidth, iterator.bonusHeight);
                }
            }
        }
    }
};

/**
 * Timer
 */
function timer() {
    setInterval(() => {
        if (isGameOver == false) {
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
        }
    }, 1000);
    if (isHard && healthBar && healthBarContainer) {
        movingEnnemie += 5;
        healthCounter = 100;
        healthBarContainer.classList.add('hardBar');
        healthBar.style.width = String(healthCounter) + 'px';
    }
}

/**
 * Move the space ship
 */
function moveShip() {
    if (ctx && spaceShip.image && shot.image) {
        ctx.clearRect(spaceShip.shipX, spaceShip.shipY, spaceShip.shipWidth, spaceShip.shipHeight);
        if (rightPressed && spaceShip.shipX <= (canvas.width - 50)) {
            spaceShip.shipX += 8;
        } else if (leftPressed && spaceShip.shipX > 0) {
            spaceShip.shipX -= 8;
        }
        if (upPressed && spaceShip.shipY > 0) {
            spaceShip.shipY -= 8;
        } else if (downPressed && spaceShip.shipY <= (canvas.height - 60)) {
            spaceShip.shipY += 8;
        }

        ctx.drawImage(spaceShip.image, spaceShip.shipX, spaceShip.shipY, spaceShip.shipWidth, spaceShip.shipHeight);
    }
    if (healthCounter <= 0) {
        isGameOver = true;
        if (loopEnioSrc && gameOverSoundSrc) {
            loopEnioSrc.pause();
            gameOverSoundSrc.volume = 0.5;
            gameOverSoundSrc.loop = false;
            gameOverSoundSrc.play();
        }
        gameOver?.classList.remove('hide');
    }
}

/**
 * Shot of the ship
 */
function shipShot() {
    for (let i = 0; i < shots.length; i++) {
        if (ctx && shot.image) {
            ctx.clearRect(shots[i].shotX, shots[i].shotY, shots[i].shotWidth, shots[i].shotHeight);
            ctx.drawImage(shots[i].image, shots[i].shotX, shots[i].shotY, shots[i].shotWidth, shots[i].shotHeight);
            shots[i].shotY -= 15;
        } else {
            if (ctx) {
                ctx.clearRect(shots[i].shotX, shots[i].shotY, shots[i].shotWidth, shots[i].shotHeight);
                shots[i].shotY = spaceShip.shipY;
                shots[i].shotX = spaceShip.shipX;
            }
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
 * Draw bonus
 */
function drawBonus(b: any) {
    for (let i = 0; i < bonus.length; i++) {
        if (ctx && b) {
            ctx.drawImage(b[i].image, b[i].bonusX, b[i].bonusY, b[i].bonusWidth, b[i].bonusHeight);
        }
    }
};

/**
 * Move bonus on Y axis
 */
function moveBonus(b: any) {
    if (ctx) {
        for (let i = 0; i < bonus.length; i++) {
            ctx.clearRect(b[i].bonusX, b[i].bonusY, b[i].bonusWidth, b[i].bonusHeight);
            if (b[i].bonusY <= canvas.height) {
                b[i].bonusY += movingEnnemie;
            }
        }
    }
}

/**
 * Move ennemies on Y axis
 */
function moveEnnemies(en: any) {
    if (ctx) {
        for (let i = 0; i < ennemies.length; i++) {
            ctx.clearRect(en[i].ennemieX, en[i].ennemieY, en[i].ennemieWidth, en[i].ennemieHeight);
            if (en[i].ennemieY <= canvas.height) {
                en[i].ennemieY += movingEnnemie;
            } else {
                en[i].isTouch = false;
                ennemieAxisRandom(en[i]);
                random = Math.trunc(getRandomInt(50, 100));
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
    //let intervalMin = -64;
    //let intervalMax = (Math.trunc((canvas.width) / ennemies.length));

    let interval = (Math.trunc((canvas.width) / (ennemies.length + 2)));
    let intervalMin = 0;
    for (let i = 0; i < ennemies.length; i++) {
        //randomX[i] = Math.trunc(getRandomInt(intervalMin + intervalMax, intervalMax / 2));
        //intervalMax += intervalMax;
        randomX[i] = Math.trunc(getRandomInt(intervalMin, intervalMin + interval));

        intervalMin += interval * 2;
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
    //let intervalMin = -783;
    //let intervalMax = (Math.trunc((canvas.height) / ennemies.length - 150));
    let interval = (Math.trunc((canvas.height) / (ennemies.length + 2)));
    let intervalMin = 0;
    for (let i = 0; i < ennemies.length; i++) {
        //randomY[i] = Math.trunc(getRandomInt(intervalMin + intervalMax, intervalMin + intervalMax * 2));
        //intervalMax += intervalMax;
        randomY.push(Math.trunc(getRandomInt(intervalMin * -1, (intervalMin + interval) * -1)));
        intervalMin += interval * 2;
    }
    randomY.sort(() => 0.5 - Math.random());
    return (randomY)
}

/**
 * Define random value for the Y axis of the ennemie
 */
function ennemieAxisRandom(enn: any) {
    if (randomX.length == 0 && randomY.length == 0) {
        randomX = generateRandomX();
        randomY = generateRandomY();
    }
    enn.ennemieX = Number(randomX.pop());
    enn.ennemieY = Number(randomY.pop())

}

/**
 * Define random value for the Y axis of the bonus
 */
function bonusAxisRandom(b: any) {
    if (randomX.length == 0 && randomY.length == 0) {
        randomX = generateRandomX();
        randomY = generateRandomY();
    }
    b.bonusX = Number(randomX.pop());
    b.bonusY = Number(randomY.pop())
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
                if (healthBar && !isHard) {
                    healthBar.style.width = String(healthCounter) + 'px';
                    if (healthCounter > 35 && healthCounter <= 75) {
                        healthBar.style.backgroundColor = 'orange';
                    } else if (healthCounter <= 35) {
                        healthBar.style.backgroundColor = 'red';
                    }
                } else if (healthBar && healthBarContainer && isHard) {
                    healthBarContainer.classList.add('hardBar');
                    healthBar.style.width = String(healthCounter) + 'px';
                    if (healthCounter > 25 && healthCounter <= 50) {
                        healthBar.style.backgroundColor = 'orange';
                    } else if (healthCounter <= 25) {
                        healthBar.style.backgroundColor = 'red';
                    }
                }
            }
        }
    }

}

/**
 * Detect if there is a collision between the space ship and an ennemie
 * @param e event
 */
function bonusCollisionDetection(b: any) {
    for (let i = 0; i < b.length; i++) {
        if (b[i].bonusX > spaceShip.shipX - (spaceShip.shipWidth / 2) && b[i].bonusX < spaceShip.shipX + spaceShip.shipWidth) {
            if (b[i].bonusY > spaceShip.shipY - (spaceShip.shipHeight / 2) && b[i].bonusY < spaceShip.shipY + spaceShip.shipHeight) {
                b[i].isTouch = true;
                shots.splice(0, 8);
                ammoCounter = 8;
                if (ammo) {
                    ammo.src = ammo8;
                }
            }
        }
    }
}

/**
 * Detect if there is a collision between the shot ship and an ennemie
 * @param e ennemies
 */
function shotDetection(e: any, shots: any) {
    for (let i = 0; i < shots.length; i++) {
        for (let j = 0; j < e.length; j++) {
            if (shots[i].shotX > e[j].ennemieX - (e[j].ennemieWidth / 2) && shots[i].shotX < e[j].ennemieX + e[j].ennemieWidth) {
                if (shots[i].shotY > e[j].ennemieY - (e[j].ennemieHeight / 2) && shots[i].shotY < e[j].ennemieY + e[j].ennemieHeight) {
                    if (ctx) {
                        e[j].isTouch = true;
                        ctx.clearRect(e[j].ennemieX, e[j].ennemieY, e[j].ennemieWidth, e[j].ennemieHeight);
                        ennemieAxisRandom(e[j]);
                        if (score) {
                            score.innerHTML = String(scoreCounter);
                        }
                        scoreCounter += 10;
                    }
                }
            }
        }
    }
}

//Easy mode
window.addEventListener('load', (event) => {
    normal?.addEventListener('click', () => {
        containerCanvas?.classList.remove('hide');
        containerInfos?.classList.remove('hide');
        if (containerStart) {
            containerStart.style.display = 'none';
        }
        isEasy = true;
        generateStars();
        init();
        timer();
    })
});

//Hard mode
window.addEventListener('load', (event) => {
    hard?.addEventListener('click', () => {
        containerCanvas?.classList.remove('hide');
        containerInfos?.classList.remove('hide');
        if (containerStart) {
            containerStart.style.display = 'none';
        }
        isHard = true;
        generateStars();
        init();
        timer();
    })
});

retry?.addEventListener('click', () => {
    location.reload();
})

generateStars();

if (score) {
    score.innerHTML = String(scoreCounter);
}
if (ammo) {
    ammo.innerHTML = String(ammoCounter);
}