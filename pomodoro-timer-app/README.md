# Pomodoro Timer App

A simple, friendly Pomodoro timer desktop application built with Electron and TypeScript.

## Features

- Pomodoro timer with customizable work and break durations
- "Secuencia Pomodoro" mode (work → short break → repeat 4 times → long break)
- Option to run only a single Pomodoro session (no breaks)
- Friendly, feminine UI with custom fonts and colors
- Sound notification when the timer reaches 00:00
- Works as a standalone Windows `.exe` (no need for Visual Studio or compilers)

## How to Use

1. **Clone or download the repository.**
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile TypeScript.
4. Run `npm start` to launch the app.
5. To create a standalone `.exe`, run `npm run package-win`.

## Controls

- **Iniciar:** Start the timer or Pomodoro sequence.
- **Reestablecer:** Reset the timer.
- **Secuencia Pomodoro:** Toggle between full Pomodoro cycles and single session mode.

## Customization

- Change timer durations using the input fields.
- The app icon and notification sound are in the `media/` folder (`tomato.ico` and `ding.mp3`).

## Project Structure

```
pomodoro-timer-app/
├── dist/                   # Compiled JavaScript files (output from TypeScript)
├── media/                  # App assets (icon and sound)
│   ├── tomato.ico
│   └── ding.mp3
├── node_modules/           # Installed dependencies (not tracked by git)
├── src/                    # Source TypeScript files
│   ├── main.ts
│   ├── preload.ts
│   └── renderer.ts
├── index.html              # Main HTML file for the app UI
├── package.json            # Project metadata and scripts
├── .gitignore              # Files and folders to ignore in git
├── README.md               # Project documentation
```

## .gitignore

This project ignores:
- `node_modules/`
- `dist/`
- Build outputs (`PomodoroTimer-win32-x64/`, `*.exe`, `*.zip`)
- Log files

## License

MIT

---
