// This file is responsible for the renderer process. It manages the user interface and communicates with the main process.

import { ipcRenderer } from 'electron';

// @ts-ignore
const electronAPI = window.electronAPI;

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const timerDisplay = document.getElementById('timer-display');

let timerInterval;
const finishSound = new Audio('media/ding.mp3');

function updateDisplay(time: string | null) {
    if (timerDisplay) {
        timerDisplay.textContent = time;
    }
}

if (startButton) {
    startButton.addEventListener('click', () => {
        const durationInSeconds = 1500; // Example: 25 minutes
        electronAPI.send('start-timer', durationInSeconds);
    });
}

if (pauseButton) {
    pauseButton.addEventListener('click', () => {
        ipcRenderer.send('pause-timer');
    });
}

if (resetButton) {
    resetButton.addEventListener('click', () => {
        ipcRenderer.send('reset-timer');
    });
}

electronAPI.on('update-timer', (remaining: number) => {
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    const timerElem = document.getElementById('timerDisplay');
    if (timerElem) {
        timerElem.innerText = `${minutes}:${seconds}`;
    }
});

electronAPI.on('timer-finished', () => {
    // Play sound and update display to 00:00
    finishSound.currentTime = 0;
    finishSound.play();
    const timerElem = document.getElementById('timerDisplay');
    if (timerElem) {
        timerElem.innerText = '00:00';
    }
});