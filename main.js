import audioConfig from './audioConfig.js';

const keyCodeToAudio = getKeyCodeToAudio();
const keys = document.querySelectorAll('.key');

window.addEventListener('keydown', handleKeydown);
keys.forEach(key => key.addEventListener('transitionend', handleTransitionend));

function getKeyCodeToAudio() {
  return audioConfig.reduce((keyCodeToAudio, config) => {
    keyCodeToAudio[config.keyCode] = new Audio(config.src);
    return keyCodeToAudio;
  }, {});
}

function handleKeydown(event) {
  playSound(event.keyCode);
  addTransitionStyles(event.keyCode);
}

function playSound(keyCode) {
  const audio = keyCodeToAudio[keyCode];
  if (audio == null) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
}

function addTransitionStyles(keyCode) {
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (key == null) {
    return;
  }
  key.classList.add('playing');
}

function handleTransitionend(event) {
  if (event.propertyName !== 'transform') {
    return;
  }
  this.classList.remove('playing');
}
