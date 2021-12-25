'use strict';
let secretNumber = Math.ceil(Math.random() * 20)

let btnAgain = document.querySelector('.btn.again')
let btnCheck = document.querySelector('.btn.check')
let numberCorect = document.querySelector('.number')
let guessNumber = document.querySelector('.guess')
let message = document.querySelector('.message')
let scoreSpan = document.querySelector('.score')
let highScore = document.querySelector('.highscore')
let body = document.querySelector('body')

let score = 20;

btnCheck.addEventListener('click', function() {
    if(guessNumber.value) {
        if(secretNumber === Number(guessNumber.value)) {
            message.textContent = '🎉 Correct Number!'
            numberCorect.textContent = secretNumber
            body.classList.add('correct')
            if(score > Number(highScore.textContent)) {
                highScore.textContent = score
            }
        } else {
            message.textContent = (secretNumber < guessNumber.value) ? '📈 Too high!' : '📉 Too low!';
            score > 1 ? score-- : message.textContent = 'You lost 😥'
            scoreSpan.textContent = score
        }
    } else {
        message.textContent = 'Choose your number!'
    }
})

btnAgain.addEventListener('click', function(){
    secretNumber = Math.ceil(Math.random() * 20)
    score = 20;
    body.classList.remove('correct')
    message.textContent = 'Start guessing...'
    scoreSpan.textContent = score
    guessNumber.value = ''
    numberCorect.innerText = '?'
})
    
