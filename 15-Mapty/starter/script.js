'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(position) {
    const {latitude} = position.coords
    const {longitude} = position.coords
    console.log(`https://www.google.com/maps/@${latitude},${longitude}?hl=vi-VN`);

    const coords = [latitude, longitude]

    map = L.map('map').setView(coords, 13);
    // console.log(map)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Handling clicks on map
    map.on('click', function(mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden')        
        inputDistance.focus()
    })

}

function error(err) {
    alert('Could not get your position')
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation?.getCurrentPosition(success, error, options);

// Form handler
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = null
    
    // Display marker
    const {lat, lng} = mapEvent.latlng

    const markerOptions = {
        riseOnHover:true,
    }

    const html = `${inputType.textContent}`

    L.marker([lat, lng], markerOptions).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250, 
            minWidth: 100, 
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        }))
        .setPopupContent(html)
        .openPopup();
    form.classList.add('hidden')
})

inputType.addEventListener('change', function() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
})











