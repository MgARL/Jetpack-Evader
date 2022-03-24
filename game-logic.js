

// Some Global Variables we might need
let counter = 0;
let highScore = 0;
let jumping = 0;
let fuel = 100;
let gravityInterval = null;
let collisionInterval = null;
let adjusted = false;
let indexSubmit = null;
let leaderScore = null;
let gotFromDB = false;

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
let getNameModal = document.querySelector('#get-name-modal');
const playAgainBtn = document.querySelector('#play-again-btn');
const body = document.querySelector('#body');
const startBtn = document.querySelector('#start-btn');
let soundOnBtn = document.querySelector('#sound-on');
let soundOffBtn = document.querySelector('#sound-off');
let nameInput = document.querySelector('#name-input');
let submitNameBtn = document.querySelector('#submit-name-btn');

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

// Play Again button Listener
playAgainBtn.addEventListener('click', playAgain);

// Start Game Button Listener
startBtn.addEventListener('click', startGame);

// Event listeners to Mute/Unmute Music
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

// Functions Section

// Gravity Function

function gravity(){
    // getting Astronaut Top Value, and updating it.
    let astronautTop = parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'));

    if (jumping === 0){
        astronaut.style.top = `${astronautTop + 2}px`;
    }
}

//Jumping Function

function jump(event){
    event.preventDefault() // to prevent default actions of certain keys

    jumping = 1; //Change to one in order to stop gravity to affect Astronaut

    trackingFuel();

    jumpSound.play();//To Play Jumping sound, Sound has a delay so it doesn't really gets play every time Astronaut Jumps

    
    let jumpCount = 0;  //To keep track of jumping interval, how many intervals of jumps have happened

    // making a jump interval to simulate jumping animation and track of vertical Astronaut position every 10 Milliseconds
    let jumpInterval = setInterval(function(){
        let characterTop = parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'));
        if((characterTop > -5) && (jumpCount < 15)){
            // this will only execute if character is inside the game-area, and its less than 15 intervals of jump.
            astronaut.style.top = (characterTop - 4) + 'px';//Updating astronaut position

            astronautSprite.style.bottom = '246px';// Moving astronaut Sprite to where the jetpack is lit.
        }

        if(jumpCount > 20){
            // this will execute after 20 jumping interval, reason is the make the astronaut go up for 15 intervals, stand still for 5, and then finally going back to gravity.
            // to Simulate a jumping animation.
            clearInterval(jumpInterval) //clearing jump interval/canceling jump
            jumping = 0;    //back to 0 so gravity starts again
            jumpCount = 0;  // resetting the jump intervals
            astronautSprite.style.bottom = '128px' //Astronaut sprite back to original Position.
        }

        //Adding to Jump COunt in order to progress function, if not in place Astronaut will ascend forever.
        jumpCount++
    }, 10)
}

// collision detection Function
function collisionDetection() {

    //Creating an Object with width, height, left and top position of Astronaut, to keep track of Astronaut position in game-area.
    let astronautOb = {
        width: parseInt(window.getComputedStyle(astronaut).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(astronaut).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(astronaut).getPropertyValue('left')),
        y: parseInt(window.getComputedStyle(astronaut).getPropertyValue('top'))
    }

    //creating another object but with Asteroid 1 info, to keep its position as well.
    let obstacle1Ob ={
        width: parseInt(window.getComputedStyle(obstacle1).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(obstacle1).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(obstacle1).getPropertyValue('left')) + 30,
        y:  parseInt(window.getComputedStyle(obstacle1).getPropertyValue('top'))
    }

    
    //creating another object but with Asteroid 2 info, to keep its position as well.
    let obstacle2Ob ={
        width: parseInt(window.getComputedStyle(obstacle2).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(obstacle2).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(obstacle2).getPropertyValue('left')) + 120,
        y:  parseInt(window.getComputedStyle(obstacle2).getPropertyValue('top'))
    }

    //creating another object but with fuel info, to keep its position as well.
    let fuelOB = {
        width: parseInt(window.getComputedStyle(fuelCell).getPropertyValue('width')),
        height: parseInt(window.getComputedStyle(fuelCell).getPropertyValue('height')),
        x: parseInt(window.getComputedStyle(fuelCell).getPropertyValue('left')) + 230,
        y:  parseInt(window.getComputedStyle(fuelCell).getPropertyValue('top'))
    }
    
    // first collision detection between Astronaut and Asteroid 1, if triggered game over.
    if(astronautOb.x < obstacle1Ob.x + obstacle1Ob.width && astronautOb.x + astronautOb.width > obstacle1Ob.x && astronautOb.y < obstacle1Ob.y + obstacle1Ob.height && astronautOb.y + astronautOb.height > obstacle1Ob.y){
       endGame()
    }

    // Second collision detection between Astronaut and Asteroid 2
    if(astronautOb.x < obstacle2Ob.x + obstacle2Ob.width && astronautOb.x + astronautOb.width > obstacle2Ob.x && astronautOb.y < obstacle2Ob.y + obstacle2Ob.height && astronautOb.y + astronautOb.height > obstacle2Ob.y){
        endGame()
    }
    // Second collision detection between Astronaut and fuel, if triggered fuel will increase depending on score level.
    if(astronautOb.x < fuelOB.x + fuelOB.width && astronautOb.x + astronautOb.width > fuelOB.x && astronautOb.y < fuelOB.y + fuelOB.height && astronautOb.y + astronautOb.height > fuelOB.y){
        if(counter < 15){
            //if score level is less than 15 fuel will give 30 fuel points
            fuel += 30;
        }else if (counter  >= 15 && counter < 25 ){
            //if score equals or more than 20 and  less than 25 fuel will give only 20 fuel points
            fuel += 20;
        }else if (counter  >= 25){
            //if score level is equals or greater than 255 fuel will give 15 fuel points
            fuel += 15;
        }

        // make sure that player does not get more than 100% fuel
        if(fuel > 100){
            fuel = 100;
        }
        // displaying new fuel levels to player
        fuelP.textContent = `Fuel: ${fuel}%`
        
        //removing the fuel cell from Astronaut path so it doesn't trigger the collision more than once, also moving the fuel cell out of players vision.
        fuelCell.style.top = '460px'

        // adding sound for whenever player grabs a fuel cell
        fuelSound.play();
    }

    // out of bound detection for Astronaut game over if hits the top or bottom of game-area.
    if(astronautOb.y >= 410 || astronautOb.y <= -5){
        endGame()
    }
}

//function to start the game
function startGame() {
    // Jumping Event Listener
    body.addEventListener('keydown', jump);
    getDB()

    startGameModal.classList.add('d-none'); //removing instructions from view
    gameArea.classList.remove('d-none'); //Displaying game-area.
    gravityInterval = setInterval(gravity,10) //starting gravity function with interval so it can affect the astronaut

    //starting the collision detection function, with interval to keep track of every object in movement and detect if they crash into each other
    collisionInterval = setInterval(collisionDetection,10); 

    //getting high score and displaying it
    getHighScore();
    highScoreP.textContent = `High Score: ${highScore}`; //Displaying New local if any High score
    
    playBtnSoundFX.play(); //SoundFX for when start button is pressed

    // Playing background music, after the play btn soundFX is done playing.
    setTimeout(()=>{
        bgMusic.play()
    },700)
}

function playAgain() {
    gameOverModal.classList.add('d-none'); //hiding game over screen
    gameArea.classList.remove('d-none'); //Showing game-area.
    startGame(); 

}

function endGame(){
    // Crash Sound FX
    crashSound.play();
    bgMusic.pause();//stopping bg music
    bgMusic.currentTime = 0; //setting bg music back to beginning

    // Mute Button resetting back to unmute, since music starts playing with start function.
    soundOffBtn.classList.add('d-none');
    soundOnBtn.classList.remove('d-none');

    //removing event listener to jump
    body.removeEventListener('keydown', jump);

    //removing game area
    gameArea.classList.add('d-none')
    // adding the game-over Screen
    gameOverModal.classList.remove('d-none')


    // clearing the collision and gravity intervals
    clearInterval(collisionInterval)
    clearInterval(gravityInterval)

    // resetting Animations Back to initial
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
    // displaying Current Score and Highest Score on game over screen;
    updatingLeaderBoard()


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
    // getting High score from local Storage
    let localStorageScore = localStorage.getItem('HighScore');

    // if theres is local storage with High score assign it to highScore
    // if not let highScore still be 0
    if (localStorageScore !== null){
        localStorageScore = JSON.parse(localStorageScore);
        highScore = localStorageScore
    }
}

function updatingHighScore(){
    // this to be executed only if current score is higher than High Score.
    if (counter > highScore){
        highScore = counter;

        // saving to local;
        let highScoreStr = JSON.stringify(highScore);
        localStorage.setItem('HighScore', highScoreStr);
    }
}

// Random obstacle place function
function  randomPos(event){
    let random = (Math.random()* 354); //getting a random number between 0 and 350 (height of game area)
    event.target.style.top = `${random}px`; //Changing current element vertical position before new Animation Iteration starts
    
    //Updating score counter  and displaying it after animation iteration finishes
    if (event.target.id === 'asteroid' || event.target.id === 'asteroid2'){
        counter++;
        currentScoreP.textContent =`Current Score: ${counter}`;
    }

    // Changing Animation Class in order to change animation speed of the objects after level six/
    if (counter >= 6 && counter <= 8){
        //added counter <= 8 to to stop removing and adding the animation classes to elements. Only 3 elements.
        event.target.classList.remove(`${event.target.id}Animation`); //removing initial animation
        event.target.classList.add(`${event.target.id}AnimationLvl2`); //adding new faster animation
    }
}

function trackingFuel(){
    // when score is less than 20 every jump will reduce fuel by 2
    if(counter < 20){
        fuel -= 2;
    }else{ // for everything else every jump will reduce fuel by 4
        fuel -=4;
    }
    // Displaying Updated fuel tank to Player
    fuelP.textContent = `Fuel: ${fuel}%`

    // if fuel gets to 0 it's Game Over!
    if (fuel <= 0){
        endGame();
    }
}

// function to compare current score against leader board
// importing leaderBoard from  leaderBoard.js or DB
import { leaderBoard1 } from '/leaderBoard.js'
let leaderBoard = leaderBoard1

async function getDB(){
    try{
        const response = await fetch('https://jetpack-evader-back-end.herokuapp.com/scores')
        if(response !== null){
            
            let parsedRes = await response.json();
    
            leaderBoard = Object.values(parsedRes)

            gotFromDB = true;
        }
    }
    catch (err){
        console.error(err)
    }
}

function updatingLeaderBoard(){

    // function to compare current score against leader board
    // comparing current score against each player in LB
    // will compare from first places onwards, once its greater than one of the place will need to stop the loop to prevent it from saving into other placements.
    for(let i = 0; i < leaderBoard.length; i++){//Using for loop instead of array methods because I need to stop loop.
        if(counter > leaderBoard[i].score){
            getPlayerName(i, counter);
            return
        }
    }
}

function getPlayerName(i, counter){
//  submit-name-btn need the index and counter
//hide the game over screen and show the get name screen.
gameOverModal.classList.add('d-none');
getNameModal.classList.remove('d-none');

indexSubmit = i;

leaderScore = counter;

//event listener for when the name is submitted
submitNameBtn.addEventListener('click', handleSubmitClick)
}
 async function handleSubmitClick() {
     //create an Object to match the LB Array Objects
    let newPlayer = {
        name: nameInput.value,
        score: leaderScore
    }

    // inserting the new ob into the Array
    leaderBoard.splice(indexSubmit, 0, newPlayer);
    console.log('added current player:', leaderBoard);

    //removing last item form Array;
    leaderBoard.splice(-1,1);
    console.log('Removed last item', leaderBoard);

    //saving leader board to db
    let newLDBString = JSON.stringify(leaderBoard);
    if(gotFromDB){
        try{
            const response = await fetch('https://jetpack-evader-back-end.herokuapp.com/scores', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: newLDBString
            })
            console.log(JSON.parse(response.body));
        } 
        catch (err){
            console.error(err + "SORRY")
            localStorage.setItem('leaderBoard', newLDBString);
        }
    }else {
        localStorage.setItem('leaderBoard', newLDBString);
    }


    // removing the getNameModal and Displaying game over screen;

    getNameModal.classList.add('d-none');
    gameOverModal.classList.remove('d-none');

    submitNameBtn.removeEventListener('click', handleSubmitClick);
 }


// bottom: 128px;  resting pos
// right: 360px;

// Jumping Pos
// bottom: 246px;
// right: 360px;
// let currentClass = obstacle1.classList
