// 1. --- 75 Words Bank ---
const levelWordBank = {
  1: [
    { word: "apple", clue: "A fruit that keeps the doctor away" },
    { word: "dog", clue: "A loyal pet animal" },
    { word: "sun", clue: "Shines in the sky, hot like a lava!" }
  ],
  2: [
    { word: "cat", clue: "Purrs and chases mice" },
    { word: "fish", clue: "Swims in water, breadth through gills!" },
    { word: "ball", clue: "Round and bounces" }
  ],
  3: [
    { word: "tree", clue: "Grows tall and has leaves" },
    { word: "car", clue: "Moves on four wheels, used to take you places like a bus!" },
    { word: "chair", clue: "Used for sitting" }
  ],
  4: [
    { word: "book", clue: "Full of pages to read" },
    { word: "pen", clue: "Used for writing " },
    { word: "bird", clue: "Has feathers and can fly" }
  ],
  5: [
    { word: "shoe", clue: "Worn on your feet" },
    { word: "milk", clue: "White liquid from cows" },
    { word: "box", clue: "Used to store things like a container" }
  ],
  6: [
    { word: "hat", clue: "Worn on the head" },
    { word: "cake", clue: "Sweet dessert" },
    { word: "bed", clue: "You sleep on it" }
  ],
  7: [
    { word: "spoon", clue: "Used for eating soup and taking soup via bowl" },
    { word: "rain", clue: "Water falling from sky" },
    { word: "key", clue: "Used to open locks" }
  ],
  8: [
    { word: "fan", clue: "Spins and cools the air" },
    { word: "rice", clue: "Common food grain" },
    { word: "frog", clue: "Jumps and croaks" }
  ],
  9: [
    { word: "clock", clue: "Tells the time" },
    { word: "banana", clue: "Yellow curved fruit" },
    { word: "bus", clue: "Carries people in the city" }
  ],
  10: [
    { word: "star", clue: "Twinkles in the sky" },
    { word: "glass", clue: "Used to drink water like a cup!" },
    { word: "door", clue: "Used to enter a room" }
  ],
  11: [
    { word: "guitar", clue: "A musical instrument with strings" },
    { word: "rocket", clue: "Flies into space" },
    { word: "bridge", clue: "Connects two areas over water" }
  ],
  12: [
    { word: "desert", clue: "Very hot and sandy" },
    { word: "camera", clue: "Takes photographs" },
    { word: "pencil", clue: "Used to draw and write" }
  ],
  13: [
    { word: "tunnel", clue: "Path under the ground" },
    { word: "mirror", clue: "Shows your reflection" },
    { word: "school", clue: "Where students learn" }
  ],
  14: [
    { word: "ladder", clue: "Used to climb up" },
    { word: "police", clue: "Keeps law and order" },
    { word: "farmer", clue: "Grows crops and food" }
  ],
  15: [
    { word: "window", clue: "Lets in light and air" },
    { word: "pillow", clue: "You rest your head on it" },
    { word: "ticket", clue: "Lets you enter somewhere" }
  ],
  16: [
    { word: "microscope", clue: "Used to see small things" },
    { word: "satellite", clue: "Orbits planets in space" },
    { word: "algorithm", clue: "Step-by-step computer instructions" }
  ],
  17: [
    { word: "gravity", clue: "Pulls objects toward Earth" },
    { word: "telescope", clue: "Used to see stars" },
    { word: "volcano", clue: "Erupts with lava" }
  ],
  18: [
    { word: "equation", clue: "A math expression" },
    { word: "bacteria", clue: "Tiny living organisms" },
    { word: "oxygen", clue: "What we breathe" }
  ],
  19: [
    { word: "circuit", clue: "Path for electricity" },
    { word: "software", clue: "Programs on a computer" },
    { word: "protein", clue: "Builds muscle and cells" }
  ],
  20: [
    { word: "strategy", clue: "A plan for success" },
    { word: "molecule", clue: "Smallest part of a substance" },
    { word: "universe", clue: "Everything that exists" }
  ],
  21: [
    { word: "magnet", clue: "Attracts metals" },
    { word: "neuron", clue: "Brain cell that sends signals" },
    { word: "glacier", clue: "A slow-moving ice mass" }
  ],
  22: [
    { word: "element", clue: "A pure chemical substance" },
    { word: "density", clue: "Mass per unit volume" },
    { word: "reaction", clue: "Happens in chemistry" }
  ],
  23: [
    { word: "theory", clue: "An idea or explanation" },
    { word: "function", clue: "Used in math or code" },
    { word: "network", clue: "Connected system" }
  ],
  24: [
    { word: "physics", clue: "Study of matter and energy" },
    { word: "culture", clue: "Beliefs and traditions" },
    { word: "climate", clue: "Average weather of a place" }
  ],
  25: [
    { word: "resource", clue: "Something useful and valuable" },
    { word: "justice", clue: "Fair treatment" },
    { word: "creature", clue: "Any living being" }
  ]
};

// 2. --- Read Current Level from URL ---
const level = parseInt(new URLSearchParams(window.location.search).get('level')) || 1;
const levelWords = levelWordBank[level];

if (!levelWords) {
  alert("Invalid level!");
  window.location.href = 'index.html';
}

// 3. --- Game State Variables ---
let currentWordIndex = 0;
let guessedWords = 0;
let score = parseInt(localStorage.getItem('gameScore')) || 0;
let wrongGuesses = 0;
let timer = 90;
let timerInterval;
let paused = false;

// 4. --- HTML Element References ---
const clueEl = document.getElementById('clue');
const inputEl = document.getElementById('guessInput');
const messageEl = document.getElementById('message');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const submitBtn = document.getElementById('submitBtn');
const retryBtn = document.getElementById('retryBtn');
const quitBtn = document.getElementById('quitBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');
const backBtn = document.getElementById('backBtn');
const winSound = new Audio('cogts-1.mp3'); 
const loseSound = new Audio('lose-1.mp3');
const resultModal = document.getElementById('resultModal');
const resultTitle = document.getElementById('resultTitle');
const modalRetryBtn = document.getElementById('modalRetryBtn');
const modalQuitBtn = document.getElementById('modalQuitBtn');
const modalNextBtn = document.getElementById('modalNextBtn');
const correctSound = new Audio('sucessed.mp3'); 
const wrongSound = new Audio('wrong.mp3'); 

// 5. --- Background Music ---
const gamemusic = new Audio('Game.mp3');
gamemusic.loop = true;
gamemusic.volume = 0.4;

// Check saved music state in localStorage
let isMusicOn = localStorage.getItem('musicOn') === 'true';

// Start or pause music depending on saved state
if (isMusicOn) {
  gamemusic.play().catch(() => {
    console.log('Music autoplay blocked');
  });
  muteBtn.style.display = 'inline-block';
  unmuteBtn.style.display = 'none';
} else {
  gamemusic.pause();
  muteBtn.style.display = 'none';
  unmuteBtn.style.display = 'inline-block';
}

// 6. --- Mute / Unmute Buttons ---
muteBtn.addEventListener('click', () => {
  gamemusic.pause();
  muteBtn.style.display = 'none';
  unmuteBtn.style.display = 'inline-block';
  isMusicOn = false;
  localStorage.setItem('musicOn', 'false');
});

unmuteBtn.addEventListener('click', () => {
  gamemusic.play().catch(() => {
    console.log('User interaction needed to play music');
  });
  muteBtn.style.display = 'inline-block';
  unmuteBtn.style.display = 'none';
  isMusicOn = true;
  localStorage.setItem('musicOn', 'true');
});

// 7. --- Pause / Resume Buttons ---
pauseBtn.addEventListener('click', () => {
  paused = true;
  clearInterval(timerInterval);
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'inline-block';
});

resumeBtn.addEventListener('click', () => {
  paused = false;
  resumeBtn.style.display = 'none';
  pauseBtn.style.display = 'inline-block';
  startTimer();
});

// 8. --- Back Button ---
backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// 9. --- Start Game ---
function startGame() {
  displayClue();
  updateScore();
  startTimer();
}
startGame();

// 10. --- Show Current Word's Clue ---
function displayClue() {
  clueEl.textContent = levelWords[currentWordIndex].clue;
  inputEl.value = '';
  inputEl.focus();
}

// 11. --- Check Guess ---
submitBtn.addEventListener('click', () => {
  const guess = inputEl.value.trim().toLowerCase();

  if (!guess) {
    messageEl.textContent = "Please enter a guess!";
    return;
  }

  if (guess === levelWords[currentWordIndex].word) {
  correctSound.play().catch(() => {});

  clueEl.classList.add('reveal-animation');
  setTimeout(() => {
    clueEl.classList.remove('reveal-animation');
  }, 500);

  score += 10;
  guessedWords++;
  updateScore();
  currentWordIndex++;

  if (guessedWords === 3) {
    winLevel();
  } else {
    displayClue();
  }

  messageEl.textContent = "✅ Correct!";
} else {
  wrongSound.play().catch(() => {});
  wrongGuesses++;
  score = Math.max(0, score - 1); // avoid negative score
  updateScore();
  messageEl.textContent = "❌ Try again!";
}

  inputEl.value = '';
  inputEl.focus();
});

// 12. --- Timer Logic ---
function startTimer() {
  timerEl.textContent = `⏱ ${timer}s`;
  timerInterval = setInterval(() => {
    if (!paused) {
      timer--;
      timerEl.textContent = `⏱ ${timer}s`;
      if (timer <= 0) {
        clearInterval(timerInterval);
        loseLevel();
      }
    }
  }, 1000);
}

// 13. --- Update Score ---
function updateScore() {
  scoreEl.textContent = `Score: ${score}`;
}

// 14. --- Win / Lose Logic ---
function winLevel() {
  clearInterval(timerInterval);

  // Bonus points only if no mistakes
  if (wrongGuesses === 0) {
    score += 30;
  }

  updateScore();
  localStorage.setItem('gameScore', score);

  const unlocked = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (level + 1 > unlocked) {
    localStorage.setItem('unlockedLevel', level + 1);
  }

  confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  winSound.play().catch(() => {});

  resultTitle.textContent = level === 25 ? "🏁 Game Complete!" : "🎉 You Won!";
  modalNextBtn.style.display = level === 25 ? 'none' : 'inline-block';
  resultModal.style.display = 'flex';
}


function loseLevel() {
  clearInterval(timerInterval);
  loseSound.play().catch(() => {});
  document.body.classList.add('lose-shake', 'lose-flash');

  resultTitle.textContent = "💥 You Lost!";
  modalNextBtn.style.display = 'none';
  resultModal.style.display = 'flex';

  setTimeout(() => {
    document.body.classList.remove('lose-shake', 'lose-flash');
  }, 600);
}

// 15. --- Control Buttons ---
retryBtn.addEventListener('click', () => {
  location.reload();
});

quitBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

nextLevelBtn.addEventListener('click', () => {
  window.location.href = `game.html?level=${level + 1}`;
});
modalRetryBtn.addEventListener('click', () => {
  resultModal.style.display = 'none';
  location.reload();
});

modalQuitBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

modalNextBtn.addEventListener('click', () => {
  window.location.href = `game.html?level=${level + 1}`;
});

// 16. --- Submit Guess on Enter Key ---
inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitBtn.click();
  }
});

// 17. Scoreboard after 25 level ----

// Track total correct and wrong guesses across all levels
let totalCorrectWords = parseInt(localStorage.getItem('totalCorrectWords')) || 0;
let totalWrongGuesses = parseInt(localStorage.getItem('totalWrongGuesses')) || 0;
let perfectLevels = parseInt(localStorage.getItem('perfectLevels')) || 0;

// Update totals on correct guess
function onCorrectGuess() {
  totalCorrectWords++;
  localStorage.setItem('totalCorrectWords', totalCorrectWords);
}

// Update totals on wrong guess
function onWrongGuess() {
  totalWrongGuesses++;
  localStorage.setItem('totalWrongGuesses', totalWrongGuesses);
}

// Call these inside your existing submitBtn event listener:
submitBtn.addEventListener('click', () => {
  const guess = inputEl.value.trim().toLowerCase();

  if (!guess) {
    messageEl.textContent = "Please enter a guess!";
    return;
  }

  if (guess === levelWords[currentWordIndex].word) {
    correctSound.play().catch(() => {});

    clueEl.classList.add('reveal-animation');
    setTimeout(() => {
      clueEl.classList.remove('reveal-animation');
    }, 500);

    score += 10;
    guessedWords++;
    updateScore();
    currentWordIndex++;

    onCorrectGuess(); // Track correct guess

    if (guessedWords === 3) {
      winLevel();
    } else {
      displayClue();
    }

    messageEl.textContent = "✅ Correct!";
  } else {
    wrongSound.play().catch(() => {});
    wrongGuesses++;
    score = Math.max(0, score - 1);
    updateScore();
    messageEl.textContent = "❌ Try again!";

    onWrongGuess(); // Track wrong guess
  }

  inputEl.value = '';
  inputEl.focus();
});

// Extend winLevel function to update perfectLevels and show scoreboard on level 25
function winLevel() {
  clearInterval(timerInterval);

  // Bonus points only if no mistakes in the current level
  if (wrongGuesses === 0) {
    score += 30;
    perfectLevels++;
    localStorage.setItem('perfectLevels', perfectLevels);
  }

  updateScore();
  localStorage.setItem('gameScore', score);

  // Update unlocked level
  const unlocked = parseInt(localStorage.getItem('unlockedLevel')) || 1;
  if (level + 1 > unlocked) {
    localStorage.setItem('unlockedLevel', level + 1);
  }

  confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  winSound.play().catch(() => {});

  resultTitle.textContent = level === 25 ? "🏁 Game Complete!" : "🎉 You Won!";
  modalNextBtn.style.display = level === 25 ? 'none' : 'inline-block';
  resultModal.style.display = 'flex';

  // Show final scoreboard if game complete
  if (level === 25) {
    setTimeout(showFinalScoreboard, 2000);
  }
}

// Show the scoreboard modal with all stats
function showFinalScoreboard() {
  // Only hide the result modal if it's still visible
  if (resultModal.style.display !== 'none') {
    resultModal.style.display = 'none';
  }

  // Show scoreboard modal
  const scoreboard = document.getElementById('scoreboardModal');
  scoreboard.style.display = 'flex';

  document.getElementById('finalScoreText').textContent = `🏆 Final Score: ${score}`;
  document.getElementById('correctWordsText').textContent = `✅ Correct Words: ${totalCorrectWords}`;
  document.getElementById('wrongGuessesText').textContent = `❌ Wrong Guesses: ${totalWrongGuesses}`;
  document.getElementById('perfectLevelsText').textContent = `💯 Perfect Levels: ${perfectLevels}`;
}


// Restart game function — clears data and goes back to first level or main page
function restartGame() {
  localStorage.removeItem('gameScore');
  localStorage.removeItem('unlockedLevel');
  localStorage.removeItem('totalCorrectWords');
  localStorage.removeItem('totalWrongGuesses');
  localStorage.removeItem('perfectLevels');
  window.location.href = 'index.html';
}

// Go to levels overview page
function goToLevels() {
  window.location.href = 'levels.html';  // Adjust if you have a levels page
}

// Event listeners for scoreboard buttons
document.getElementById('restartGameBtn').addEventListener('click', restartGame);
document.getElementById('viewLevelsBtn').addEventListener('click', goToLevels);

// Close modal manually with ✖ icon
document.getElementById('closeScoreboard').addEventListener('click', () => {
  document.getElementById('scoreboardModal').style.display = 'none';
});
