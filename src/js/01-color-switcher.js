const refs = {
  buttonStartRef: document.querySelector('button[data-start]'),
  buttonStopRef: document.querySelector('button[data-stop]'),
};
buttonDefault();
let timerId = null;
// Вешаем disabled на кнопку и через setInterval запускаем каждую 1 секунду
// рандом цвета на боди
function randomBodyColorStart() {
  refs.buttonStopRef.disabled = false;
  refs.buttonStartRef.disabled = true;
  buttonCursor();
  timerId = setInterval(() => {
    let colorRandom = getRandomHexColor();
    document.body.style.backgroundColor = colorRandom;
  }, 1000);
}
// Снимаем disabled с кнопки старт, чистим таймер.
function randomBodyColorStop() {
  refs.buttonStopRef.disabled = true;
  refs.buttonStartRef.disabled = false;
  buttonCursor();
  clearInterval(timerId);
}
function buttonDefault() {
  refs.buttonStartRef.disabled = false;
  refs.buttonStopRef.disabled = true;
  buttonCursor();
}
function buttonCursor() {
  if (refs.buttonStartRef.disabled === false) {
    refs.buttonStartRef.style.cursor = 'pointer';
  } else {
    refs.buttonStartRef.style.cursor = 'not-allowed';
  }
  if (refs.buttonStopRef.disabled === true) {
    refs.buttonStopRef.style.cursor = 'not-allowed';
  } else {
    refs.buttonStopRef.style.cursor = 'pointer';
  }
}
// Random
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
refs.buttonStartRef.addEventListener('click', randomBodyColorStart);
refs.buttonStopRef.addEventListener('click', randomBodyColorStop);
