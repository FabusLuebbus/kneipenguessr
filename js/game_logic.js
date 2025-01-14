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

function loadNextBar(closestBar) {
  if (bars.isEmpty) {
    showGameWon();
    return;
  }

  bar1 = closestBar;
  bar2 = bars.dequeue();

  // Update the DOM
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

function showGameOver(reason) {
  showPopup("Game Over", reason, score);
  countdown.stop();
}

function showGameWon() {
  countdown.stop();
  launchConfetti();
  animate();
  showPopup("Congratulations!", "You've completed all the bars.", score);
}

function setEasyMode(checked) {
  //get all elements with class bar_distance
  var elements = Array.from(document.getElementsByClassName("bar_distance"));
  if (checked) {
    elements.map((element) => element.classList.remove("hidden_bar_dist"));
  } else {
    elements.map((element) => element.classList.add("hidden_bar_dist"));
  }
}
window.setEasyMode = setEasyMode;
let barsArray;
let bars;
let bar1;
let bar2;
let score;
let countdown;

// Function to load and shuffle bars from bars.json
async function initializeGame() {
  barsArray = shuffleArray(
    barData.map((bar) => ({
      name: bar.name,
      distance: getDistanceFromLatLonInKm(
        userLatitude,
        userLongitude,
        bar.coordinates.latitude,
        bar.coordinates.longitude,
      ),
    })),
  );

  bars = new Queue();
  barsArray.forEach((bar) => bars.enqueue(bar));

  bar1 = bars.dequeue();
  bar2 = bars.dequeue();

  score = 0;

  //load initial bars
  document.getElementById("bar1").querySelector(".bar_name").innerText =
    bar1.name;
  document.getElementById("bar2").querySelector(".bar_name").innerText =
    bar2.name;
  document.getElementById("bar1").querySelector(".bar_distance").innerText =
    bar1.distance.toFixed(2) + " km";
  document.getElementById("bar2").querySelector(".bar_distance").innerText =
    bar2.distance.toFixed(2) + " km";
  countdown = new CountdownTimer("timer1", 10, () =>
    showGameOver("Time's up!"),
  );
  countdown.start();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let userLatitude;
let userLongitude;

getUserLocation().then((location) => {
  userLatitude = location.latitude;
  userLongitude = location.longitude;
  initializeGame();
});
