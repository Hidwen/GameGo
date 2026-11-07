//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}
//pipes
let pipeArray = [];
let pipeWidth = 64; //w:h =384/3072..1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//gamephysics
let velocityX = -2; //speed of pipes moving left
let velocityY = 0; //jump speed of bird
let gravity = 0.4; //speed of bird falling down
let gameOver = false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on the board

    //draw flappy bird structure
    //context.fillStyle = "Green";
    //context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";



    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds
    document.addEventListener("keydown", moveBird);
}   

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }   
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //bird
    velocityY += gravity;
    //bird.y +=vellocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //bird should not go above the board
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);


    if (bird.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX; //move pipe to left
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5
            pipe.passed = true;
        }
        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score, 10, 50);
}

function placePipes() {
    if (gameOver) {
        return;
    }
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let openingSpace = boardHeight / 4; //space between top and bottom pipe
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);
        }
  
function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        velocityY = -6; //jump
    }
} 
function detectCollision(a,b) {
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}