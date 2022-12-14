import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  inputTextDate: document.querySelector('input#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

clearNumberCalendar();
const currentTime = Date.now();
let timerId = null;
let dateInInput = '';
refs.buttonStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      clearNumberCalendar();
      clearInterval(timerId);
      refs.buttonStart.disabled = true;
      return;
    }
    refs.buttonStart.disabled = false;
    dateInInput = selectedDates[0];
  },
  onChange() {
    if (timerId !== null) {
      clearNumberCalendar();
    }
    clearInterval(timerId);
    return;
  },
};
function buttonActiveStartTimer() {
  refs.buttonStart.disabled = true;
  timerId = setInterval(() => {
    const scienceTime = Date.now();
    const { days, hours, minutes, seconds } = convertMs(
      dateInInput - scienceTime
    );
    timerDate({ days, hours, minutes, seconds });
    if (scienceTime >= dateInInput) {
      clearNumberCalendar();
      clearInterval(timerId);
      return;
    }
  }, 1000);
}
function clearNumberCalendar() {
  timerDate({ days: '00', hours: '00', minutes: '00', seconds: '00' });
}
function timerDate({ days, hours, minutes, seconds }) {
  refs.spanDays.textContent = days;
  refs.spanHours.textContent = hours;
  refs.spanMinutes.textContent = minutes;
  refs.spanSeconds.textContent = seconds;
}
function pad(value) {
  return String(value).padStart(2, '0');
}
refs.buttonStart.addEventListener('click', buttonActiveStartTimer);
const flatpickrRef = flatpickr(refs.inputTextDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
