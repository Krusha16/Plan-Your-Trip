const apiKey = "pk.eyJ1Ijoia3J1c2hhIiwiYSI6ImNramxrM2hncThoZ2EydnJ4YnV0YjloMncifQ.S4Z8RPPx2FesMphEwKDFig";
const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const originForm = document.querySelector('.origin-form');
const originInput = document.querySelector('.origin-input');
const destinationForm = document.querySelector('.destination-form');
const destinationInput = document.querySelector('.destination-input');
const origins = document.querySelector('.origins');
const destinations = document.querySelector('.destinations')

function getForwardGeocodeResults(searchString) {
  return fetch(
    `${baseUrl}${searchString}.json?bbox=-97.325875, 49.766204, -96.953987, 49.99275&limit=10&access_token=${apiKey}`
  )
  .then(response => {
    return response.json()
  })
}

originForm.addEventListener('submit', function(e){
  e.preventDefault();
  getForwardGeocodeResults(originInput.value)
  .then(search => {
    manipulateData(search.features, origins);
  }); 
})

destinationForm.addEventListener('submit', function(e){
  e.preventDefault();
  getForwardGeocodeResults(destinationInput.value)
  .then(search => {
    manipulateData(search.features, destinations);
  }); 
})

function manipulateData(searchResults, chosenList){
  chosenList.innerHTML = "";
  searchResults.forEach(searchResult => {
    let longitude = searchResult.center[0];
    let latitude = searchResult.center[1];
    let result = searchResult.place_name.split(",").map(item => item.trim());
    insertToHTML(longitude, latitude, result[0],result[1], chosenList);
  });
}

function insertToHTML(longitude, latitude, placeName, placeAddress, chosenList) {
  chosenList.insertAdjacentHTML('beforeend', `
  <li data-long=${longitude} data-lat=${latitude}>
    <div class="name">${placeName}</div>
    <div>${placeAddress}</div>
  </li>
  `)
}