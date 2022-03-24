// Home Page Functionality Part


// Functionality for Modals

// getting elements

// buttons

let creditsBtn = document.querySelector("#creditsBtn");

let leadersBtn = document.querySelector('#leader-btn');

let closeCrBtn = document.querySelector('#close-modal-cr');

let closeLdBtn = document.querySelector('#close-modal-ld');

let playGameBtn = document.querySelector('#play-game-btn');

let soundOnBtn = document.querySelector('#sound-on');

let soundOffBtn = document.querySelector('#sound-off');

// other Elements

const body = document.querySelector('body');


//getting Modals

let creditsModal= document.querySelector('#modal-credits');

let leaderBoardModal = document.querySelector('#modal-leader-board');

// creating Sound FX

let playSoundFX = new Audio('/assets/music/magic.ogg');
playSoundFX.volume = 0.5;

let creditsClickSFX = new Audio('/assets/music/bling.ogg');
creditsClickSFX.volume = 0.2;

// background Music

let bgMusic = new Audio('/assets/music/Lunar-Lander-Jupiter.mp3');
bgMusic.volume = 0.3;
bgMusic.loop = true;

// Start BG Music when Hovering

body.addEventListener('mouseover', startMusic);
getDB()


//adding event listener to show and hide with Credits
creditsBtn.addEventListener('click', () => {
    creditsModal.classList.remove('d-none');
    creditsClickSFX.play()
 });
 
 closeCrBtn.addEventListener('click', () => {
     creditsModal.classList.add('d-none'); 
     creditsClickSFX.play()
 });

 //adding event listener to show and hide with LeaderBoard

 leadersBtn.addEventListener('click', () => {
    leaderBoardModal.classList.remove('d-none');
    creditsClickSFX.play()
 });
 
 closeLdBtn.addEventListener('click', () => {
     leaderBoardModal.classList.add('d-none'); 
     creditsClickSFX.play()
 });

 //event listener to take you to game page, with delay so soundFX can be heard
 playGameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playSoundFX.play();
    setTimeout(() => {
        window.location.href = "/game.html"
    },700)
 })

//  Listener to mute/Unmute music 
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

//  bg Music to start after user scrolls ver the page with a delay of 2 secs
 function startMusic() {
    setTimeout(() => {
        bgMusic.play();
    },2000);
    body.removeEventListener('mouseover', startMusic);
};

// Adding the Leader Board


import { leaderBoard1 } from '/leaderBoard.js'
let leaderBoard = leaderBoard1



//getting DB from DB

async function getDB(){
    try{
        const response = await fetch('https://jetpack-evader-back-end.herokuapp.com/scores')
        if(response !== null){
            
            let parsedRes = await response.json();
    
            leaderBoard = Object.values(parsedRes)
    
            displayData()
            return
        }
    }
    catch (err){
        console.error(err)
        displayData()
    }
}

//adding the leader board to the leader-board Modal

async function displayData(){


    let tbody = document.querySelector('#tbody'); //getting the table body to append the scores.
    
    // need to create a tr and  three td for each player in the array.
    // tr = table row, td = table data, tbody = table body.
    
    let placesArr = ['st', 'nd','rd', 'th', 'th'];//this array to add suffix of placement.
    
    leaderBoard.forEach((player, index) => {
        // creating the tr
        let tr =  document.createElement('tr');
        tbody.appendChild(tr); //appending the tr to the tbody

        // creating the first td to add to the tbody
        let td = document.createElement('td');
        td.textContent = `${index + 1}${placesArr[index]}`; //That will show the placement of player, using index. need to add 1 to show correct.
        td.classList.add('text-danger'); //giving different color to placements
        tr.appendChild(td);
        // to get name and score, will need to transform the ob into an Array.
         let playerArr = Object.values(player);

        // Iterate over the player Array  to create another td, with Name and Score, and append it to the tr
        playerArr.forEach(value => {
            let td2 = document.createElement('td');
            td2.textContent = value;
            tr.appendChild(td2);
        })
    })
}



