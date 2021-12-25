'use strict';
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

const players = document.querySelectorAll('.player')
const player0El = document.querySelector('.player--0')

let currentScore, isPlaying, activePlayer

const init = function() {
    let playerWinner = document.querySelector('.player--winner')
    if(playerWinner) {
        playerWinner.classList.remove('player--winner')
    }
    
    player0El.classList.add('player--active')

    diceEl.classList.add('hidden')

    let playerScores = document.querySelectorAll('.score')
    playerScores.forEach(function(playerScore) {
        playerScore.textContent = 0
    })
    
    let playerCurentScores = document.querySelectorAll('.current-score')
    playerCurentScores.forEach(function(playerCurentScore) {
        playerCurentScore.textContent = 0
    })
    
    currentScore = 0;
    isPlaying = true;
    activePlayer = 0;
} 
init()

const switchPlayer = function() {
    players.forEach(function(player) {
        player.classList.toggle('player--active')
    })
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = (activePlayer === 0) ? 1 : 0;
}

const gameFinished = function() {
    diceEl.classList.add('hidden')
    alert('The game is end. Click the 🔄 button to reset!')
}

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if(isPlaying) {
        // Gemerating a random dice roll
        let diceValue = Math.ceil(Math.random() * 6);
        
        // Display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${diceValue}.png`
        
        // Check for roll 1
        if(diceValue === 1) {
            switchPlayer();
        } else {
            currentScore += diceValue
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        }
    } else {
        gameFinished()
    }
})

btnHold.addEventListener('click', function() {
    if(isPlaying) {
        let playerScore = document.getElementById(`score--${activePlayer}`)
        playerScore.textContent = Number(playerScore.textContent) + currentScore
        
        // Check if player's score >= 100
        if(playerScore.textContent >= 5) {
            let playerParent = playerScore.closest('.player')
            playerParent.classList.remove('player--active')
            playerParent.classList.add('player--winner')
            isPlaying = false;
        } else {
            switchPlayer();
        }
    } else {
        gameFinished()
    }
})

btnNew.addEventListener('click', init)