const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log(collisions)
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
          x: Boundary.width,
          y: Boundary.height
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


//CLASS
class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position
    this.image = image
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

function getCharacter1() {
  c.drawImage(
    playerImage,
    //Crop position: only one charac
    3 * playerImage.width / 4, //croping ref inicio width
    0, //croping ref inicio height
    playerImage.width / 4, //crop width - largura de 1 boneco
    playerImage.height, //crop heith - altura de 1 boneco
    //Location (canvas)
    canvas.width / 2 - playerImage.width / 4 / 2, //x coord
    canvas.height / 2 - playerImage.height / 2, //y coord
    //what will actually render
    playerImage.width / 4, //crop width - largura de 1 boneco
    playerImage.height
  )
}

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
function animate() {
  window.requestAnimationFrame(animate) // chamada recusiva - loop infinito


  background.draw()
  boundaries.forEach(boundary => {
    boundary.draw()
  })
  testBoundary.draw()
  getCharacter1()

  //collision detection
  if (playerImage.position.x + player.width)

  //Moving
  if (keys.w.pressed && lastKey === 'w') {
    movables.forEach((movable) => {
      movable.position.y += 3
    })
  }  else if (keys.a.pressed && lastKey === 'a') {
    movables.forEach((movable) => {
      movable.position.y += 3
    })
  }  else if (keys.s.pressed && lastKey === 's') {
    movables.forEach((movable) => {
      movable.position.y -= 3
    })
  }  else if (keys.d.pressed && lastKey === 'd') {
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