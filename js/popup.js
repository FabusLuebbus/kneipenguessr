// Function to show the pop-up
export function showPopup(title, message, score) {
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup-score").textContent = score;

  // Show the pop-up
  popup.classList.remove("hidden", "hide");
  popup.classList.add("show");
}

// Function to hide the pop-up
export function hidePopup() {
  popup.classList.remove("show");
  popup.classList.add("hide");

  // Wait for the animation to finish before adding the `hidden` class
  popup.addEventListener(
    "animationend",
    () => {
      if (popup.classList.contains("hide")) {
        popup.classList.add("hidden");
      }
    },
    { once: true },
  );
}
