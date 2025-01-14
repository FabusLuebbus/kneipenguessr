export class CountdownTimer {
  constructor(containerId, duration, onEndCallback) {
    const radius = 54; // Radius of the circular progress indicator
    this.circumference = 2 * Math.PI * radius; // Calculate the circle's circumference

    // Select elements within the specified container
    const container = document.getElementById(containerId);
    this.progressCircle = container.querySelector(".ring-progress");
    this.timerText = container.querySelector(".timer-text");

    // Initialize timer properties
    this.duration = duration; // Total duration of the countdown in seconds
    this.onEndCallback = onEndCallback; // Callback to execute when timer ends
    this.interval = 10; // Timer update interval in milliseconds
    this.totalSteps = this.duration * (1000 / this.interval); // Total number of steps in the countdown
    this.step = 0; // Current step of the countdown
    this.intervalId = null; // ID for the interval timer

    // Colors for the progress circle, transitioning from start to end
    this.startColor = { r: 0, g: 217, b: 67 }; // Start color (green)
    this.endColor = { r: 201, g: 2, b: 52 }; // End color (red)

    // Set up the progress circle's appearance
    this.progressCircle.style.strokeDasharray = this.circumference;

    // Reset the timer to its initial state
    this.reset();
  }

  /**
   * Linearly interpolate between two colors based on a progress value.
   * @param {Object} start - Start color as an RGB object.
   * @param {Object} end - End color as an RGB object.
   * @param {number} t - Progress value between 0 and 1.
   * @returns {string} Interpolated color in RGB format.
   */
  lerpColor(start, end, t) {
    const r = Math.round(start.r + (end.r - start.r) * t);
    const g = Math.round(start.g + (end.g - start.g) * t);
    const b = Math.round(start.b + (end.b - start.b) * t);
    return `rgb(${r},${g},${b})`;
  }

  /**
   * Start the countdown timer.
   * Updates the progress circle and text at each interval.
   */
  start() {
    if (this.intervalId) return; // Prevent starting if already running

    this.intervalId = setInterval(() => {
      this.step++;
      const progress = this.step / this.totalSteps;
      const currentOffset = this.circumference - progress * this.circumference;

      // Update progress circle and text
      this.progressCircle.style.strokeDashoffset = currentOffset;
      this.progressCircle.style.stroke = this.lerpColor(
        this.startColor,
        this.endColor,
        progress,
      );

      const secondsLeft = Math.ceil((1 - progress) * this.duration);
      this.timerText.textContent = secondsLeft;

      // Check if the countdown has finished
      if (this.step >= this.totalSteps) {
        this.stop();
        this.timerText.textContent = "0"; // Ensure text shows "0" at the end
        if (this.onEndCallback) this.onEndCallback(); // Trigger the callback if provided
      }
    }, this.interval);
  }

  /**
   * Stop the countdown timer.
   * Clears the interval and halts updates.
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Reset the timer to its initial state.
   * Stops any running countdown and restores default values.
   */
  reset() {
    this.stop();
    this.step = 0;
    this.progressCircle.style.strokeDashoffset = 0;
    this.progressCircle.style.stroke = `rgb(${this.startColor.r},${this.startColor.g},${this.startColor.b})`;
    this.timerText.textContent = this.duration;
  }
}
