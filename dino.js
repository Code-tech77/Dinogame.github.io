import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  //Dino coset virabiles
  const dinoElem = document.querySelector("[data-dino]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0015
  const DINO_FRAME_COUNT = 2
  const FRAME_TIME = 100

  //Virabiles
  let isJumping
  let dinoFrame
  let currentFrameTime
  let yVelocity

  //Setup the dino animations
  export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  //Dino settings
  export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
  }
  
  export function setDinoLose() {
    dinoElem.src = "images/dino-lose.png"
  }

  //Dino runing animation
  function handleRun(delta, speedScale) {
    if (isJumping) {
      dinoElem.src = `images/dino-stationary.png`
      return
    }
  
    //looping between the animations
    if (currentFrameTime >= FRAME_TIME) {
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
      dinoElem.src = `images/dino-run-${dinoFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }

  //Dino jumping Animation
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
      setCustomProperty(dinoElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }