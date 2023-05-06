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


function getCharacter1(){
    c.drawImage(
      playerImage,
  //Crop position: only one charac
    3*playerImage.width/4, //croping ref inicio width
    0, //croping ref inicio height
    playerImage.width/4, //crop width - largura de 1 boneco
    playerImage.height, //crop heith - altura de 1 boneco
  //Location (canvas)
    canvas.width / 2  - playerImage.width/4/2, //x coord
    canvas.height / 2 - playerImage.height/2, //y coord
  //what will actually render
    playerImage.width/4, //crop width - largura de 1 boneco
    playerImage.height
  )
}

image.onload = () => {
    c.drawImage(image, -1185, -800),
    getCharacter1()
  console.log(c)
}