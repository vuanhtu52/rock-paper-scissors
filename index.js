ROCK_SYMBOL = "✊";
PAPER_SYMBOL = "✋";
SCISSORS_SYMBOL = "✌";

let roundNumber = 0;
let playerScore = 0;
let computerScore = 0;

function capitalize(text) {
    text = text.toLowerCase();
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text;
}

function getComputerChoice() {
    // Generate random number between 0 and 2
    num = Math.floor(Math.random() * (3 - 0)) + 0;
    // Map the number to the result
    if (num === 0) {
        return "rock";
    } else if (num === 1) {
        return "paper";
    } else {
        return "scissors"
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    let winner;
    // Result is tie
    if (playerSelection === computerSelection) {
        winner = "tie";
    // Result is win
    } else if ((playerSelection == "paper" && computerSelection == "rock") || (playerSelection == "scissors" && computerSelection == "paper") || (playerSelection == "rock" && computerSelection == "scissors")) {
        winner = "player";
    // Result is lose
    } else {
        winner = "computer";
    }

    return winner;
}

function resetGame() {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    // Reset score displays
    const playerResultDiv = document.querySelector("#player-result");
    playerResultDiv.textContent = `Player: ${playerScore}`;
    const computerResultDiv = document.querySelector("#computer-result");
    computerResultDiv.textContent = `Computer: ${computerScore}`;
    // Reset symbol displays
    const playerDiv = document.querySelector("#player-selection");
    playerDiv.textContent = "?";
    const computerDiv = document.querySelector("#computer-selection");
    computerDiv.textContent = "?";
    // Reset message
    const messageDiv = document.querySelector(".round-message");
    messageDiv.textContent = "--"; 
    // Reset roundNumber
    roundNumber = 0;
}

function openPopup(winner) {
    // Open popup
    const popup = document.querySelector(".popup");
    popup.classList.add("open-popup");
    // Display result
    const messageDiv = document.querySelector(".popup > div");
    if (winner === "player") {
        messageDiv.textContent = "You won the game!";
    } else {
        messageDiv.textContent = "You lost...";
    }
    // Add overlay to prevent user from clicking
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("overlay-active");
}

function closePopup() {
    // Close popup
    const popup = document.querySelector(".popup");
    popup.classList.remove("open-popup");
    // Remove overlay
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("overlay-active");
}

// Add event listener for rock, paper and scissors buttons
const buttons = document.querySelectorAll(".choice");
buttons.forEach(element => {
    element.addEventListener("click", () => {
        // Play the game and returns the winner
        let playerChoice = element.id;
        let computerChoice = getComputerChoice();
        winner = playRound(playerChoice, computerChoice);

        // Update the scores for player and computer
        if (winner === "player") {
            const resultDiv = document.querySelector("#player-result");
            playerScore += 1;
            resultDiv.textContent = `Player: ${playerScore.toString()}`;
        } else if (winner === "computer") {
            const resultDiv = document.querySelector("#computer-result");
            computerScore += 1;
            resultDiv.textContent = `Computer: ${computerScore.toString()}`;
        }

        // Display correct symbol based on player's choice
        const playerDiv = document.querySelector("#player-selection");
        if (playerChoice === "rock") {
            playerDiv.textContent = ROCK_SYMBOL;
        } else if (playerChoice === "paper") {
            playerDiv.textContent = PAPER_SYMBOL;
        } else {
            playerDiv.textContent = SCISSORS_SYMBOL;
        }

        // Display correct symbol based on computer's choice
        const computerDiv = document.querySelector("#computer-selection");
        if (computerChoice === "rock") {
            computerDiv.textContent = ROCK_SYMBOL;
        } else if (computerChoice === "paper") {
            computerDiv.textContent = PAPER_SYMBOL;
        } else {
            computerDiv.textContent = SCISSORS_SYMBOL;
        } 

        // Display message for current round
        const messageDiv = document.querySelector(".round-message");
        roundNumber += 1;
        if (winner === "tie") {
            messageDiv.textContent = `Round ${roundNumber}: Tie! Both threw ${capitalize(playerChoice)}`;
        } else if (winner === "player") {
            messageDiv.textContent = `Round ${roundNumber}: You win this round! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}`;
        } else {
            messageDiv.textContent = `Round ${roundNumber}: You lose this round! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}`;
        }

        // Create a pop-up message when the game is over
        // The nested requestAnimationFrame is to wait for the screen to refresh with the latest updates
        if (playerScore === 5) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    openPopup("player");
                })
            })
        }
        if (computerScore === 5) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    openPopup("computer");
                })
            })
        }
    })
})

// Reset the game when user clicks the new game button
const newGameButton = document.querySelector("#new-game");
newGameButton.addEventListener("click", () => {
    resetGame();
})

// Reset the game when user clicks the new game button from popup
const popupButton = document.querySelector(".popup > button");
popupButton.addEventListener("click", () => {
    resetGame();
    closePopup();
})
