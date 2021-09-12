// Create a whitelist of characters that can be pressed by the user;
const whitelist = "asdfghjkl";

// utiltiy function to check if key was valid
function isValidKey(key) {
  return whitelist.includes(key);
}

// Select all keys on the page and register event listener for transitionend
const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

const play = document.querySelector(".play-button");
const record = document.querySelector(".record-button");
const newMusic = document.querySelector("#newMusic");
const audioContainer = document.querySelector("#audio-container");

// Fetching all of our samples from our freesound API
// creating an audio element for each
// appending it to the page
const sampleIds = [
  241385, 558220, 264601, 171104, 41155, 58457, 38709, 469668, 509668,
];
const token = "G7NpkqsZGywcgcgVbG72LcRz5dSDyMqqsDKf2Lew";
const requests = sampleIds.map(async (id) =>
  (
    await fetch(`https://freesound.org/apiv2/sounds/${id}/?token=${token}`)
  ).json()
);
Promise.all(requests).then(function (samples) {
  console.log(samples);
  samples.forEach(function (sample, i) {
    const audio = document.createElement("audio");
    audio.setAttribute("data-key", whitelist[i]);
    audio.setAttribute("src", sample.previews["preview-hq-mp3"]);
    audio.crossOrigin = "anonymous";
    audioContainer.append(audio);
  });
});

// utility function to add animation to key elements
function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function recordSound() {
  const ac = new AudioContext();
  const dest = ac.createMediaStreamDestination();
  const audioArr = document.querySelectorAll("audio");
  record.classList.remove("bg-pink-400")
  record.classList.add("bg-blue-400")
  // The media element source stops audio playout of the audio element.
  // Hook it up to speakers again.

  audioArr.forEach(function (audio) {
    const source = ac.createMediaElementSource(audio);

    source.connect(ac.destination);
    source.connect(dest);
  });

  // Record 10s of audio with MediaRecorder.
  const recorder = new MediaRecorder(dest.stream);
  recorder.start();
  recorder.ondataavailable = (ev) => {
    console.info("Finished recording. Got blob:", ev.data);
    newMusic.src = URL.createObjectURL(ev.data);
    // when play button is pressed plays back the blob
    play.addEventListener("click", playSound);
    function playSound() {
      newMusic.play();
    }

    const musicDownload = document.createElement("a");
    musicDownload.href = newMusic.src;
    musicDownload.download = "";
    // musicDownload.click()
    document.querySelector("#saveLi").textContent = "Saved";
    document.querySelector("#saveLi").append(musicDownload);
  };
  setTimeout(() => {
    record.classList.add("bg-pink-400")
    record.classList.remove("bg-blue-400")
    recorder.stop()
  }, 10 * 1000
  );
}

// Add event listener for all keydown events in the browser
window.addEventListener("keydown", function (event) {
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
});

// Add event listener for all keydown events in the browser
window.addEventListener("keyup", function (event) {
  // If key is not valid return
  if (!isValidKey(event.key)) return;
});

//event listener to when record button is pressed fires recordSound
record.addEventListener("click", recordSound);

// Returns a list of sounds with id's
// https://freesound.org/apiv2/search/text/?token=G7NpkqsZGywcgcgVbG72LcRz5dSDyMqqsDKf2Lew&query=drum&filter=duration:1
