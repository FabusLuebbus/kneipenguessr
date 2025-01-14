import {
  getUserLocation,
  getDistanceFromLatLonInKm,
} from "./location_logic.js";
import { Queue } from "./queue.js";
import { CountdownTimer } from "./countdown_timer.js";
import { launchConfetti, animate } from "./confetti.js";
import { barData } from "./bar_data.js";
import { showPopup, hidePopup } from "./popup.js";

let chosenBarName;
let closestBar;

/**
 * Handles the user's choice of a bar, updating the game state accordingly.
 * @param {HTMLElement} chosenBar - The DOM element representing the chosen bar.
 */
function chooseBar(chosenBar) {
  chosenBarName = chosenBar.querySelector(".bar_name").textContent;
  closestBar = bar1.distance < bar2.distance ? bar1 : bar2;

  if (chosenBarName === closestBar.name) {
    loadNextBar(closestBar);
    score++;
  } else {
    showGameOver("Wrong choice! Better luck next time.");
  }
}
window.chooseBar = chooseBar;

/**
 * Loads the next set of bars to be displayed and updates the DOM.
 * @param {Object} closestBar - The bar object representing the closest bar.
 */
function loadNextBar(closestBar) {
  if (bars.isEmpty) {
    showGameWon();
    return;
  }

  bar1 = closestBar;
  bar2 = bars.dequeue();

  // Update the DOM with new bar details
  document.getElementById("bar1").querySelector(".bar_name").innerText =
    bar1.name;
  document.getElementById("bar2").querySelector(".bar_name").innerText =
    bar2.name;
  document.getElementById("bar1").querySelector(".bar_distance").innerText =
    bar1.distance.toFixed(2) + " km";
  document.getElementById("bar2").querySelector(".bar_distance").innerText =
    bar2.distance.toFixed(2) + " km";

  countdown.reset();
  countdown.start();
}

/**
 * Displays the "Game Over" popup with a specified reason.
 * @param {string} reason - The reason for game over.
 */
function showGameOver(reason) {
  showPopup("Game Over", reason, score);
  countdown.stop();
}

/**
 * Displays the "Game Won" popup and triggers celebratory animations.
 */
function showGameWon() {
  countdown.stop();
  launchConfetti();
  animate();
  showPopup("Congratulations!", "You've completed all the bars.", score);
}

/**
 * Toggles visibility of bar distances based on the "Easy Mode" setting.
 * @param {boolean} checked - Whether "Easy Mode" is enabled.
 */
function setEasyMode(checked) {
  const elements = Array.from(document.getElementsByClassName("bar_distance"));
  elements.forEach((element) => {
    if (checked) {
      element.classList.remove("hidden_bar_dist");
    } else {
      element.classList.add("hidden_bar_dist");
    }
  });
}
window.setEasyMode = setEasyMode;

let barsArray;
let bars;
let bar1;
let bar2;
let score;
let countdown;

/**
 * Initializes the game by loading and shuffling bar data, and setting up the first round.
 */
async function initializeGame() {
  barsArray = shuffleArray(
    barData.map((bar) => ({
      name: bar.name,
      distance: getDistanceFromLatLonInKm(
        userLatitude,
        userLongitude,
        bar.coordinates.latitude,
        bar.coordinates.longitude
      ),
    }))
  );

  bars = new Queue();
  barsArray.forEach((bar) => bars.enqueue(bar));

  bar1 = bars.dequeue();
  bar2 = bars.dequeue();
  score = 0;

  // Load initial bar details into the DOM
  document.getElementById("bar1").querySelector(".bar_name").innerText =
    bar1.name;
  document.getElementById("bar2").querySelector(".bar_name").innerText =
    bar2.name;
  document.getElementById("bar1").querySelector(".bar_distance").innerText =
    bar1.distance.toFixed(2) + " km";
  document.getElementById("bar2").querySelector(".bar_distance").innerText =
    bar2.distance.toFixed(2) + " km";

  countdown = new CountdownTimer("timer1", 10, () =>
    showGameOver("Time's up!")
  );
  countdown.start();
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let userLatitude;
let userLongitude;

// Obtain user's location and start the game
getUserLocation().then((location) => {
  userLatitude = location.latitude;
  userLongitude = location.longitude;
  initializeGame();
});
