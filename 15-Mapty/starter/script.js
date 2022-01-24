'use strict';
class Workout {
  date = new Date();
  id = Date.now().toString().slice(-10);
  // clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `
    ${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}
    `;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    return (this.pace = this.duration / this.distance);
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    return (this.speed = this.distance / (this.duration / 60));
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178)
// const cyc1 = new Cycling([39, -12], 27, 95, 523)
// console.log(run1, cyc1);

// Aplication architecture
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnRemoveAll = document.querySelector('#workouts__delete-all');
const selectionSort = document.querySelector('.workouts__sort--select');
const boxSort = document.querySelector('.workouts__sort');
///////////////
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  #markers = [];
  #sortBy = '';
  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    inputType.addEventListener('change', this._toggleElevationField);

    form.addEventListener('submit', this._newWorkout.bind(this));

    containerWorkouts.addEventListener(
      'click',
      this._workoutsHandler.bind(this)
    );

    btnRemoveAll.addEventListener('click', this.reset);

    selectionSort.addEventListener('change', this._sortByField.bind(this));
  }

  _getPosition() {
    function error(err) {
      alert('Could not get your position');
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation?.getCurrentPosition(this._loadMap.bind(this), error);
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', mapE => {
      // Clear input fields
      inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
          null;
      this._showForm.call(this, mapE);
    });

    // Render workout on map as marker
    if (this.#workouts) {
      this.#workouts.forEach(workout => {
        this._renderWorkoutMarker(workout);
      });
    }
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        null;

    // Hide form
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    // Validation funcs
    const handleValidation = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const allPositive = (...inputs) => inputs.every(input => input > 0);

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Validation
      if (
        !handleValidation(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        toast({
          title: 'Error',
          message: 'Inputs have to be positive number!',
          type: 'error',
        });
        return;
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    else if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Validation
      if (
        !handleValidation(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        toast({
          title: 'Error',
          message: 'Inputs have to be positive number!',
          type: 'error',
        });
        return;
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Show toast message
    toast({
      title: 'Success',
      message: 'You create a workout successfully!',
      type: 'success',
    });

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    const maker = new L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    this.#markers.push(maker);
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <button class="workout__btn--close" data-id="${workout.id}">❌</button>
    <button class="workout__btn--edit" data-id="${workout.id}">🖌</button>
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    if (workout.type === 'running') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
        `;
    }

    if (workout.type === 'cycling') {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
        `;
    }

    form.insertAdjacentHTML('afterend', html);

    btnRemoveAll.classList.remove('hidden');
    boxSort.classList.remove('hidden');
  }

  _workoutsHandler(e) {
    // Remove workout
    const btnRemove = e.target.closest('.workout__btn--close');
    // Edit workout
    const btnEdit = e.target.closest('.workout__btn--edit');
    // Move to popup
    const workoutEl = e.target.closest('.workout');

    if (btnRemove) this._removeWorkout(btnRemove.dataset.id);
    else if (btnEdit) this._editWorkout(btnEdit.dataset.id);
    else if (workoutEl) this._moveToPopup(workoutEl);
  }

  _moveToPopup(workoutEl) {
    const workout = this.#workouts.find(w => w.id === workoutEl.dataset.id);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // using the public interface
    // workout.click();
  }

  _removeWorkout(workId) {
    const index = this.#workouts.findIndex(workout => workout.id === workId);

    // Remove from #workouts
    this.#workouts.splice(index, 1);

    // Remove from UI
    this.#map.removeLayer(this.#markers[index]);
    document.querySelector(`[data-id="${workId}"]`).remove();
    if (this.#workouts.length === 0) {
      btnRemoveAll.style.display = 'none';
      boxSort.style.display = 'none';

      btnRemoveAll.classList.add('hidden');
      boxSort.classList.add('hidden');

      setTimeout(() => (btnRemoveAll.style.display = 'unset'), 200);
      setTimeout(() => (boxSort.style.display = 'unset'), 200);
    }

    // Remove from localStorage
    this._setLocalStorage();
  }

  _editWorkout(workId) {
    const oldWorkout = this.#workouts.find(w => w.id === workId);

    // Show form for edit
    this._showForm({
      latlng: {
        lat: oldWorkout.coords[0],
        lng: oldWorkout.coords[1],
      },
    });

    // Set inputs value
    inputDistance.value = oldWorkout.distance;
    inputDuration.value = oldWorkout.duration;

    if (oldWorkout.type === 'running') {
      inputCadence.value = oldWorkout.cadence;
      inputElevation.value = '';

      if (inputType.value != 'running') this._toggleElevationField();
      inputType.value = 'running';
    }

    if (oldWorkout.type === 'cycling') {
      inputElevation.value = oldWorkout.elevationGain;
      inputCadence.value = '';

      if (inputType.value != 'cycling') this._toggleElevationField();
      inputType.value = 'cycling';
    }

    this._removeWorkout(workId);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (data) {
      data.forEach(workout => {
        // Render workout on list
        this._renderWorkout(workout);
        // Re-build Running and Cycling objects comming from localStorage
        const curId = workout.id;
        if (workout.type === 'running') {
          workout = new Running(
            workout.coords,
            workout.distance,
            workout.duration,
            workout.cadence
          );
        }
        if (workout.type === 'cycling') {
          workout = new Cycling(
            workout.coords,
            workout.distance,
            workout.duration,
            workout.elevationGain
          );
        }
        workout.id = curId;
        // Push obj to #workouts
        this.#workouts.push(workout);
      });
    }
  }

  _sortByField(e) {
    const sortFiled = e.target.value;
    if (sortFiled) {
      this.#sortBy = sortFiled;
      this.#workouts.sort((a = 0, b = 0) => {
        return (b[sortFiled] || 0) - (a[sortFiled] || 0);
      });
      this._setLocalStorage();
      location.reload();
    }
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
// app.reset();
