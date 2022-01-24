'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
///////////////////////////////////////

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = (data, className = '') => {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
    <h3 class="country__name">${data.name?.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${
      data.languages[Object.keys(data.languages)]
    }</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[Object.keys(data.currencies)]?.name
    }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);

//     const html = `
//     <article class="country">
//       <img class="country__img" src="${data.flags.svg}" />
//       <div class="country__data">
//       <h3 class="country__name">${data.name?.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)}M people</p>
//       <p class="country__row"><span>🗣️</span>${
//         data.languages[Object.keys(data.languages)]
//       }</p>
//       <p class="country__row"><span>💰</span>${
//         data.currencies[Object.keys(data.currencies)].name
//       }</p>
//       </div>
//     </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       // Render country 2
//       renderCountry(data2, 'neighbour');

//       // Get neighbour country
//       const [neighbour] = data2.borders;

//       if (!neighbour) return;

//       // AJAX call country 3
//       const request3 = new XMLHttpRequest();
//       request3.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//       request3.send();

//       request3.addEventListener('load', function () {
//         const [data3] = JSON.parse(this.responseText);
//         // Render country 3
//         renderCountry(data3, 'neighbour');
//       });
//     });
//   });
// };

// // getCountryAndNeighbour('vietnam');
// // getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// var promise = new Promise(function (resolve, reject) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/vietnam`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     if (false) {
//       resolve(data);
//     } else {
//       reject('Failure');
//     }
//   });
// });

// promise
//   .then(function (data) {
//     console.log('Successfully!');
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });
// .finally(function () {
//   console.log('Done!');
// });

//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

const getJSON = (url, errorMsg = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      if (!data[0].borders) throw new Error(`No neighbour found!`);

      const neighbour = data[0].borders[0];

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
// getCountryData('vietnam');
// getCountryData('australia');

// btn.addEventListener('click', getCountryData.bind('_', 'vietnam'));

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(err.message);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI(51.50354, -0.12768);
// whereAmI(19.037, 72.873);
// whereAmI( -33.933, 18.474);

// console.log('Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// setTimeout(() => console.log('a sec timer'), 0);
// console.log('End');
// setTimeout(() => console.log('b sec timer'), 0);
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; ++i) {}
//   console.log(res);
// });

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN 💰');
//     } else {
//       reject(new Error('You lose your money 💩'));
//     }
//   }, 500);
// });

// lotteryPromise
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err.message);
//   })
//   .finally(() => {
//     console.log('Well');
//   });

// // Promisifying set timeout
// const wait = seconds =>
//   new Promise(resolve => setTimeout(resolve, seconds * 1000));

// wait(1)
//   .then(() => {
//     console.log('I waited for 1 secs');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 2 secs');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 3 secs');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('I waited for 4 secs');
//   });

// Promise.resolve('Well').then(x => {
//   console.log(x);
// });
// Promise.reject('Oop').catch(x => {
//   console.log(x);
// });

// const getPosition = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition()
//   .then(pos => console.log(pos))
//   .catch(err => console.log(err));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(err.message);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// whereAmI();

// const imgContainer = document.querySelector('.images');

// const wait = seconds =>
//   new Promise(resolve => setTimeout(resolve, seconds * 1000));

// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.addEventListener('load', () => {
//       imgContainer.appendChild(img);
//       resolve(img);
//     });

//     img.addEventListener('error', () => {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let curImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     curImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     curImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await resGeo.json();

//     // Country data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error('Problem getting country data');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     renderError(err.message);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// console.log(1);
// (async function () {
//   try {
//     console.log(await whereAmI());
//   } catch (err) {
//     console.error(err.message);
//   }
//   console.log(3);
// })();

// Promise.all
const get3Countries = async (c1, c2, c3) => {
  try {
    Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ])
      .then(data => {
        console.log(data.map(d => d[0].capital.join('')));
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    console.log(err);
  }
};

// get3Countries('portugal', 'vietnam', 'usa');

// // Promise.race
// (async function () {
//   try {
//     const res = await Promise.race([
//       getJSON(`https://restcountries.com/v3.1/name/italy`),
//       getJSON(`https://restcountries.com/v3.1/name/egypt`),
//       getJSON(`https://restcountries.com/v3.1/name/mexico`),
//     ]);
//     console.log(...res);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// const timeout = function (ms) {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error('Request took too long!'));
//     }, ms);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(600),
// ])
//   .then(data => {
//     console.log(data[0]);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Promise.allSettled;
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('Error'),
//   Promise.resolve('Success2'),
// ]).then(res => console.log(res));

// // Promise.any
// Promise.any([
//   Promise.reject('Error'),
//   // Promise.resolve('Success2'),
//   Promise.reject('Error2'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => {
//     console.error(err);
//   });

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', () => {
      imgContainer.appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found'));
    });
  });
};

const wait = function (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const loadNPause = async () => {
  try {
    const img1 = await createImage('img/img-1.jpg');

    await wait(2000);
    img1.remove();

    const img2 = await createImage('img/img-2.jpg');

    await wait(2000);
    img2.remove();
  } catch (err) {
    console.log(err.message);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEL = await Promise.all(imgs);
    imgsEL.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err.message);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
