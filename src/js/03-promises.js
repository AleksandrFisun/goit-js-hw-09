import Notiflix from 'notiflix';
const refs = {
  firstDelayInput: document.querySelector('.form [name=delay]'),
  stepDelayInput: document.querySelector('.form [name=step]'),
  amountInput: document.querySelector('.form [name=amount]'),
  formRef: document.querySelector('.form'),
  buttonFormCreatePromise: document.querySelector('button'),
};
refs.buttonFormCreatePromise.style.cursor = 'pointer';
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
  return promise;
}
function doPromises(data) {
  const amount = Number(refs.amountInput.value);
  const delay = Number(refs.firstDelayInput.value);
  const step = Number(refs.stepDelayInput.value);
  let currDelay = delay;
  for (let i = 0; i < amount; i++) {
    const promise = createPromise(i + 1, currDelay);
    promise
      .then(data => {
        const { position, delay } = data;
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(data => {
        const { position, delay } = data;
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    currDelay += step;
  }
}
function submitPromise(ev) {
  ev.preventDefault();
  const data = {
    form: ev.currentTarget,
  };
  doPromises(data);
}
refs.formRef.addEventListener('submit', submitPromise);
