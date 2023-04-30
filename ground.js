import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"
//give motion to the ground
const SPEED = 0.05

const groundElems = document.querySelectorAll("[data-ground]")

//looping the ground
export function setupGround() {
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
}
//speed setting (increase of speed while palying for long time to make the game harder)
export function updateGround(delta, speedScale) {
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

        if (getCustomProperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600)
        }
    })
}