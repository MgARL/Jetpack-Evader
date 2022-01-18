// Home Page Functionality Part


// Functionality for Modals

// getting elements

// buttons

let creditsBtn = document.querySelector("#creditsBtn");

let closeCrBtn = document.querySelector('#close-modal-cr')

//getting Modal

let creditsModal= document.querySelector('#modal-credits');


//adding event listener to show and hide with Credit
creditsBtn.addEventListener('click', () => {
    creditsModal.classList.remove('d-none');
 });
 
 closeCrBtn.addEventListener('click', () => {
     creditsModal.classList.add('d-none'); 
 });
