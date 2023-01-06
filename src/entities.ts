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

export { SpaceShip, Ennemies };