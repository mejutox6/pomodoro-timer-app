// This file is responsible for the renderer process. It manages the user interface and communicates with the main process.

import { ipcRenderer } from 'electron';

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const timerDisplay = document.getElementById('timer-display');

let timerInterval;

function updateDisplay(time: string | null) {
    if (timerDisplay) {
        timerDisplay.textContent = time;
    }
}

if (startButton) {
    startButton.addEventListener('click', () => {
        ipcRenderer.send('start-timer');
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

ipcRenderer.on('update-timer', (event, time) => {
    updateDisplay(time);
});

ipcRenderer.on('timer-finished', () => {
    clearInterval(timerInterval);
    updateDisplay('00:00');
});