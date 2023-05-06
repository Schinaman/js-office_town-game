const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)


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
    x: -1185,
    y: -800
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

function animate() {
  window.requestAnimationFrame(animate) // chamada recusiva - loop infinito
  background.draw()
  getCharacter1()

  if (keys.w.pressed && lastKey === 'w') background.position.y += 3
  else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
  else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
  else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
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