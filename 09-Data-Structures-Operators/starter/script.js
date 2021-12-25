'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],

//   openingHours: {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   },

//   order: function (starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
//   },

//   orderDelivery: function ({starterIndex = 1, mainIndex = 1, timeDelivery = '20:30', address}) {
//     // const [starterFood, mainFood] = this.order(starterIndex, mainIndex)
//     // console.log(`Order received! ${starterFood} and ${mainFood} will be delivery to you at ${timeDelivery} to ${address}`);

//     console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivery to you at ${timeDelivery} to ${address}`);
//   }

// };

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

// document.querySelector('button').addEventListener('click' , function() {
//   let str = document.querySelector('textarea').value;
//   str = str.toLowerCase().replaceAll(' ', '').split("\n")

//   for (let [i, s] of str.entries()) {
//     let [first, ...other] = s.split("_")
//     for ( let [i, el] of other.entries()) {
//       other[i] = `${el.replace(el[0], el[0].toUpperCase())}`
//     }
//     other = other.join('')
//     s = `${first}${other}`
//     console.log(`${s.padEnd(35)}${"✅".repeat(i+1)}`);
//   }
// })

/*
underscore_case
 first_name
Some_Variable
   calculate_AGE
delayed_departure
*/

// const gameEvents = new Map([
//   [17, '⚽ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽ GOAL'],
//   [80, '⚽ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);
// // console.log(gameEvents);
// // 1
// let events = [...new Set(gameEvents.values())];
// // console.log(events);

// // 2
// gameEvents.delete(64)
// // console.log(gameEvents);

// // 3
// const time = [...gameEvents.keys()].pop()
// console.log(`An event happend, on average, every ${time / gameEvents.size} minutes`);

// // 4
// // console.log(gameEvents);
// for (let [time, event] of gameEvents) {
//   let half = (time <= 45) ? `FIRST` : `HALF`
//   console.log(`[${half} HALF] ${time}: ${event}`);
// }

// const str = "Is GAM timevv. Bring the heatvv!"
// console.log(str.replaceAll('vv', ''));
// console.log(str.replace(/vv/g, ''));

// const capitalizeName = function(name) {
//   const names = name.trim().toLowerCase().split(' ');
//   let resultName = []
//   for( const str of names ) {
//     // resultName.push(str[0].toUpperCase() + str.slice(1));
//     resultName.push(str.replace(str[0], str[0].toUpperCase()));
//   }
//   console.log(resultName.join(' '));
// }

// capitalizeName('jessica ann smith davis      ')
// capitalizeName('joNas schemDtmaNn')

// const openingHours = restaurant.openingHours

// Maps: Iteration
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);
// console.log(question);

// Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// Quiz app
// console.log(question.get('question'));
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// const answer = Number(prompt('Your answer'));
// // const answer = 3;
// console.log(question.get((answer === question.get('correct')) ));

// const properties = Object.keys(restaurant.openingHours)
// let openStr = `We are open on ${properties.length} days: `

// for ( const day of properties) {
//   openStr += `${day}, `
// }

// // console.log(openStr);

// const entries = Object.entries(restaurant.openingHours);

// for( const day of entries) {
//   console.log(day);
// }

// for( const [day, {open, close}] of entries) {
//   console.log(`On ${day} we open at ${open} and close at ${close}`);
// }

// console.log(restaurant.openingHours.mon?.open);
// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of weekdays) {
//   // console.log(day);
//   let open = restaurant.openingHours[day]?.open ?? "are close"
//   console.log(`On ${day} we ${open}`);
// }


// const [pizza, , risotto, ...other] = [...restaurant.mainMenu, ...restaurant.starterMenu]

// console.log(pizza, risotto, other);

// const arr = [1, 2, ...[3, 4, 5]];

// const [a, b, ...other] = arr

// console.log(a, b , ...other);

// let restaurantCopy = {...restaurant}
// restaurantCopy.openingHours.thu.open = 13;
// console.log(restaurantCopy.openingHours.thu.open);
// console.log(restaurant.openingHours.thu.open);

// const starterMenuCopy = [...restaurant.starterMenu]
// const mainMenuCopy = [...restaurant.mainMenu]

// const menu = [...starterMenuCopy, ...mainMenuCopy]
// console.log(menu);

// restaurant.orderDelivery({
//   starterIndex: 2,
//   mainIndex: 2,
//   timeDelivery: '20:00',
//   address: 'Le Van Luong, Ha Noi'
// })

// restaurant.orderDelivery({
//   address: 'Le Van Luong, Ha Noi'
// })

// const [starter, other] = restaurant.order(2, 0)

// const {name, categories, openingHours} = restaurant
// // console.log(name, categories, openingHours);

// const { menu = [], starterMenu: starters = []} = restaurant
// // console.log(menu, starters);

// // console.log(openingHours);
// const {fri: {open : o, close : c}} = openingHours
// // console.log(o, c);

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//     'Neuer',
//     'Pavard',
//     'Martinez',
//     'Alaba',
//     'Davies',
//     'Kimmich',
//     'Goretzka',
//     'Coman',
//     'Muller',
//     'Gnarby',
//     'Lewandowski',
//     ],
//     [
//     'Burki',
//     'Schulz',
//     'Hummels',
//     'Akanji',
//     'Hakimi',
//     'Weigl',
//     'Witsel',
//     'Hazard',
//     'Brandt',
//     'Sancho',
//     'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };


// 1
// const scoredEntries = game.scored.entries()
// for (let [index, name] of scoredEntries) {
//   console.log(`Goal ${index + 1}: ${name} `);
// }

// 2
// const oddsValue = game.odds.values()
// const avgOdds = oddsValue.reduce((total, el) => {
//   return total + el
// }, 0)/oddsValue.length
// console.log(avgOdds);

// 3
// const oddsEntries = Object.entries(game.odds)
// for (const [team, odd] of oddsEntries) {
//   const teamName = (team === 'x') ? 'draw' : `victory ${game[team]}`
//   console.log(`Odd of ${teamName}: ${odd}`);
// }

// 4
// let scorers = {};
// for(const player of game.scored) {
//   // scorers[player] = scorers[player]++ || 1
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }

// console.log(scorers);

// // 1
// let [players1, players2] = game.players
// // 2
// let [gk1, ...fieldPlayers1] = players1
// // 3
// let allPlayers = [...players1, ...players2]
// // 4
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
// // 5
// const {team1, x: draw, team2} = game.odds
// // 6
// ;(function printGoals(...players) {
//   for(let player of players) {
//     let sumScore = 0
//     game.scored.forEach((playerScore) => {
//       sumScore = (playerScore === player) ? ++sumScore : sumScore;
//     })
//     console.log(player, sumScore);
//   }
// })('Davies', 'Muller', 'Lewandowski' , 'Kimmich')
// // 7
// team1 < team2 && console.log('Team 1 is ml2w') || 
// team1 > team2 && console.log('Team 2 is ml2w') || 
// team1 == team2 && console.log('Their odd is draw');
