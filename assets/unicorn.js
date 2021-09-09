var keyHit = [];
var recordedCode = "unicorns";

window.addEventListener("keyup", function (event) {
  keyHit.push(event.key);
  keyHit.splice(-recordedCode.length - 1, keyHit.length - recordedCode.length);
  console.log(keyHit);

  if (keyHit.join("").includes(recordedCode)) {
    cornify_add();
  }
  console.log(keyHit);
});
