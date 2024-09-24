// Player data - List of players and their appearances
const playersData = [
    { name: 'Jude Bellingham', appearances: 44 },
    { name: 'Barry Ferguson', appearances: 169 },
    { name: 'Seb Larsson', appearances: 205 },
    { name: 'Trevor Francis', appearances: 280 },
    { name: 'Stephen Carr', appearances: 107 },
    { name: 'Mikael Forssell', appearances: 119 },
    { name: 'Damien Johnson', appearances: 269 },
    { name: 'Maik Taylor', appearances: 243 },
    { name: 'Robbie Savage', appearances: 128 },
    { name: 'Lukas Jutkiewicz', appearances: 207 }
    // Add more players here if necessary
];

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

// Update Right Player UI
function updateRightPlayer() {
    if (rightPlayer === null) {
        showWellDoneScreen(); // No more players left to choose
        return;
    }
    rightName.innerText = rightPlayer.name;
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
    const correct = (isHigher && rightPlayer.appearances > leftPlayer.appearances) ||
                    (!isHigher && rightPlayer.appearances < leftPlayer.appearances);

    if (correct) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
        leftPlayer = rightPlayer;
        updateLeftPlayer();
        rightPlayer = getRandomPlayer();
        updateRightPlayer();
    } else {
        endGame();
    }
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

    const message = score >= 5 ? "Great job!" : "Better luck next time!";
    gameOverMessage.innerText = `Your score: ${score}. ${message}\nHigh Score: ${highScore}`;
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

    gameOverMessage.innerText = `Well done! You've guessed all the players! Final score: ${score}. High Score: ${highScore}`;
}

// Play Again Button
document.getElementById('play-again-btn').addEventListener('click', startGame);

// Start the game when the page loads
window.onload = startGame;
