function getComputerChoice() {
    // Generate random number between 0 and 2
    num = Math.floor(Math.random() * (3 - 0)) + 0;
    // Map the number to the result
    if (num === 0) {
        return "Rock";
    } else if (num === 1) {
        return "Paper";
    } else {
        return "Scissor"
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    let result;
    // Result is tie
    if (playerSelection === computerSelection) {
        result = `Tie! Both thew ${playerSelection.charAt(0).toUpperCase()}${playerSelection.slice(1)}`
    // Result is win
    } else if ((playerSelection == "paper" && computerSelection == "rock") || (playerSelection == "scissor" && computerSelection == "paper") || (playerSelection == "rock" && computerSelection == "scissor")) {
        result = `You Win! ${playerSelection.charAt(0).toUpperCase()}${playerSelection.slice(1)} beats ${computerSelection.charAt(0).toUpperCase()}${computerSelection.slice(1)}`;
    // Result is lose
    } else {
        result = `You Lose! ${computerSelection.charAt(0).toUpperCase()}${computerSelection.slice(1)} beats ${playerSelection.charAt(0).toUpperCase()}${playerSelection.slice(1)}`;
    }

    return result;
}

function game() {
    // Get input from user
    input = prompt("Please provide your selection", "")
    console.log(input)
}

game();