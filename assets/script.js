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

    //   var wavesurfer = WaveSurfer.create({
    //     container: '#waveform'
    // });

    // wavesurfer.on('keydown', function (){
    //     wavesurfer.play();
    // })