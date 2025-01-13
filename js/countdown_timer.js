export class CountdownTimer {
    constructor(containerId, duration, onEndCallback) {
        const radius = 54; // Circle radius
        this.circumference = 2 * Math.PI * radius;
  
        // Select elements within the container
        const container = document.getElementById(containerId);
        this.progressCircle = container.querySelector('.ring-progress');
        this.timerText = container.querySelector('.timer-text');
  
        // Timer properties
        this.duration = duration;
        this.onEndCallback = onEndCallback;
        this.interval = 10; // Update interval in milliseconds
        this.totalSteps = this.duration * (1000 / this.interval);
        this.step = 0;
        this.intervalId = null;
  
        // Color transitions
        this.startColor = { r: 0, g: 217, b: 67 }; // Green
        this.endColor = { r: 201, g: 2, b: 52 }; // Red
  
        // Initialize the circle
        this.progressCircle.style.strokeDasharray = this.circumference;
        this.reset();
    }
  
    lerpColor(start, end, t) {
        const r = Math.round(start.r + (end.r - start.r) * t);
        const g = Math.round(start.g + (end.g - start.g) * t);
        const b = Math.round(start.b + (end.b - start.b) * t);
        return `rgb(${r},${g},${b})`;
    }
  
    start() {
        if (this.intervalId) return; // Prevent multiple intervals
        this.intervalId = setInterval(() => {
            this.step++;
            const progress = this.step / this.totalSteps;
            const currentOffset = this.circumference - progress * this.circumference;
  
            this.progressCircle.style.strokeDashoffset = currentOffset;
            this.progressCircle.style.stroke = this.lerpColor(this.startColor, this.endColor, progress);
  
            const secondsLeft = Math.ceil((1 - progress) * this.duration);
            this.timerText.textContent = secondsLeft;
  
            if (this.step >= this.totalSteps) {
                this.stop();
                this.timerText.textContent = "0";
                if (this.onEndCallback) this.onEndCallback();
            }
        }, this.interval);
    }
  
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
  
    reset() {
        this.stop();
        this.step = 0;
        this.progressCircle.style.strokeDashoffset = 0;
        this.progressCircle.style.stroke = `rgb(${this.startColor.r},${this.startColor.g},${this.startColor.b})`;
        this.timerText.textContent = this.duration;
    }
}