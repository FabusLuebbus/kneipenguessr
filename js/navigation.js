document.addEventListener('DOMContentLoaded', () => {
    // Apply fade-in effect on page load
    document.body.classList.remove('fade-out');

    document.body.classList.add('fade-in');
    document.body.classList.remove('hidden');

});

// Centralized navigation logic
function navigateTo(page) {
    document.body.classList.remove('fade-in'); // Remove fade-in if present
    document.body.classList.add('fade-out');
        
    // Wait for the animation to finish before navigating
    setTimeout(() => {
        window.location.href = `../html/${page}.html`;
    }, 200); // 
    
}

// Event listeners for buttons (if IDs are consistent across pages)
document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.getElementById("home_button");
    const rulesButton = document.getElementById("rules_button");
    const playButton = document.getElementById("play_button");
    const mainHeader = document.getElementById("main_header");

    if (homeButton) {
        homeButton.addEventListener("click", () => navigateTo("home_page"));
    }

    if (rulesButton) {
        rulesButton.addEventListener("click", () => navigateTo("rules_page"));
    }

    if (playButton) {
        playButton.addEventListener("click", () => navigateTo("game_page"));
    }

    if (mainHeader) {
        mainHeader.addEventListener("click", () => navigateTo("home_page"));
    }
});
