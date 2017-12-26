import audioConfig from './audioConfig.js';

const keyCodeToAudio = getKeyCodeToAudio();
const keys = document.querySelectorAll('.key');

window.addEventListener('keydown', handleKeydown);
keys.forEach(key => {
  key.addEventListener('mousedown', handleMousedown);
  key.addEventListener('transitionend', handleTransitionend);
});

function getKeyCodeToAudio() {
  return audioConfig.reduce((keyCodeToAudio, config) => {
    keyCodeToAudio[config.keyCode] = new Audio(config.src);
    return keyCodeToAudio;
  }, {});
}

function handleKeydown(event) {
  if (isValidKeyCode(event.keyCode)) {
    playSound(event.keyCode);
    addTransitionStyles(event.keyCode);
  }
}

function handleMousedown(event) {
  const keyCode = +event.currentTarget.dataset.key;
  if (isValidKeyCode(keyCode)) {
    playSound(keyCode);
    addTransitionStyles(keyCode);
  }
}

function playSound(keyCode) {
  const audio = keyCodeToAudio[keyCode];
  audio.currentTime = 0;
  audio.play();
}

function addTransitionStyles(keyCode) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  key.classList.add('playing');
}

function handleTransitionend(event) {
  if (event.propertyName !== 'transform') {
    return;
  }
  this.classList.remove('playing');
}

function isValidKeyCode(keyCode) {
  return keyCodeToAudio[keyCode] != null;
}
