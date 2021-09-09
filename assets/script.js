// Create a whitelist of characters that can be pressed by the user;
const whitelist = "asdfghjkl";

// create a recording array to keep track of all key presses
const recording = [];

// utiltiy function to check if key was valid
function isValidKey(key) {
  return whitelist.includes(key);
}

// Add event listener for all keydown events in the browser
window.addEventListener("keydown", function (event) {
  console.log(event.key);
  // If key is not valid return
  if (!isValidKey(event.key)) return;

  // Select the audio element based off the keycode that was pressed
  const audio = document.querySelector(`audio[data-key="${event.key}"]`);
  // find the html element on the page to add classes to
  const key = document.querySelector(`.key[data-key="${event.key}"]`);
  // Tells the audio file at which time it should start playing
  // https://www.w3schools.com/tags/av_prop_currenttime.asp
  audio.currentTime = 0;
  // Tell the audio element to play in the browser
  audio.play();
  // Add styling to the selected key
  key.classList.add("playing");

  // record the key that was pressed
  // check to see if there is a delay in the recording
  if (recording[recording.length - 1]?.type === "delay") {
    // if so set end time
    recording[recording.length - 1].end = event.timeStamp;
  }

  // set an end time
  recording.push({
    type: "keypress",
    key: event.key,
  });
  // push a delay object with start time set
  recording.push({
    type: "delay",
    start: event.timeStamp,
  });
});

// Add event listener for all keydown events in the browser
window.addEventListener("keyup", function (event) {
  // If key is not valid return
  if (!isValidKey(event.key)) return;
});

// utility function to add animation to key elements
function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("playing");
}

// Select all keys on the page and register event listener for transitionend
const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

// Start playing our recorded audio
function start() {
  console.log("Starting...");
  // play our recording starting at index 0
  playRecord(0);
}

function playRecord(index) {
  // exit condition: we are the end of our array
  if (index === recording.length - 1) return;

  // play the audio associated with the key stored in the current index of our array
  const key = recording[index].key;
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  audio.play();

  index++;
  const delay = recording[index].end - recording[index].start;

  // wait the delayed time
  setTimeout(function () {
    // move onto the next key in the array
    playRecord(++index);
  }, delay);
}

function record() {
  console.log("Starting...");
}

// document.querySelector(".record-button").addEventListener("click", record);
document.querySelector(".play-button").addEventListener("click", start);
document.querySelector(".stop-button").addEventListener("click", stop);
