// Function to display the pop-up with provided title, message, and score
export function showPopup(title, message, score) {
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup-score").textContent = score;

  // Update the pop-up visibility classes to make it visible
  popup.classList.remove("hidden", "hide");
  popup.classList.add("show");
}

// Function to hide the pop-up
export function hidePopup() {
  // Update the pop-up visibility classes to initiate hiding
  popup.classList.remove("show");
  popup.classList.add("hide");

  // Ensure the `hidden` class is added after the hide animation completes
  popup.addEventListener(
    "animationend",
    () => {
      if (popup.classList.contains("hide")) {
        popup.classList.add("hidden");
      }
    },
    { once: true }, // Listener will execute once and then be removed
  );
}
