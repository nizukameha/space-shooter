//Game level
const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ship = document.querySelector<HTMLImageElement>("#ship");
//Position of the ship
let shipX: number = 225;
let shipY: number = 640;

let rightPressed: boolean = false;
let leftPressed: boolean = false;
let downPressed:boolean = false;
let upPressed:boolean = false;


//Des event qui écoutent si une des touches est préssé. Si oui cela déclenche une fonction
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
 * Draw the space ship
 */
function drawShip() {
    requestAnimationFrame(drawShip);//draw ship infinite
    if (ctx && ship) {
        ctx.clearRect(shipX, shipY, 50, 50);
        if (rightPressed && shipX <= 450) {
            shipX += 5;
        } else if (leftPressed && shipX > 0) {
            shipX -= 5;
        }
        if (upPressed && shipY > 0) {
            shipY -= 5;
        } else if (downPressed && shipY <= 640) {
            shipY += 5;
        }
        ctx.drawImage(ship, shipX, shipY, 50, 50);
    }
};

drawShip();