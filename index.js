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

// game();

// Add event listern for rock, paper and scissors buttons
const buttons = document.querySelectorAll(".option");
buttons.forEach(element => {
    element.addEventListener("click", () => {
        // Play the game and returns the winner
        winner = playRound(element.id, getComputerChoice());
        // If player wins the round
        if (winner === "player") {
            // Set new score
            const resultDiv = document.querySelector("#player-result");
            let playerScore = parseInt(resultDiv.textContent.split(" ")[1]);
            playerScore += 1;
            resultDiv.textContent = `Player: ${playerScore.toString()}`;
        // If computer wins the round
        } else if (winner === "computer") {
            // Set new score
            const resultDiv = document.querySelector("#computer-result");
            let computerScore = parseInt(resultDiv.textContent.split(" ")[1]);
            computerScore += 1;
            resultDiv.textContent = `Computer: ${computerScore.toString()}`;
        }
    })
})
