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
  const keyCode = event.keyCode;
  console.log(keyCode);
}
