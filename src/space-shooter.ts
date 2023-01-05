//Game level
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ship = document.querySelector<HTMLImageElement>("#ship");
const blackHole = document.querySelector<HTMLImageElement>("#black-hole");
const redPlanet = document.querySelector<HTMLImageElement>("#red-planet");
const galaxy = document.querySelector<HTMLImageElement>("#galaxy");

let health = document.querySelector<HTMLSpanElement>('#health');
let healthCounter: number = 100;
let random = getRandomInt(100, 100);
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

const bHole = {
    image: blackHole,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random
}

const gala = {
    image: galaxy,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random
}

const rPlanet = {
    image: redPlanet,
    ennemieX: 0,
    ennemieY: 0,
    ennemieWidth: random,
    ennemieHeight: random
}


let ennemies = [bHole, gala, rPlanet];

for (let i = 0; i < ennemies.length; i++) {
    ennemieAxisRandom(ennemies[i]);
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
    drawEnnemies(ennemies);
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
function drawEnnemies(e:any) {
    moveEnnemies(e);
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
                en[i].ennemieY += 1;
            } else {// ON A UN ENORME PROBLEME ICI
                ennemieAxisRandom(en[i]);
                random = Math.trunc(getRandomInt(50, 150));
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
        //console.log(Math.trunc(intervalMin + intervalMax), Math.trunc(intervalMax / 2));
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
    let intervalMin = -64;
    let intervalMax = (Math.trunc((canvas.height) / ennemies.length));
    console.log(intervalMax);
    for (let i = 0; i < ennemies.length; i++) {
        randomY[i] = Math.trunc(getRandomInt(intervalMin + intervalMax, intervalMax / 2));
        console.log('Y : ' + Math.trunc(intervalMin + intervalMax), Math.trunc(intervalMax / 2));
        intervalMax += intervalMax;
    }
    randomY.sort(() => 0.5 - Math.random());
    return (randomY)
}


/**
 * Define random value for the Y axis of the ennemie
 */
function ennemieAxisRandom(enn:any) {
    let randomX = generateRandomX();
    let randomY = generateRandomY();

    //console.log(randomX);
    console.log(randomY);
    
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
Les points de vie ne s'affichent pas toujours en rouge quand ils diminuent :
envoyer dans la fonction collision en argument le space ship / dans cette fonction boucler sur la liste des ennemies (tableau d'objets) et dire que si le spaceship est en collision avec un ennemie alors on arrete la boucle et on passe la vie en rouge

REVOIR LA GENERATION ALEATOIRE D'ENNEMIES

Il arrive ausi que le space ship prennent des dégats sans etre en collision avec un ennemi
*/