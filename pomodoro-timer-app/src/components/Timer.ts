class Timer {
    private duration: number;
    private remaining: number;
    private timerId: ReturnType<typeof setInterval> | null;
    private isRunning: boolean;

    constructor(duration: number) {
        this.duration = duration;
        this.remaining = duration;
        this.timerId = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.timerId = setInterval(() => {
            if (this.remaining > 0) {
                this.remaining -= 1000; // Decrease remaining time by 1 second
            } else {
                this.reset(); // Reset when time is up
            }
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;

        clearInterval(this.timerId!);
        this.timerId = null;
        this.isRunning = false;
    }

    reset() {
        this.pause();
        this.remaining = this.duration;
    }

    getTime() {
        return this.remaining;
    }
}

export default Timer;