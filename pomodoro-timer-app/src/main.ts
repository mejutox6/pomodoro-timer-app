import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

// __filename and __dirname are available in Electron's main process (CommonJS)
declare const __dirname: string;
declare const __filename: string;

let mainWindow: BrowserWindow | null;
let timerInterval: NodeJS.Timeout | null = null;
let remaining = 0;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // <-- Change from renderer.js to preload.js
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Listen for a start-timer event from renderer
ipcMain.on('start-timer', (event, durationSeconds: number) => {
    if (timerInterval) clearInterval(timerInterval);
    remaining = durationSeconds;
    timerInterval = setInterval(() => {
        remaining--;
        if (mainWindow) {
            mainWindow.webContents.send('update-timer', remaining);
        }
        if (remaining <= 0) {
            if (timerInterval) clearInterval(timerInterval);
            if (mainWindow) {
                mainWindow.webContents.send('timer-finished');
            }
        }
    }, 1000);
});
