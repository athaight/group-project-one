window.addEventListener('keydown', function (event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    if(!audio) return;
    audio.currentTime= 0;
    audio.play();
    key.classList.add('playing');
});
    
function removeTransition(event){
    if (event.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));


var keyHit = [];
      var recordedCode = "unicorns";

      window.addEventListener('keyup', function(event) {
          console.log(event.key)
          keyHit.push(event.key);
          keyHit.splice(-recordedCode.length - 1, keyHit.length - recordedCode.length);
          console.log(keyHit)

          if (keyHit.join('').includes(recordedCode)){
              cornify_add();
          }
          console.log(keyHit);
      });   

document.querySelector('.play-button').addEventListener('click', start);
document.querySelector('.stop-button').addEventListener('click', stop);


console.clear();

// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load some sound
const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.tape-controls-play');

// play pause audio
playButton.addEventListener('click', function() {
	
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	
	if (this.dataset.playing === 'false') {
		audioElement.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		this.dataset.playing = 'false';
	}
	
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);

// if track ends
audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );
}, false);

// volume
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
}, false);

// panning
const pannerOptions = {pan: 0};
const panner = new StereoPannerNode(audioCtx, pannerOptions);

const pannerControl = document.querySelector('[data-action="panner"]');
pannerControl.addEventListener('input', function() {
	panner.pan.value = this.value;	
}, false);

// connect our graph
track.connect(gainNode).connect(panner).connect(audioCtx.destination);

const powerButton = document.querySelector('.control-power');

powerButton.addEventListener('click', function() {
	if (this.dataset.power === 'on') {
		audioCtx.suspend();
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		audioCtx.resume();
		this.dataset.power = 'on';
	}
	this.setAttribute( "aria-checked", state ? "false" : "true" );
	console.log(audioCtx.state);
}, false);

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons 





    //   var wavesurfer = WaveSurfer.create({
    //     container: '#waveform'
    // });

    // wavesurfer.on('keydown', function (){
    //     wavesurfer.play();
    // })