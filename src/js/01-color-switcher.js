const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', handlerClickStart);
stopBtn.addEventListener('click', handlerClickStop);
stopBtn.disabled = true;

function handlerClickStart() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handlerClickStop() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
