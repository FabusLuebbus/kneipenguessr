document.addEventListener("DOMContentLoaded", () => {
  // Ensure the page starts with a fade-in effect for better user experience
  document.body.classList.remove("fade-out");
  document.body.classList.add("fade-in");
  document.body.classList.remove("hidden");
});

// Handles navigation to a specified page with fade-out animation
function navigateTo(page) {
  document.body.classList.remove("fade-in");
  document.body.classList.add("fade-out");

  // Navigate to the specified page after the fade-out animation completes
  setTimeout(() => {
    window.location.href = `../html/${page}.html`;
  }, 200);
}

// Sets up event listeners for navigation buttons
document.addEventListener("DOMContentLoaded", () => {
  const homeButton = document.getElementById("home_button");
  const rulesButton = document.getElementById("rules_button");
  const playButton = document.getElementById("play_button");
  const header = document.getElementById("header_content");

  // Attach navigation logic to buttons if they exist
  if (homeButton) {
    homeButton.addEventListener("click", () => navigateTo("home_page"));
  }

  if (rulesButton) {
    rulesButton.addEventListener("click", () => navigateTo("rules_page"));
  }

  if (playButton) {
    playButton.addEventListener("click", () => navigateTo("game_page"));
  }

  // Navigate to the home page when the header is clicked
  if (header) {
    header.addEventListener("click", () => navigateTo("home_page"));
  }
});
