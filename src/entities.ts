interface Ennemies {
    image: HTMLImageElement | null,
    ennemieX: number,
    ennemieY: number,
    ennemieWidth: number,
    ennemieHeight: number,
    isTouch: boolean
}

interface SpaceShip {
    image: HTMLImageElement | null,
    shipX: number,
    shipY: number,
    shipWidth: number,
    shipHeight: number
}

interface Bonus {
    image: HTMLImageElement | null,
    bonusX: number,
    bonusY: number,
    bonusWidth: number,
    bonusHeight: number,
    isTouch: boolean
}

export { SpaceShip, Ennemies, Bonus };