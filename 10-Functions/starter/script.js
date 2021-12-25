'use strict';

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// const bookings = []

// const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {

//     const booking = {
//         flightNum,
//         numPassengers,
//         price
//     }

//     console.log(booking);
//     bookings.push(booking)

// }

// createBooking('LH123', undefined, 1000)

// const greet = function(greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     }
// }

// const greeterHey = greet('Hey')

// console.log(greet);
// console.log(greeterHey);

// // greeterHey('Jonas')
// // greeterHey('Jason')
// // greet('Hello')('LV')

// const greet1 = greeting => name => console.log(`${greeting} ${name}`)

// const greeterHey1 = greet1('Hey')

// console.log(greet1);
// console.log(greeterHey1);

// greeterHey1('Jonas')
// greet1('Hi')("Daviv")

// const lufthansa = {
//     airline: 'Lufthansa',
//     iataCode: 'LH',
//     bookings: [],
//     book(flightNum, name) {
//         console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
//         this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
//     },
// }

// lufthansa.book(239, 'Jonas Sch')
// lufthansa.book(635, 'John Sm')


// const eurowings = {
//     airline: 'Eurowings',
//     iataCode: 'EW',
//     bookings: [],
// }

// const book = lufthansa.book;
// book.call(eurowings, 23, 'Sarah Will')
// book.call(lufthansa, 50, 'Sarah Will')

// const swiss = {
//     airline: 'Swiss Air Lines',
//     iataCode: 'EW',
//     bookings: [],
// }

// book.call(swiss, 25, 'Mary Cooper')

// // Apply
// const flightData = [583, 'Geogre Cooper']
// book.apply(swiss, flightData)
// book.call(eurowings, ...flightData)

// console.log(lufthansa);
// console.log(eurowings);
// console.log(swiss);

// // Bind
// // book.call(eurowings, 23, 'Sarah Will')

// const bookEW = book.bind(eurowings)
// const bookLH = book.bind(lufthansa)
// const bookSW = book.bind(swiss)
// bookEW(23, 'Steven Williams')
// bookLH(23, 'Steven Williams')
// bookSW(23, 'Steven Williams')

// const bookEW23 = book.bind(eurowings, 23)

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function() {
//     console.log(this);
//     this.planes++;
//     console.log(this.planes);
// }
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// console.log((addVAT(300)));
// console.log((addVAT(400)));

// const addTax1 = (rate) => (value) => console.log(value + value * rate);

// const addVAT1 = addTax1(0.23);

// addVAT1(100)

// const app = (() => {
//     const cars = ['BMW']

//     const root = $('#root')
//     const input = $('#input')
//     const submit = $('#submit')

//     return {
//         add(car) {
//             cars.push(car)
//         }, 
//         delete(index) {
//             cars.splice(index, 1)
//         },
//         render() {
//             const html = cars.map((car, index) => {
//                 return `
//                 <li>
//                 ${car}
//                 <button class="delete" data-index="${index}">✖</button>
//                 </li>
//                 `
//             }).join('')
//             root.innerHTML = html
//         },
//         handleDelete(e) {
//             const deleteBtn = e.target.closest('.delete')
//             if(deleteBtn) {
//                 const index = deleteBtn.dataset.index
//                 this.delete(index)
//                 this.render()
//             }
//         },
//         init() {
//             // Handle DOM events
//             submit.addEventListener('click', () => {
//                 this.add(input.value)
//                 this.render()

//                 input.value = null
//                 input.focus()
//             })
//             root.onclick = this.handleDelete.bind(this)
//             this.render()
//         }

//     }

// })();

// app.init()

// const poll = {
//     question: "What is your favourite programming language?",
//     options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
//     // This generates [0, 0, 0, 0]. More in the next section!
//     answers: new Array(4).fill(0),
//     displayResults(type = 'array') {
//         if(type === 'array') {
//             console.log(this.answers);
//         } else if ( type === 'string') {
//             console.log(`Poll result are ${this.answers}`);
//         }
//     },
//     registerNewAnswer() {
//         let userAnswer
//         do {
//             userAnswer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
//         } while (![0, 1, 2, 3].includes(userAnswer))
//         this.answers[userAnswer]++
        
//         this.displayResults()
//         this.displayResults('string')
//     },
//     init() {
//         $('.poll').onclick = this.registerNewAnswer.bind(this)
//     }
// };

// poll.init()

// poll.displayResults.call({answers: [5, 2, 3]})
// poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]},'string')

// let f;

// const g = function() {
//     const a = 23;
//     f = function() {
//         console.log(a * 2);
//     }
// }

// const h = function() {
//     const b = 777;
//     f = function() {
//         console.log(b * 2);
//     }
// }


// g()
// f()
// console.dir(f)

// // Re-assigning f function
// h()
// f()
// console.dir(f)


// const boardPassengers = function(n, wait) {
//     const perGroup = n / 3;

//     setTimeout(function(){
//         console.log(`We are now boarding all ${n} passengers`);
//         console.log(`There are 3 groups, each with ${perGroup} passengers`);
//     }, wait * 1000)

//     console.log(`Will start boarding in ${wait} seconds`);
// }

// const perGroup = 1000;
// boardPassengers(180, 1)

// ;(function () {
//     const header = document.querySelector('h1');
//     header.style.color = 'red';
//     $('body').addEventListener('click', () => {
//         header.style.color = 'blue';
//     })
// })();