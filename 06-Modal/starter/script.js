'use strict';
let btns = document.querySelectorAll('.show-modal')
let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay')
let btnClose = document.querySelector('.close-modal')

const openModal = function() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btns.forEach((btn) => {
    btn.addEventListener('click', openModal)
})

overlay.addEventListener('click', closeModal)
btnClose.addEventListener('click', closeModal)

document.addEventListener('keyup',function(e) {
    if(e.which === 27 && !modal.classList.contains('hidden')) {
        closeModal();
    }
} )
