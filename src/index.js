import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'; // потім спробувати замінити на один модуль
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  event.preventDefault();
  clearMarkup();
  if (refs.input.value === '') {
    return;
  }
  fetchCountries(event.target.value.trim())
    .then(createCountryMarkup)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

// Умова виводу даних
function createCountryMarkup(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length === 1) {
    countryInfo(countries);
  } else {
    listCountriesMarkup(countries);
  }
}

// Розмітка списку кріїн
function listCountriesMarkup(countries) {
  const listElementMarkup = countries
    .map(
      country =>
        `<li class="country-list__item">
        <img class="flag" src=${country.flags.svg} alt="flag" width="60"><img>
        ${country.name}</li>`
    )
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', listElementMarkup);
}

// Розмітка картки країни
function countryInfo(countries) {
  const listElementMarkup = countries
    .map(
      country =>
        `<div class="block"><img class="flag" src=${country.flags.svg} alt="flag" width="60">
        <h2 class="country-info__name">${country.name}</h2></div>
         <p class="country-info__description">Capital: <span class="country-info__value">${country.capital}</span></p>
         <p class="country-info__description">Population: <span class="country-info__value">${country.population}</span></p>
         <p class="country-info__description">Languages: <span class="country-info__value">${country.languages}</span></p>`
    )
    .join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', listElementMarkup);
}

// Скидає розмітку
function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
