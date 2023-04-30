import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

//coset virabiles
const SPEED  = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactusTime

export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(caches => {
        cactus.remove()
    })
}

//speed of the random cactus
export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100) {
            cactus.remove()
        }
    })
   
    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

//cactus reaction to the "Dino"
export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
       return cactus.getBoundingClientRect() 
    })
}

//cactus create randomly
function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "images/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    worldElem.append(cactus)
}

//random cactus numbers settings appernce
function randomNumberBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
