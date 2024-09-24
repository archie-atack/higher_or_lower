// DOM Elements
const leftName = document.getElementById('left-name');
const leftAppearances = document.getElementById('left-appearances');
const rightName = document.getElementById('right-name');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score'); // High score element
const gameOverScreen = document.getElementById('game-over');
const gameContainer = document.getElementById('game');
const gameOverMessage = document.getElementById('game-over-message');

// Game Variables
let players = [...playersData]; // Clone the playersData array to modify it
let leftPlayer, rightPlayer;
let score = 0;
let highScore = 0; // Initialize the high score variable

// Helper Function to get a random player from the available list and remove them from the list
function getRandomPlayer() {
    if (players.length === 0) return null; // Return null if no players are left
    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex];
    players.splice(randomIndex, 1); // Remove the selected player from the list
    return player;
}


// Function to count up from 0 to the player's appearances
function countUpAppearances(playerAppearances, displayElement) {
    let currentCount = 0;
    let increment = 1;
    
    if (playerAppearances > 50) increment = 2;  // Increase the increment for higher numbers
    if (playerAppearances > 100) increment = 5;  // Increase the increment for higher numbers
    if (playerAppearances > 200) increment = 10; // Make it even faster for large numbers
    
    let interval = setInterval(function() {
        currentCount += increment;
        displayElement.innerText = `Appearances: ${currentCount}`; // Update the display
        
        if (currentCount >= playerAppearances) {
            clearInterval(interval);
            displayElement.innerText = `Appearances: ${playerAppearances}`; // Ensure the final count is accurate
        }
    }, 30); // Speed of counting (faster for large increments)
}


// Start the game by setting the first two players
function startGame() {
    players = [...playersData]; // Reset the players list
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    highScoreDisplay.innerText = `High Score: ${highScore}`; // Display high score
    gameOverScreen.classList.add('hidden');
    gameOverScreen.classList.remove('visible');
    gameContainer.classList.remove('hidden');

    leftPlayer = getRandomPlayer();
    updateLeftPlayer();

    rightPlayer = getRandomPlayer();
    updateRightPlayer();
}

// Update Left Player UI
function updateLeftPlayer() {
    leftName.innerText = leftPlayer.name;
    leftAppearances.innerText = `Appearances: ${leftPlayer.appearances}`;
}

// Update Right Player UI without showing appearances yet
function updateRightPlayer() {
    if (rightPlayer === null) {
        showWellDoneScreen(); // No more players left to choose
        return;
    }

    // Show the name of the second player immediately
    rightName.innerText = rightPlayer.name;

    // Initially hide the appearances
    const rightAppearances = document.getElementById('right-appearances');
    rightAppearances.style.display = 'none'; // Hide appearances initially
}


// Handle Higher or Lower Button Clicks
document.getElementById('higher-btn').addEventListener('click', () => {
    checkAnswer(true);
});

document.getElementById('lower-btn').addEventListener('click', () => {
    checkAnswer(false);
});

// Check if the user's answer is correct
function checkAnswer(isHigher) {
    const correct = (isHigher && rightPlayer.appearances >= leftPlayer.appearances) || // Include equality check
                    (!isHigher && rightPlayer.appearances <= leftPlayer.appearances); // Include equality check

    // Get the appearances display element
    const rightAppearances = document.getElementById('right-appearances');

    // Show the appearances and start the count-up
    rightAppearances.style.display = 'block'; // Show appearances

    // Start the counting of appearances regardless of correctness
    countUpAppearances(rightPlayer.appearances, rightAppearances);

    // Delay the transition to the next player or game over until after the count-up finishes
    setTimeout(() => {
        if (correct) {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;

            // Prepare for the next player
            leftPlayer = rightPlayer;
            updateLeftPlayer();
            rightPlayer = getRandomPlayer();
            updateRightPlayer();
        } else {
            endGame(); // Show the game over screen after a delay
        }
    }, 2000); // Delay before moving to the next player or showing game over
}


// End the game
function endGame() {
    gameContainer.classList.add('hidden'); // Hide the game board
    gameOverScreen.classList.remove('hidden'); // Show game over screen
    gameOverScreen.classList.add('visible');

    // Update high score if the current score is higher
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerText = `High Score: ${highScore}`; // Update high score display
    }

    const message = score >= 50 ? "Great job!" : "Better luck next time!";
    gameOverMessage.innerText = `Your score: ${score}. ${message}`;
}

// Show Well Done Screen when all players have been guessed
function showWellDoneScreen() {
    gameContainer.classList.add('hidden'); // Hide the game board
    gameOverScreen.classList.remove('hidden'); // Show game over screen
    gameOverScreen.classList.add('visible');

    // Update high score if the current score is higher
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerText = `High Score: ${highScore}`;
    }

    gameOverMessage.innerText = `Well done! You've guessed all the players! Final score: ${score}.`;
}

// Play Again Button
document.getElementById('play-again-btn').addEventListener('click', startGame);

// Start the game when the page loads
window.onload = startGame;
