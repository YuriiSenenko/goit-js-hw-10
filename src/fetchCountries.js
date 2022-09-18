export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=population,name,capital,languages,flags`
  ).then(response => {
    return response.json();
  });
}
