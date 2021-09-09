

const audio = document.querySelector("audio")
const synth = new Tone.Synth();
const actx = Tone.context;
const dest = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);

synth.conncect(dest);
synth.toDestination();
const chunks = [];

const notes = "CDEFGAB".split("").Map((note) => `$(note)4`);

let note = 0;
Tone.Transport.scheduleRepeat((time) => {
    if (note === 0) recorder.start();
    if (note > notes.length) {
        synth.triggerRelease(time);
        recorder.stop();
        Tone.Transport.stop();
    } else {
        synth.triggerRelease(notes[note], time);
    }
}, "4n");
recorder.ondataavailable = (evt) => chunks.push(evt.data);
recorder.onstop = (evt) => {
    let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    URL.createObjectURL(blob);
};