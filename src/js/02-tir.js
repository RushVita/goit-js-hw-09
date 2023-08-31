import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

const elem = {
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  min: document.querySelector('span[data-minutes]'),
  sec: document.querySelector('span[data-seconds]'),
};

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

elem.startBtn.setAttribute('disabled', '');

const date = new Date();

const flatpickr = require('flatpickr');
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates, dateStr, instance) {
    if (selectedDates[0].getTime() > date.getTime()) {
      elem.startBtn.disabled = false;
      elem.startBtn.addEventListener('click', handlerClick);

      function handlerClick(evt) {
        elem.startBtn.disabled = true;
        const timerID = setInterval(() => {
          const newDate = new Date();
          let ms = selectedDates[0].getTime() - newDate.getTime();
          if (selectedDates[0].getTime() < newDate.getTime()) {
            return;
          }
          mathTime(ms);
        }, 1000);
      }
    }
  },
  onChange(selectedDates) {
    if (selectedDates[0].getTime() < date.getTime()) {
      elem.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      if (JSON.parse(localStorage.getItem('Timer')) > date.getTime) {
        destroy();
      }
    }
  },
});

function mathTime(value) {
  elem.days.textContent = addLeadingZero(convertMs(value).days);
  elem.hours.textContent = addLeadingZero(convertMs(value).hours);
  elem.min.textContent = addLeadingZero(convertMs(value).minutes);
  elem.sec.textContent = addLeadingZero(convertMs(value).seconds);
}
