//Game level
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ship = document.querySelector<HTMLImageElement>("#ship");
const blackHole = document.querySelector<HTMLImageElement>("#black-hole");

//Position of the space ship
let shipX: number = 225;
let shipY: number = 640;

//Dimension of the space ship
const shipWidth: number = 50;
const shipHeight: number = 50;

//Dimension of ennemies

//Position of ennemies
let ennemieX: number = getRandomInt(450);
let ennemieY: number = getRandomInt(500);

//Key pressed
let rightPressed: boolean = false;
let leftPressed: boolean = false;
let downPressed:boolean = false;
let upPressed:boolean = false;

//If key pressed a function is called
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
 * Generate random int
 * @param max interval (from 0 to max)
 * @returns random int
 */
function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);  
}

/**
 * Draw the space ship
 */
function drawShip() {
    requestAnimationFrame(drawShip);//draw ship infinite
    
    drawEnnemies();
    
    if (ctx && ship) {
        ctx.clearRect(shipX, shipY, shipWidth, shipHeight);
        if (rightPressed && shipX <= (canvas.width - 50)) {
            shipX += 5;
        } else if (leftPressed && shipX > 0) {
            shipX -= 5;
        }
        if (upPressed && shipY > 0) {
            shipY -= 5;
        } else if (downPressed && shipY <= (canvas.height - 60)) {
            shipY += 5;
        }
        ctx.drawImage(ship, shipX, shipY, shipWidth, shipHeight);
    }
};

/**
 * Draw ennemies
 */
function drawEnnemies() {
    moveEnnemies();
    if (ctx && blackHole) {
        
        ctx.drawImage(blackHole, ennemieX, ennemieY, 50, 50);
    }
};

/**
 * Move ennemies on Y axis
 */
function moveEnnemies() {
    if (ctx) {
        ctx.clearRect(ennemieX, ennemieY, 50, 50);
    }
    if (ennemieY <= 700) {
        ennemieY += 3;
    } else {
        ennemieX = getRandomInt(450);
        ennemieY= getRandomInt(500);
    }
}

drawShip();