const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Helper functions
const random = (min, max) => Math.random() * (max - min) + min;

// Particle Class
class ConfettiParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(3, 7);
    this.speedX = random(-10, 10); // Reduced horizontal spread for slower movement
    this.speedY = random(-7, -20); // Increased negative value for higher fly
    this.gravity = 0.15; // Reduced gravity for slower fall
    this.maxSpeedY = 5; // Reduced max speed for slower fall
    this.rotation = random(0, 360);
    this.rotationSpeed = random(-2, 2); // Slower rotation speed
    this.opacity = 1;
    this.fadeRate = random(0.003, 0.005); // Slower fade-out rate
    this.color = `hsl(${random(0, 360)}, 100%, 70%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.rotation += this.rotationSpeed;
    this.opacity -= this.fadeRate;

    if (this.opacity < 0) this.opacity = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }

  isVisible() {
    return this.opacity > 0;
  }
}

// Create confetti particles
const confettiParticles = [];
export const launchConfetti = () => {
  const originX = canvas.width / 2;
  const originY = canvas.height;

  for (let i = 0; i < 500; i++) {
    confettiParticles.push(new ConfettiParticle(originX, originY));
  }
};

// Animation loop
export const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const particle = confettiParticles[i];
    particle.update();
    particle.draw();

    // Remove invisible particles
    if (!particle.isVisible()) {
      confettiParticles.splice(i, 1);
    }
  }

  // Continue animation if particles remain
  if (confettiParticles.length > 0) {
    requestAnimationFrame(animate);
  }
};

// Handle window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
