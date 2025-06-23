export interface TimerSettings {
    workDuration: number; // in minutes
    breakDuration: number; // in minutes
    longBreakDuration: number; // in minutes
    cyclesBeforeLongBreak: number; // number of cycles before a long break
}

export interface PomodoroState {
    isActive: boolean;
    timeRemaining: number; // in seconds
    cyclesCompleted: number;
}