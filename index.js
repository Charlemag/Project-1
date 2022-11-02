//1. Game Layout
// javascripts/intro.js
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 1280;
canvas.height = 769;
let game;
let interval;

//Creating the Image
let duckImg = new Image()
duckImg.src = 'duckgreen.png';

// Boo

// 2. Constructor
let ducks = []
    class Duck {
    constructor (x,y, xVelocity, yVelocity, img){
        this.width  = 64;
        this.height  = 32;
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.img = img
        this.spriteFrame = 0;
    }

    updatePosition(){
        this.y += this.yVelocity
        this.x += this.xVelocity
    }
//Drawing and scaling the image to the canvas
//
    draw(){
        if(this.xVelocity < 0){
            console.log('negative')
            ctx.drawImage(this.img, this.spriteFrame * 64, 32, 64, 32, this.x, this.y, this.width, this.height)
        } else {
            ctx.drawImage(this.img, this.spriteFrame * 64, 0, 64, 32, this.x, this.y, this.width, this.height)
        }
    }
}



// Ducks Direction
let addDuck = () => {
    let side;
    let xV;
    if(Math.random() > 0.5) {
        side = canvas.width - 50
        xV = -1
} else {
    side = 0
    xV = 1
}
    ducks.push(new Duck(side, canvas.height - 250, xV, -1, duckImg))
    console.log(ducks, "ducksArray")
    //starts duck img: bottom left to top of canvas
}








//Keeps track of amount of times of the loop
let frameCount = 1

//Game Loop - Set interval runs this function 60 times per second 

let animate = () => {

    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    if(frameCount % 180 === 0){
        addDuck()
    }
    
    for(let i =0; i < ducks.length; i++){
        if(frameCount % 10 === 0){
            ducks[i].spriteFrame++
            if(ducks[i].spriteFrame >= 8){
                ducks[i].spriteFrame = 0
            }

        }
        ducks[i].updatePosition()
        ducks[i].draw()
    }
    //game = window.requestAnimationFrame(animate, canvas)
    frameCount++
}



//When you start the game 
let startGame = () => {
    interval = setInterval(animate, 16)
    console.log(ducks)

    console.log('gameStart')
}

// Start Button
let startButton = document.getElementById('start');

startButton.addEventListener("click", startGame)



//Sprite-Animation: Duck, Dog
//  function animate( {

//  })
 
//  draw()

//  requestaniamtionFrame();


//  if(Math.random() > .5) {
//     this.x = canvas.width
// }

