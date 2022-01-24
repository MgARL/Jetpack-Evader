// Home Page Functionality Part


// Functionality for Modals

// getting elements

// buttons

let creditsBtn = document.querySelector("#creditsBtn");

let closeCrBtn = document.querySelector('#close-modal-cr');

let playGameBtn = document.querySelector('#play-game-btn');

//getting Modal

let creditsModal= document.querySelector('#modal-credits');

// creating Sound FX

let playSoundFX = new Audio('/assets/music/magic.ogg');
playSoundFX.volume = 0.5;

let creditsClickSFX = new Audio('/assets/music/bling.ogg');
creditsClickSFX.volume = 0.2;


//adding event listener to show and hide with Credit
creditsBtn.addEventListener('click', () => {
    creditsModal.classList.remove('d-none');
    creditsClickSFX.play()
 });
 
 closeCrBtn.addEventListener('click', () => {
     creditsModal.classList.add('d-none'); 
     creditsClickSFX.play()
 });

 playGameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    playSoundFX.play();
    setTimeout(() => {
        window.location.href = "/game.html"
    },700)
 })
