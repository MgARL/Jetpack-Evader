

// Some Global Variables we might need
let counter = 0;
let highScore = 0;
let jumping = 0;
let fuel = 100;
let collisionCount = 0;
let gravityInterval = null;
let collisionInterval = null;
let adjusted = false;

// Dom Objects
let astronaut = document.querySelector('#character');
let astronautSprite = document.querySelector('#character-sprite');
let obstacle1 = document.querySelector('#asteroid');
let obstacle2 = document.querySelector('#asteroid2');
let fuelCell = document.querySelector('#fuel');
let currentScoreP = document.querySelector('#current-score');
let highScoreP = document.querySelector('#high-score');
let fuelP = document.querySelector("#fuel-display");
let gameArea = document.querySelector('.game-container ');
let gameOverModal = document.querySelector('#game-over-modal');
let startGameModal = document.querySelector('#start-game-modal');
const playAgainBtn = document.querySelector('#play-again-btn');
const body = document.querySelector('#body');
const startBtn = document.querySelector('#start-btn');
let soundOnBtn = document.querySelector('#sound-on');
let soundOffBtn = document.querySelector('#sound-off');

// Creating Sound and Music Objects
const musicDir = '/assets/music/'

let playBtnSoundFX = new Audio(`${musicDir}magic.ogg`);
playBtnSoundFX.volume = 0.3;

let jumpSound = new Audio(`${musicDir}arrow_hit.ogg`);
jumpSound.volume = 0.3;

let fuelSound = new Audio(`${musicDir}coin.ogg`);
fuelSound.volume = 0.3;

let crashSound = new Audio(`${musicDir}bomb.ogg`);
crashSound.volume = 0.5;

let bgMusic = new Audio(`${musicDir}8-bit_nightmare.mp3`);
bgMusic.volume = 0.2;
bgMusic.loop = true;

// moving obstacle1 listener
obstacle1.addEventListener('animationiteration', randomPos);

obstacle2.addEventListener('animationiteration', randomPos);

fuelCell.addEventListener('animationiteration', randomPos);
// Other event listeners
playAgainBtn.addEventListener('click', playAgain);
body.addEventListener('keydown', jump);
startBtn.addEventListener('click', startGame);
soundOnBtn.addEventListener('click', () => {
    soundOnBtn.classList.add('d-none');
    soundOffBtn.classList.remove('d-none');
    bgMusic.pause();
});
soundOffBtn.addEventListener('click',() => {
    soundOffBtn.classList.add('d-none');
    soundOnBtn.classList.remove('d-none');
    bgMusic.play();
 });

// function calls

getHighScore();

// Function Section

// Gravity Function

function gravity(){
    let astronautTop = parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'));

    if (jumping === 0){
        astronaut.style.top = `${astronautTop + 2}px`;
    }
}

//Jumping Function

function jump(event){
    event.preventDefault()
    jumping = 1;
    trackingFuel();
    jumpSound.play();
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

    let astronautOb = {
        width: parseInt(window.getComputedStyle(astronaut).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(astronaut).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(astronaut).getPropertyValue('left')),
        y: parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'))
    }


    let obstacle1Ob ={
        width: parseInt(window.getComputedStyle(obstacle1).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(obstacle1).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(obstacle1).getPropertyValue('left')) + 30,
        y:  parseInt(window.getComputedStyle(obstacle1).getPropertyValue('top'))
    }

    
    
    let obstacle2Ob ={
        width: parseInt(window.getComputedStyle(obstacle2).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(obstacle2).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(obstacle2).getPropertyValue('left')) + 120,
        y:  parseInt(window.getComputedStyle(obstacle2).getPropertyValue('top'))
    }
    let fuelOB = {
        width: parseInt(window.getComputedStyle(fuelCell).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(fuelCell).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(fuelCell).getPropertyValue('left')) + 230,
        y:  parseInt(window.getComputedStyle(fuelCell).getPropertyValue('top'))
    }
    
    if(astronautOb.x < obstacle1Ob.x + obstacle1Ob.width && astronautOb.x + astronautOb.width > obstacle1Ob.x && astronautOb.y < obstacle1Ob.y + obstacle1Ob.height && astronautOb.y + astronautOb.height > obstacle1Ob.y){
       endGame()
    }
    if(astronautOb.x < obstacle2Ob.x + obstacle2Ob.width && astronautOb.x + astronautOb.width > obstacle2Ob.x && astronautOb.y < obstacle2Ob.y + obstacle2Ob.height && astronautOb.y + astronautOb.height > obstacle2Ob.y){
        endGame()
    }

    if(astronautOb.x < fuelOB.x + fuelOB.width && astronautOb.x + astronautOb.width > fuelOB.x && astronautOb.y < fuelOB.y + fuelOB.height && astronautOb.y + astronautOb.height > fuelOB.y){
        if(counter < 15){
            fuel += 30;
        }else if (counter  >= 15 && counter < 25 ){
            fuel += 20;
        }else if (counter  >= 25){
            fuel += 15;
        }

        if(fuel > 100){
            fuel = 100;
        }
        fuelP.textContent = `Fuel: ${fuel}%`
        
        fuelCell.style.top = '460px'

        fuelSound.play();
    }

    if(astronautOb.y >= 410 || astronautOb.y <= -5){
        endGame()
    }
}

function startGame() {
    startGameModal.classList.add('d-none');
    gameArea.classList.remove('d-none');
    gravityInterval = setInterval(gravity,10)
    collisionInterval = setInterval(collisionDetection,10);
    highScoreP.textContent = `High Score: ${highScore}`;
    playBtnSoundFX.play();
    setTimeout(()=>{
        bgMusic.play()
    },700)
}

function playAgain() {
    gameOverModal.classList.add('d-none');
    gameArea.classList.remove('d-none');
    startGame();

}

async function endGame(){
    // Crash Sound FX
    crashSound.play();
    bgMusic.pause();
    bgMusic.currentTime = 0;

    soundOffBtn.classList.add('d-none');
    soundOnBtn.classList.remove('d-none');

    //removing game area
    gameArea.classList.add('d-none')
    // adding the game-over Screen
    gameOverModal.classList.remove('d-none')


    // clearing the collision and gravity intervals
    clearInterval(collisionInterval)
    clearInterval(gravityInterval)
    // displaying Current Score and Highest Score on game over screen;

    // resetting Animations Back to default
    // asteroid 1
    let ob1CurrentClass = obstacle1.classList;
    obstacle1.classList.remove(ob1CurrentClass);
    obstacle1.classList.add('asteroidAnimation')

    // asteroid 2
    let ob2CurrentClass = obstacle2.classList;
    obstacle2.classList.remove(ob2CurrentClass);
    obstacle2.classList.add('asteroid2Animation');
    
    // fuel Cell
    let fcCurrentClass = fuelCell.classList;
    fuelCell.classList.remove(fcCurrentClass);
    fuelCell.classList.add('fuelAnimation')

    // updating highScore and saving to local
    updatingHighScore()


    // get the HTML elements to display this

    let yourScore = document.querySelector('#your-score');
    let highSD = document.querySelector('#highest-score-display');

    // Updating dom Element with current status
    yourScore.textContent = `Your Score is: ${counter}`
    highSD.textContent = `High Score is: ${highScore}`
    

    // resetting the counter and fuel
    counter = 0;
    currentScoreP.textContent =`Current Score: ${counter}`

    fuel = 100;
    fuelP.textContent = `Fuel: ${fuel}%`

    

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
function  randomPos(event){
    let random = (Math.random()* 354);
    event.target.style.top = `${random}px`;
    counter++
    currentScoreP.textContent =`Current Score: ${counter}`
    if (counter >= 6 && counter <= 8){
        event.target.classList.remove(`${event.target.id}Animation`);
        event.target.classList.add(`${event.target.id}AnimationLvl2`);
        if(!adjusted){
            counter--
            adjusted = true;
        }
    }
}

function trackingFuel(){
    if(counter < 20){
        fuel -= 2;
    }else{
        fuel -=4;
    }
    fuelP.textContent = `Fuel: ${fuel}%`

    if (fuel <= 0){
        endGame();
    }
}



// bottom: 128px;  resting pos
// right: 360px;

// Jumping Pos
// bottom: 246px;
// right: 360px;
// let currentClass = obstacle1.classList
