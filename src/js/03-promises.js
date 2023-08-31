import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

function createPromise(position, delay) {
  const promis = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
  return promis;
}

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let sum = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, sum)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    sum += Number(step.value);
  }
}
