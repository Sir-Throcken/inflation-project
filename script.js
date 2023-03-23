'use strict';

const yearPrevious = document.querySelector('.year-previous');
const yearNext = document.querySelector('.year-next');
const entryValue = document.querySelector('.entry-value');
const btnCalculate = document.querySelector('.calc');

const inflationValueDisplay = document.querySelector('.inflation-value');
const presentValueDisplay = document.querySelector('.present-value');

function init() {
  inflationValueDisplay.textContent = '';
  presentValueDisplay.textContent = '';
}

const inflationBase = [
  0.055, 0.019, 0.008, 0.035, 0.021, 0.01, 0.025, 0.042, 0.035, 0.026, 0.043,
  0.037, 0.009, 0.0, -0.009, -0.006, 0.02, 0.016, 0.023, 0.034, 0.051, 0.144,
];

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
  document.querySelector('.message').classList.remove('hidden');
};

init();
// Button Calculate
btnCalculate.addEventListener('click', function () {
  // changing input from strings into number
  const yearPreviousNum = Number(yearPrevious.value);
  const yearNextNum = Number(yearNext.value);
  const entryValueNum = Number(entryValue.value);

  const yearDiffer = yearNextNum - yearPreviousNum;

  // No input
  if (!yearPreviousNum || !yearNextNum || !entryValueNum) {
    displayMessage('missing input');

    //Second year is before the first year
  } else if (yearNextNum < yearPreviousNum) {
    displayMessage('second year must be later than the first');

    //years values are not between range 2001 - 2022
  } else if (
    yearPreviousNum < 2001 ||
    yearPreviousNum > 2022 ||
    yearNextNum < 2001 ||
    yearNextNum > 2022
  ) {
    displayMessage('enter year between 2001 - 2022');
  } else {
    document.querySelector('.message').classList.add('hidden');
    const iterations = [];
    iterations.push(
      entryValueNum / (1 + inflationBase[yearPreviousNum - 2001])
    );
    for (let i = 0; i < yearDiffer; i++) {
      iterations.push(
        iterations[i] / (1 + inflationBase[yearPreviousNum - 2001 + i + 1])
      );
    }
    const presentValue = iterations[yearDiffer];
    presentValueDisplay.textContent = presentValue.toFixed(2);
    const inflationNew = (entryValueNum / iterations[yearDiffer] - 1) * 100;
    inflationValueDisplay.textContent = inflationNew.toFixed(2);
  }
});
