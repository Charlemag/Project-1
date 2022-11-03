//1. Game Layout
// javascripts/intro.js
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
// canvas.style.cursor = 'none'
canvas.width = 1280;
canvas.height = 769;
let game;
let interval;
let ducks = []
let score = 0;

//Mouse click event on Duck
const mouse = {
    x: canvas.width / 2,
    y: canvas.height/ 2,
    click: false
}
canvas.addEventListener('click', function(event) {
//mouse.click = true;
// console.log('event x,y', event.x, event.y, event)
let boundingRect = canvas.getBoundingClientRect()
// mouse.x = event.x - canvas.offsetLeft;
// mouse.y = event.y - canvas.offsetTop;
mouse.x = event.x - boundingRect.x;
mouse.y = event.y - boundingRect.y;

//Test:
// console.log('Here i am ', mouse.x, mouse.y);
// console.log("Clicking")


//calculate if duck is within mouse coordinates and delete
//loop thorugh array of ducks and see if mouse x and y is within the duck rectangels
for (let i = 0; i < ducks.length; i++) {
    // console.log(ducks[i].x, ducks[i].width, "DUCK PROPERTIES")
    if (
        mouse.x > ducks[i].x 
        && mouse.x < ducks[i].x + ducks[i].width
        && mouse.y > ducks[i].y
        && mouse.y < ducks[i].y + ducks[i].height
        ) {
            console.log('Duck is dead')
            ducks.splice(i, 1)
            i--
            score++
            // mouse.click = false
        }
    }
});


//Creating the Sprite image
let duckImg = new Image()
duckImg.src = 'duckgreen.png';

// 2. Constructor for duck sprite
//- Size, Img, Speed, & Frame

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
// Drwing each frame of sprite
    draw(){
        if(this.xVelocity < 0){
            // console.log('negative')
            ctx.drawImage(this.img, this.spriteFrame * 64, 32, 64, 32, this.x, this.y, this.width, this.height)
        } else {
            ctx.drawImage(this.img, this.spriteFrame * 64, 0, 64, 32, this.x, this.y, this.width, this.height)
        }
    }
}


// Ducks Movement/Direction
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
    // console.log(ducks, "ducksArray")
    //starts duck img: bottom left to top of canvas
}




let time = 0

//Keeps track of amount of times of the loop
let frameCount = 1

let endGame = () => {
    clearInterval(interval)
}

//Game Lcoop - Set interval runs this function 60 times per second 
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
 
    frameCount++

    if (frameCount % 60 === 0) {
        time++
        // console.log(time, "This is the timer")
    }

    //Timer & Score 
    ctx.fillStyle = "black";
    ctx.font = "25px sans-serif";
    ctx.fillText(`This is the time: ${time}`, 700, 100);

    ctx.fillStyle = "black";
    ctx.font = "25px sans-serif";
    ctx.fillText(`This is the score: ${score}`, 700, 300);

    if (score >= 10) {
        endGame()
        ctx.clearRect(0,0, canvas.width, canvas.height)
    
    }
    if (time >=15) {
        endGame()
    }
}



//Start Game Function (16 frames per second) 
let startGame = () => {
    interval = setInterval(animate, 16)
    // console.log(ducks)

    // console.log('gameStart')
}

// Start Button
let startButton = document.getElementById('start');

startButton.addEventListener("click", startGame)





