import audioConfig from './audioConfig.js';

const keyCodeToAudio = getKeyCodeToAudio();

window.addEventListener('keydown', handleKeydown);

function getKeyCodeToAudio() {
  return audioConfig.reduce((keyCodeToAudio, config) => {
    keyCodeToAudio[config.keyCode] = new Audio(config.src);
    return keyCodeToAudio;
  }, {});
}

function handleKeydown(event) {
  playSound(event.keyCode);
}

function playSound(keyCode) {
  const audio = keyCodeToAudio[keyCode];
  if (audio == null) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
}
