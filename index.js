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

function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 0; i < 5; i++) {
        // Get input from user
        let playerSelection = prompt("Please provide your selection", "");

        // Play
        const computerSelection = getComputerChoice();
        let winner = playRound(playerSelection, computerSelection);
        if (winner == "tie") {
            console.log(`Round ${i+1}: Tie! Both thew ${capitalize(playerSelection)}`)
        } else if (winner == "player") {
            playerScore += 1;
            console.log(`Round ${i+1}: You win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`)
        } else {
            computerScore += 1;
            console.log(`Round ${i+1}: You lose! ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`)
        }
    }

    // Calculate final result
    console.log(`Final result: Player ${playerScore}, Computer ${computerScore}`)
    if (playerScore === computerScore) {
        console.log("No winner!")
    } else if (playerScore > computerScore) {
        console.log("You win!")
    } else {
        console.log("You lose!")
    }
}

function resetGame() {
    // Reset scores
    playerScore = 0;
    computerScore = 0;
    console.log("Player reset: ", playerScore);
    console.log("Computer reset: ", computerScore);
    // Reset score displays
    const playerResultDiv = document.querySelector("#player-result");
    playerResultDiv.textContent = `Player: ${playerScore}`;
    const computerResultDiv = document.querySelector("#computer-result");
    computerResultDiv.textContent = `Computer: ${computerScore}`;
    console.log("Reset")
}

// Add event listener for rock, paper and scissors buttons
const buttons = document.querySelectorAll(".choice");
buttons.forEach(element => {
    element.addEventListener("click", () => {
        console.log("Player: ", playerScore);
        console.log("Computer: ", computerScore);
        // Create a pop-up message when the game is over
        if (playerScore === 5) {
            alert("You won the game.");
            resetGame();
        }
        if (computerScore === 5) {
            alert("You lost the game.")
            resetGame();
        }

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
    })
})
