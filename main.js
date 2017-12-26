import audioConfig from './audioConfig.js';

const keyCodeToAudio = getKeyCodeToAudio();

function getKeyCodeToAudio() {
  return audioConfig.reduce((keyCodeToAudio, config) => {
    keyCodeToAudio[config.keyCode] = new Audio(config.src);
    return keyCodeToAudio;
  }, {});
}
