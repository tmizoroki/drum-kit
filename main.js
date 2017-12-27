import keyCodeToAudio from './audioConfig.js';

initializeEventListeners();

function initializeEventListeners() {
  window.addEventListener('keydown', handlePlayEvent);

  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    key.addEventListener('mousedown', handlePlayEvent);
    key.addEventListener('transitionend', handleTransitionend);
  });
}

function handlePlayEvent(event) {
  const keyCode = getKeyCodeFromEvent(event);
  if (keyCodeToAudio[keyCode] == null) {
    return;
  }
  playSound(keyCode);
  addPlayingClass(keyCode);
}

function handleTransitionend(event) {
  if (event.propertyName !== 'transform') {
    return;
  }
  this.classList.remove('playing');
}

function getKeyCodeFromEvent(event) {
  switch (event.type) {
    case 'keydown':
      return event.keyCode;
    case 'mousedown':
      return +event.currentTarget.dataset.key;
  }
}

function playSound(keyCode) {
  const audio = keyCodeToAudio[keyCode];
  audio.currentTime = 0;
  audio.play();
}

function addPlayingClass(keyCode) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  key.classList.add('playing');
}
