

// Some Global Variables we might need
let counter = 0;
let highScore = 0;
let jumping = 0;
let gravityInterval = null;
let collisionInterval = null;

// Dom Objects
let astronaut = document.querySelector('#character');
let astronautSprite = document.querySelector('#character-sprite');
let obstacle = document.querySelector('#asteroid');
let obstacle2 = document.querySelector('#asteroid2');
let currentScoreP = document.querySelector('#current-score');
let highScoreP = document.querySelector('#high-score');
let gameArea = document.querySelector('.game-container ');
let gameOverModal = document.querySelector('#game-over-modal');
const playAgainBtn = document.querySelector('#play-again-btn');
const body = document.querySelector('#body');

// moving obstacle listener
obstacle.addEventListener('animationiteration', () => {
    let random = ((Math.random()* 350) + 35);
    obstacle.style.top = `${random}px`;
    counter++
    currentScoreP.textContent =`Current Score: ${counter}`
});

obstacle2.addEventListener('animationiteration', () => {
    let random = ((Math.random()* 380) + 8);
    obstacle2.style.top = `${random}px`;
    counter++
    currentScoreP.textContent =`Current Score: ${counter}`
});
// Other event listeners
playAgainBtn.addEventListener('click', playAgain)
body.addEventListener('click', jump);
body.addEventListener('keydown', jump);

// function calls

getHighScore();
startGame();

// Function Section

// Gravity Function

function gravity(){
    let astronautTop = parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'));

    if (jumping === 0){
        astronaut.style.top = `${astronautTop + 2}px`;
    }
}

//Jumping Function

function jump(){
    // event.preventDefault()
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(function(){
        let characterTop = parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'));
        if((characterTop > -5) && (jumpCount < 15)){
            astronaut.style.top = (characterTop - 4) + 'px';
            astronautSprite.style.bottom = '246px';
        }
        if(jumpCount > 20){
            clearInterval(jumpInterval)
            jumping = 0;
            jumpCount = 0;
            astronautSprite.style.bottom = '128px'
        }
        jumpCount++
    }, 10)
}

// collision detection Function
function collisionDetection() {
    let astroLeft = parseInt(window.getComputedStyle(astronaut).getPropertyValue('left'));
    let astroTop = parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'));  

    let astronautOb = {
        width: 50,
        height: 50,
        x: astroLeft,
        y: astroTop
    }

    let obstacle1Left = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    let obstacle1Top = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));

    let obstacle1Ob ={
        width: 100,
        height: 100,
        x: obstacle1Left + 50,
        y:  obstacle1Top
    }

    
    let obstacle2Left = parseInt(window.getComputedStyle(obstacle2).getPropertyValue('left'));
    let obstacle2Top = parseInt(window.getComputedStyle(obstacle2).getPropertyValue('top'));
    
    let obstacle2Ob ={
        width: 100,
        height: 100,
        x: obstacle2Left + 140,
        y:  obstacle2Top
    }
    
    if(astronautOb.x < obstacle1Ob.x + obstacle1Ob.width && astronautOb.x + astronautOb.width > obstacle1Ob.x && astronautOb.y < obstacle1Ob.y + obstacle1Ob.height && astronautOb.y + astronautOb.height > obstacle1Ob.y){
        console.log('Collision Detected')
       endGame()
    }
    if(astronautOb.x < obstacle2Ob.x + obstacle2Ob.width && astronautOb.x + astronautOb.width > obstacle2Ob.x && astronautOb.y < obstacle2Ob.y + obstacle2Ob.height && astronautOb.y + astronautOb.height > obstacle2Ob.y){
        console.log('Collision Detected')
        endGame()

    }

    if(astronautOb.y >= 410 || astronautOb.y <= -5){
        console.log('out of bound')
        endGame()
    }
}

function startGame() {
    gravityInterval = setInterval(gravity,10)
    collisionInterval = setInterval(collisionDetection,10)
    highScoreP.textContent = `High Score: ${highScore}`;
}

function playAgain() {
    gameOverModal.classList.add('d-none');
    gameArea.classList.remove('d-none');
    startGame();

}

async function endGame(){
    //removing game area
    gameArea.classList.add('d-none')
    // adding the game-over Screen
    gameOverModal.classList.remove('d-none')

    // clearing the collision and gravity intervals
    clearInterval(collisionInterval)
    clearInterval(gravityInterval)
    // displaying Current Score and Highest Score on game over screen;

    // updating highScore and saving to local
    updatingHighScore()


    // get the HTML elements to display this

    let yourScore = document.querySelector('#your-score');
    let highSD = document.querySelector('#highest-score-display');

    // Updating dom Element with current status
    yourScore.textContent = `Your Score is: ${counter}`
    highSD.textContent = `High Score is: ${highScore}`
    

    // resetting the counter back to 0
    counter = 0;
    currentScoreP.textContent =`Current Score: ${counter}`

    // moving astronaut to initial position

    astronaut.style.top = '200px'

}

// getting Highest Score Functions

function getHighScore(){
    let localStorageScore = localStorage.getItem('HighScore');

    if (localStorageScore !== null){
        localStorageScore = JSON.parse(localStorageScore);
        highScore = localStorageScore
    }
}

function updatingHighScore(){
    if (counter > highScore){
        highScore = counter;

        // saving to local;
        let highScoreStr = JSON.stringify(highScore);
        localStorage.setItem('HighScore', highScoreStr);
    }
}

// Random obstacle place function
// function  randomPos(){
//     let random = ((Math.random()* 300) + 50);
//     obstacle.style.top = `${random}px`;
//     counter++
//     console.log(counter)
// }


// bottom: 128px;  resting pos
// right: 360px;

// Jumping Pos
// bottom: 246px;
// right: 360px;
