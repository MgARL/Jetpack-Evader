// Home Page Functionality Part


// Functionality for Modals

// getting elements

// buttons

let creditsBtn = document.querySelector("#creditsBtn");

let closeCrBtn = document.querySelector('#close-modal-cr');

let playGameBtn = document.querySelector('#play-game-btn');

let soundOnBtn = document.querySelector('#sound-on');

let soundOffBtn = document.querySelector('#sound-off');


//getting Modal

let creditsModal= document.querySelector('#modal-credits');

// creating Sound FX

let playSoundFX = new Audio('/assets/music/magic.ogg');
playSoundFX.volume = 0.5;

let creditsClickSFX = new Audio('/assets/music/bling.ogg');
creditsClickSFX.volume = 0.2;

// background Music

let bgMusic = new Audio('/assets/music/Lunar-Lander-Jupiter.mp3');
bgMusic.volume = 0.3;
bgMusic.loop = true;


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

setTimeout(() => {
    bgMusic.play();
},2000);
