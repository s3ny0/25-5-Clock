
let timeDisplay = document.getElementById("time-left"); // Element to display the time element
let breakDisplay = document.getElementById("break-length"); // Element to display the break length
let sessionDisplay = document.getElementById("session-length"); // Element to display the session length
let startButton = document.getElementById("start_stop"); // Start stop button
let resetButton = document.getElementById("reset"); //Reset button
let timerLabel = document.getElementById("timer-label"); //Timer label
let muteButton = document.getElementById("mute");

let minutes = parseInt(sessionDisplay.textContent);
let breakLength = parseInt(breakDisplay.textContent);
let seconds = 0;
let timerInterval;
let isPaused = true;
let isBreak = false;

/*Load sounds
let beepSound = document.getElementById("beep"); //Beeping sound
let clickSound  = document.getElementById("click"); //Clicking sound
let tickSound = document.getElementById("tick");*/

// Function to update the display with leading zeros
function updateDisplay() {
    let adjustedSeconds = seconds < 10 ? '0' + seconds : seconds;
    let adjustedMinutes = minutes < 10 ? '0' + minutes : minutes;
    timeDisplay.innerHTML = `${adjustedMinutes}:${adjustedSeconds}`;
}

// Function to countdown timer
function countdown() {
    if (!isPaused) { // Only countdown if not paused
        seconds--; // Countdown seconds
        tickSound.play();

        // Countdown minutes
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }

        // Transition between session and break
        if (minutes < 0) {
            if (isBreak) { // If currently in a break, start a new session
                minutes = parseInt(sessionDisplay.textContent);
                timerLabel.innerHTML = "Session";
                isBreak = false;
            } else { // If currently in a session, start a new break
                minutes = breakLength;
                timerLabel.innerHTML = "Break";
                isBreak = true;
                beepSound.play(); // Play beep sound at the end of each session
            }
            seconds = 0;
        }

        updateDisplay(); // Update the displayed time
    }
}

// Function to start or stop the timer
function startTimer() {
    if (isPaused) { // If paused, start the timer
        isPaused = false;
        timerInterval = setInterval(countdown, 1000); // Start countdown
    } else { // If running, pause the timer
        isPaused = true;
        clearInterval(timerInterval); // Stop countdown
    }
}

// Function to reset the timer
function reset() {
    clearInterval(timerInterval); // Clear any running timer
    isPaused = true;
    minutes = 25; // Reset minutes to default 25
    seconds = 0; // Reset seconds to 0
    breakLength = 5; // Reset break length to default 5
    sessionDisplay.textContent = "25"; // Reset session display
    breakDisplay.textContent = "5"; // Reset break display
    timerLabel.innerHTML = "Session"; // Reset label to session
    isBreak = false; // Reset to session mode
    updateDisplay(); // Update the displayed time
}

// Function to increase break length
function increaseBreak() {
    let breaker = parseInt(breakDisplay.textContent);
    breaker++;

    // A break length should not be able to be > 60
    if (breaker > 60) {
        breaker = 60;
    }

    breakDisplay.innerHTML = breaker;
    if (isBreak) { // Update the timer if currently in break
        minutes = breaker;
        updateDisplay();
    }
}

// Function to decrease break length
function decreaseBreak() {
    let breaker = parseInt(breakDisplay.textContent);
    breaker--;

    // A break length should not be able to be <= 0
    if (breaker < 1) {
        breaker = 1;
    }

    breakDisplay.innerHTML = breaker;
    if (isBreak) { // Update the timer if currently in break
        minutes = breaker;
        updateDisplay();
    }
}

// Function to increase session length
function increaseSession() {
    let session = parseInt(sessionDisplay.textContent);
    session++;

    // A session length should not be able to be > 60
    if (session > 60) {
        session = 60;
    }

    sessionDisplay.innerHTML = session;
    if (!isBreak && isPaused) { // Update the timer if currently in session and timer is paused
        minutes = session;
        updateDisplay();
    }
}

// Function to decrease session length
function decreaseSession() {
    let session = parseInt(sessionDisplay.textContent);
    session--;

    // A session length should not be able to be <= 0
    if (session < 1) {
        session = 1;
    }

    sessionDisplay.innerHTML = session;
    if (!isBreak && isPaused) { // Update the timer if currently in session and timer is paused
        minutes = session;
        updateDisplay();
    }
}

/*Muting and unmuting sounds
function toggleMute() {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? "Unmute" : "Mute";
    if (isMuted) {
        beepSound.pause();
        beepSound.currentTime = 0;
        tickSound.pause();
        tickSound.currentTime = 0;
        clickSound.pause();
        clickSound.currentTime = 0;
    }
}*/

// Add event listeners to the buttons
startButton.addEventListener("click", function() {
    startTimer();
    clickSound.play();
});
resetButton.addEventListener("click", function() {
    reset();
    clickSound.play();
});
document.getElementById("break-increment").addEventListener("click", function() {
    increaseBreak();
    clickSound.play();
});
document.getElementById("break-decrement").addEventListener("click", function() {
    decreaseBreak();
    clickSound.play();
});
document.getElementById("session-increment").addEventListener("click", function() {
    increaseSession();
    clickSound.play();
});
document.getElementById("session-decrement").addEventListener("click", function() {
    decreaseSession();
    clickSound.play();
});

//muteButton.addEventListener("click", toggleMute);

// Initial display update
updateDisplay();
