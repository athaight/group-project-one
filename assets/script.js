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
  keys.classList.add("playing");
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

const play = document.querySelector(".play-button");
const record = document.querySelector(".record-button");
const musicA = document.getElementsByTagName("audio")[0];
const audioArr = document.querySelectorAll("audio");
// const ac = new AudioContext();

//event listener to when record button is pressed fires recordSound
record.addEventListener("click", recordSound);

function recordSound() {
  const ac = new AudioContext();

  // The media element source stops audio playout of the audio element.
  // Hook it up to speakers again.

  // TODO HELP TUCKER
  const sourceA = ac.createMediaElementSource(audioArr[0]);
  const sourceS = ac.createMediaElementSource(audioArr[1]);
  const sourceD = ac.createMediaElementSource(audioArr[2]);
  const sourceF = ac.createMediaElementSource(audioArr[3]);
  const sourceG = ac.createMediaElementSource(audioArr[4]);
  const sourceH = ac.createMediaElementSource(audioArr[5]);
  const sourceJ = ac.createMediaElementSource(audioArr[6]);
  const sourceK = ac.createMediaElementSource(audioArr[7]);
  const sourceL = ac.createMediaElementSource(audioArr[8]);

  sourceA.connect(ac.destination);
  sourceS.connect(ac.destination);
  sourceD.connect(ac.destination);
  sourceF.connect(ac.destination);
  sourceG.connect(ac.destination);
  sourceH.connect(ac.destination);
  sourceJ.connect(ac.destination);
  sourceK.connect(ac.destination);
  sourceL.connect(ac.destination);

  // Hook up the audio element to a MediaStream.
  const dest = ac.createMediaStreamDestination();
  sourceA.connect(dest);
  sourceS.connect(dest);
  sourceD.connect(dest);
  sourceF.connect(dest);
  sourceG.connect(dest);
  sourceH.connect(dest);
  sourceJ.connect(dest);
  sourceK.connect(dest);
  sourceL.connect(dest);

  // Record 10s of audio with MediaRecorder.
  const recorder = new MediaRecorder(dest.stream);
  recorder.start();
  recorder.ondataavailable = (ev) => {
    console.info("Finished recording. Got blob:", ev.data);
    // chunks.push(ev.data)
    // when play button is pressed plays back the blob
    play.addEventListener("click", playSound);
    function playSound() {
      musicA.src = URL.createObjectURL(ev.data);
      musicA.play();
    }
  };
  setTimeout(() => recorder.stop(), 10 * 1000);

  // console.log(recorder)
  // console.log(ac.state)
  // console.log(dest)
}
