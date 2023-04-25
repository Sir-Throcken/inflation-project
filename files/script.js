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

const displayMessage = function (message) {
  2001;
  document.querySelector('.message').textContent = message;
  document.querySelector('.message').classList.remove('hidden');
};

const inflationBase = {
  2001: 0.055,
  2002: 0.019,
  2003: 0.008,
  2004: 0.035,
  2005: 0.021,
  2006: 0.01,
  2007: 0.025,
  2008: 0.042,
  2009: 0.035,
  2010: 0.026,
  2011: 0.043,
  2012: 0.037,
  2013: 0.009,
  2014: 0.0,
  2015: -0.009,
  2016: -0.006,
  2017: 0.02,
  2018: 0.016,
  2019: 0.023,
  2020: 0.034,
  2021: 0.051,
  2022: 0.144,
};

// Create arrays of property names
const inflationBaseProperties = Object.keys(inflationBase);

//Create an array of numbers from property names
let inflationBaseYears = [];

for (let i = 0; i < inflationBaseProperties.length; i++) {
  inflationBaseYears.push(
    Number(inflationBaseProperties[i].replace(/[^0-9]/g, ''))
  );
}

// Find earlist and latest year from an array
let earliestYear = inflationBaseYears[0];
let latestYear = inflationBaseYears[0];

for (let i = 1; i < inflationBaseYears.length; i++) {
  if (inflationBaseYears[i] < earliestYear)
    earliestYear = inflationBaseYears[i];
}

for (let i = 1; i < inflationBaseYears.length; i++) {
  if (inflationBaseYears[i] > latestYear) latestYear = inflationBaseYears[i];
}

init();
// Button Calculate
btnCalculate.addEventListener('click', function () {
  // changing input from strings into number
  const yearPreviousNum = Number(yearPrevious.value);
  const yearNextNum = Number(yearNext.value);
  const entryValueNum = Number(entryValue.value);

  // No input
  if (!yearPreviousNum || !yearNextNum || !entryValueNum) {
    displayMessage('missing input');

    //Second year is before the first year
  } else if (yearNextNum < yearPreviousNum) {
    displayMessage('second year must be later than the first');

    //years values are not between range of years data
  } else if (
    yearPreviousNum < earliestYear ||
    yearPreviousNum > latestYear ||
    yearNextNum < earliestYear ||
    yearNextNum > latestYear
  ) {
    displayMessage(`enter year between ${earliestYear} - ${latestYear}`);
  } else {
    document.querySelector('.message').classList.add('hidden');

    let tempValue = entryValueNum / (1 + inflationBase[yearPreviousNum]);
    const yearDiffer = yearNextNum - yearPreviousNum;

    for (let i = 0; i < yearDiffer; i++) {
      tempValue = tempValue / (1 + inflationBase[yearPreviousNum + (i + 1)]);
    }

    const presentValue = tempValue;
    presentValueDisplay.textContent = presentValue.toFixed(2);

    const inflationNew = (entryValueNum / tempValue - 1) * 100;
    inflationValueDisplay.textContent = inflationNew.toFixed(2);
  }
});
