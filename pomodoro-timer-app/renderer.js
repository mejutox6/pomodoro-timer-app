const timerDisplay = document.getElementById('timerDisplay'); // Use this everywhere

let timerDuration = Math.round(parseFloat(document.getElementById('timerInput').value) * 60);
let shortPauseDuration = Math.round(parseFloat(document.getElementById('shortPauseInput').value) * 60);
let longPauseDuration = Math.round(parseFloat(document.getElementById('longPauseInput').value) * 60);
let remaining = timerDuration;
let intervalId = null;
let sessionCount = 0;
const finishSound = new Audio('media/ding.mp3');

function setActiveBox(box) {
  document.getElementById('box-pomodoro').classList.remove('active');
  document.getElementById('box-short').classList.remove('active');
  document.getElementById('box-long').classList.remove('active');
  if (box === 'pomodoro') document.getElementById('box-pomodoro').classList.add('active');
  if (box === 'short') document.getElementById('box-short').classList.add('active');
  if (box === 'long') document.getElementById('box-long').classList.add('active');
}

function updateDisplay() {
  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');
  timerDisplay.innerText = `${minutes}:${seconds}`;
}

function startTimer(duration, box, onComplete) {
  clearInterval(intervalId);
  remaining = duration;
  setActiveBox(box);
  updateDisplay();
  intervalId = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      updateDisplay();
    } else {
      clearInterval(intervalId);
      finishSound.currentTime = 0; // Rewind to start
      finishSound.play();          // Play the sound
      if (onComplete) onComplete();
    }
  }, 1000);
}

function startPomodoroCycle() {
  sessionCount = 0;
  if (document.getElementById('pomodoroSwitch').checked) {
    startWorkSession();
  } else {
    startSinglePomodoro();
  }
}

function startWorkSession() {
  setActiveBox('pomodoro');
  startTimer(timerDuration, 'pomodoro', () => {
    sessionCount++;
    if (sessionCount < 4) {
      startShortPause();
    } else {
      startLongPause();
    }
  });
}

function startSinglePomodoro() {
  setActiveBox('pomodoro');
  startTimer(timerDuration, 'pomodoro', () => {
    // Do nothing after timer ends if not in sequence mode
  });
}

function startShortPause() {
  setActiveBox('short');
  startTimer(shortPauseDuration, 'short', startWorkSession);
}

function startLongPause() {
  setActiveBox('long');
  startTimer(longPauseDuration, 'long', startPomodoroCycle);
}

document.getElementById('iniciarBtn').addEventListener('click', () => {
  timerDuration = Math.round(parseFloat(document.getElementById('timerInput').value) * 60);
  shortPauseDuration = Math.round(parseFloat(document.getElementById('shortPauseInput').value) * 60);
  longPauseDuration = Math.round(parseFloat(document.getElementById('longPauseInput').value) * 60);
  clearInterval(intervalId);
  startPomodoroCycle();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(intervalId);
  sessionCount = 0;
  setActiveBox('pomodoro');
  timerDuration = Math.round(parseFloat(document.getElementById('timerInput').value) * 60);
  remaining = timerDuration;
  updateDisplay();
});

// Initialize display
setActiveBox('pomodoro');
updateDisplay();