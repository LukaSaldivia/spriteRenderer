// https://craftpix.net/

let c = document.querySelector('#c');
let ctx = c.getContext('2d');
let timeInterval = 80


let sizes = {
    w: 600,
    h: 450
}

c.width = sizes.w;
c.height = sizes.h;

class SpriteRenderer{
    // constructor(xpos, ypos, image, cropWidth,cropHeight, q){
        constructor(attr={
            pos : {
                x : 0,
                y : 0
            },
            path : '',
            crop : {
                width : 0,
                height : 0
            },
            totalFrames : 0,
            scale : {
                x : 1,
                y : 1,
            },
            flip : false,
            interval : 0
        }){
        
            this.pos = attr.pos || { x:0 , y:0 }
            this.pos.x = this.pos.x || 0
            this.pos.y = this.pos.y || 0

            this.path = attr.path || undefined

            this.crop = attr.crop || { width:0 , height:0 }
            this.crop.width = this.crop.width || 0
            this.crop.height = this.crop.height || 0

            this.totalFrames = attr.totalFrames || 0

            this.scale = attr.scale || { x:1 , y:1 }
            this.scale.x = this.scale.x || 1
            this.scale.y = this.scale.y || 1

            this.flip = attr.flip || false
            this.interval = attr.interval || 0

            this.i = 0
            this.imageSection = 0

            this.image = new Image
            this.image.src = this.path

            this.timer = new Krono({
                output : 1000,
                isBackwards : true,
                initial : this.interval,
                end : true
            })




            this.spriteCanvas = document.createElement('canvas')
            this.spriteCtx = this.spriteCanvas.getContext('2d',{willReadFrequently: true}) 




    }

    update(ctx){
        this.timer.start()
        if(this.timer.getTime() == 0){
            this.timer.toInitial()
            this.goToNext()
        }


        
        this.draw(ctx)
    }

    goToNext(){

        this.i = this.i + 1 > this.totalFrames - 1 ? 0 : this.i + 1
    
        this.imageSection = Math.abs(this.i-(this.flip ? this.totalFrames - 1 : 0))


    }

    draw(ctx){

            this.spriteCanvas.width = this.image.width
            this.spriteCanvas.height = this.image.height

            if (this.flip) {
                this.spriteCtx.translate(this.spriteCanvas.width, 0)
                this.spriteCtx.scale(-1,1)
            }

            this.spriteCtx.clearRect(0,0,this.spriteCanvas.width,this.spriteCanvas.height)
           
            this.spriteCtx.drawImage(this.image,0,0);

            ctx.drawImage(this.spriteCanvas, this.crop.width*this.imageSection,0,this.crop.width,this.crop.height,this.pos.x,this.pos.y,this.crop.width*this.scale.x,this.crop.height*this.scale.y)

        

    }

    play(path = ''){
        this.imageSection = 0
        this.i = 0
        this.image.src = path
    }

}




let sprite = new SpriteRenderer({
    pos : {
        x : 45,
        y : sizes.h - 64
    },
    path : 'hurt.png',
    crop : {
        width : 32,
        height : 32
    },
    totalFrames : 4,
    interval : 100,
    scale : {
        x : 2,
        y : 2
    }
})

let sprite2 = new SpriteRenderer({
    pos : {
        x : 0,
        y : sizes.h - 64
    },
    path : 'attack.png',
    crop : {
        width : 32,
        height : 32
    },
    totalFrames : 6,
    interval : 100,
    scale : {
        x : 2,
        y : 2
    }
})
let sprite3 = new SpriteRenderer({
    pos : {
        x : 80,
        y : sizes.h - 64
    },
    path : 'attack2.png',
    crop : {
        width : 32,
        height : 32
    },
    totalFrames : 4,
    interval : 100,
    scale : {
        x : 2,
        y : 2
    },
    flip : true
})

// let robot = new SpriteRenderer({
//     pos : {
//         x : 0,
//         y : sizes.h - 61*5
//     },
//     path : 'attack3.png',
//     crop : {
//         width : 96,
//         height : 61
//     },
//     totalFrames : 6,
//     interval : 100,
//     flip : true,
//     scale : {
//         x : 5,
//         y : 5
//     }
// })










ctx.imageSmoothingEnabled = false; //Tiene que ir despues del size del canvas








function loop() {
    requestAnimationFrame(loop)
    ctx.fillStyle = "#222";
    ctx.fillRect(0,0,c.width,c.height)

    sprite3.update(ctx)
    sprite2.update(ctx)
    sprite.update(ctx)
    // robot.update(ctx)
}

loop()


