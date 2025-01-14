const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate a random number between min and max
const random = (min, max) => Math.random() * (max - min) + min;

// ConfettiParticle class to define individual particle properties and behavior
class ConfettiParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(3, 7); // Size of the particle
    this.speedX = random(-10, 10); // Horizontal speed
    this.speedY = random(-7, -20); // Initial vertical speed
    this.gravity = 0.15; // Downward acceleration
    this.maxSpeedY = 5; // Maximum downward speed
    this.rotation = random(0, 360); // Initial rotation angle
    this.rotationSpeed = random(-2, 2); // Speed of rotation
    this.opacity = 1; // Initial opacity
    this.fadeRate = random(0.003, 0.005); // Rate at which particle fades out
    this.color = `hsl(${random(0, 360)}, 100%, 70%)`; // Randomized color
  }

  // Update particle properties for each animation frame
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity; // Apply gravity to vertical speed
    this.rotation += this.rotationSpeed;
    this.opacity -= this.fadeRate; // Gradually decrease opacity

    if (this.opacity < 0) this.opacity = 0; // Ensure opacity does not go negative
  }

  // Draw the particle on the canvas
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }

  // Check if the particle is still visible (opacity > 0)
  isVisible() {
    return this.opacity > 0;
  }
}

// Array to store active confetti particles
const confettiParticles = [];

// Launch confetti particles from a central point
export const launchConfetti = () => {
  const originX = canvas.width / 2;
  const originY = canvas.height;

  for (let i = 0; i < 500; i++) {
    confettiParticles.push(new ConfettiParticle(originX, originY));
  }
};

// Animation loop to update and render particles
export const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const particle = confettiParticles[i];
    particle.update();
    particle.draw();

    // Remove particles that are no longer visible
    if (!particle.isVisible()) {
      confettiParticles.splice(i, 1);
    }
  }

  // Continue animation if particles remain
  if (confettiParticles.length > 0) {
    requestAnimationFrame(animate);
  }
};

// Adjust canvas size when the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
