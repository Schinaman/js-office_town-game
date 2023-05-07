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

class Boundary {
  static width = 16 * 4
  static height = 16 * 4
  constructor({ position }) {
    this.position = position
    this.width = 4 * 16 //pixels
    this.height = 4 * 16 //pixels
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
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
          x: Boundary.width + offset.x,
          y: Boundary.height + offset.y
        }
      })
      ) //cria um objeto Boundary para cada Boundary
    }
  })
})



//Images
const image = new Image()
image.src = './img/OfficeTown.png'

const playerImage = new Image()
playerImage.src = './img/Adam_idle_16x16.png'


//CLASS
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position
    this.image = image
    this.frames = frames

    this.image.onload = () => { //imagem precisa primeiro carregar p pegar as dimensoes 'w' e 'h'
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
      console.log(this.width)
      console.log(this.height)
    }

  }
  draw() {
    c.drawImage(
      //Crop position: only one charac
      this.image,
      0, //croping ref inicio width
      0, //croping ref inicio height
      this.image.width / this.frames.max, //crop width - largura de 1 boneco
      this.image.height,                  //crop heith - altura de 1 boneco
      //Location (canvas)
      this.position.x, //x coord //pra player tela/2(centro sprite)
      this.position.y, //y coord
      //what will actually render
      this.image.width / this.frames.max,
      this.image.height
    )
  }
}

const playerWidthPixels = 128 //256
const playerHeightPixels = 128
const player = new Sprite({
  position: {
    x: canvas.width / 2 - playerWidthPixels / 4 / 2,
    y: canvas.height / 2 - playerHeightPixels / 2
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})


const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
}

const testBoundary = new Boundary({
  position: {
    x: 400,
    y: 400
  }
})


const movables = [background, testBoundary]
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
  boundaries.forEach(boundary => { boundary.draw() })
  testBoundary.draw()
  player.draw()


  //collision detection
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: testBoundary
    })) {
    console.log('colliding')
  }

  //Moving
  if (keys.w.pressed && lastKey === 'w') {
    movables.forEach((movable) => {
      movable.position.y += 3
    })
  } else if (keys.a.pressed && lastKey === 'a') {
    movables.forEach((movable) => {
      movable.position.x += 3
    })
  } else if (keys.s.pressed && lastKey === 's') {
    movables.forEach((movable) => {
      movable.position.y -= 3
    })
  } else if (keys.d.pressed && lastKey === 'd') {
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