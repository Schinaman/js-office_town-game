

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.moving = false

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
            this.frames.val * this.width, //croping ref inicio width
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

        if (!this.moving) return //break
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 15 === 0) {

            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
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
        c.fillStyle = 'rgb(255, 0, 0, 0.05)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}