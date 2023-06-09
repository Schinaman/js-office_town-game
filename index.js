const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

//Cria subarrays de rows para cada collision
const mapWidthTile = 70
const mapHeightTile = 40
const collisionsMap = []
for (let i = 0; i < collisions.length; i += mapWidthTile) {
  collisionsMap.push(collisions.slice(i, mapWidthTile + i))
}

const boundaries = []
const offset = {
  x: -1185,
  y: -800
}
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2888) {
      boundaries.push(new Boundary({
        position: {
          x: j * Boundary.width + offset.x,
          y: i * Boundary.height + offset.y
        }
      })
      ) //cria um objeto Boundary para cada Boundary
    }
  })
})
console.log(boundaries)


//Images
const image = new Image()
image.src = './img/OfficeTown.png'
const playerImage = new Image()
playerImage.src = './img/Adam_idle_16x16.png'
const foregroundImage = new Image()
foregroundImage.src = './img/Foreground.png'


const playerWidthPixels = 256 //256
const playerHeightPixels = 128
const player = new Sprite({
  position: {
    x: canvas.width / 2 - playerWidthPixels / 4 / 2,
    y: canvas.height / 2 - playerHeightPixels / 2
  },
  image: playerImage,
  frames: {
    max: 3
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})


const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
}


const movables = [background, ...boundaries, foreground]
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + 64 <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}



function animate() {
  window.requestAnimationFrame(animate) // chamada recusiva - loop infinito

  background.draw()
  boundaries.forEach((boundary) => { boundary.draw() })
  player.draw()
  foreground.draw()


  //Moving
  let moving = true
  player.moving = false
  if (keys.w.pressed && lastKey === 'w') {
    //collision detection
    player.moving = true
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,  //creates a clone without overwriting original
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3 //predicts if its gonna collide
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    //move movables
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      }) //MOVING LEFT
  } else if (keys.a.pressed && lastKey === 'a') {
    player.moving = true
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,  //creates a clone without overwriting original
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y //predicts if its gonna collide
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      }) //MOVING DOWN
  } else if (keys.s.pressed && lastKey === 's') {
    player.moving = true
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,  //creates a clone without overwriting original
            position: {
              x: boundary.position.x,
              y: boundary.position.y -3 //predicts if its gonna collide
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
    movables.forEach((movable) => {
      movable.position.y -= 3
    })//MOVING RIGHT
  } else if (keys.d.pressed && lastKey === 'd') {
    player.moving = true
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,  //creates a clone without overwriting original
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y //predicts if its gonna collide
            }
          }
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
    movables.forEach((movable) => {
      movable.position.x -= 3
    })
  }
}
animate()


let lastKey = ''
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})