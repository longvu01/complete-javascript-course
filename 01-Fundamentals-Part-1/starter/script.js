// let js = 'amazing';
//     // if(js === 'amazing') alert('JavaScript is FUN')

// let country = 'Viet Nam',
//     continent = 'Asia',
//     population = '10000000'
// console.log(country, continent, population);

// let isIsland = false;
// console.log(typeof isIsland);

// const language = 'Vietnamese, English';
// console.log(language);

// halfPopulation = population/2;
// console.log(halfPopulation);
// // population = 1;
// console.log(population);
// console.log(population > 6000000000);
// console.log(population > 33000000);

// let description = `${country} is in ${continent}, and its ${population} people speak ${language}`
// console.log(description);
// if(population > 33000000) {
//     console.log(`${country}'s population is above average`);
// } else {
//     populationBelow = 33000000 - population;
//     console.log(`${country}'s population is ${populationBelo1w} million below average`);
// }

// numNeighbours = prompt('How many neighbour countries does your country have?');
// console.log(typeof numNeighbours, numNeighbours);
// numNeighbours = Number(numNeighbours)
// console.log(typeof numNeighbours, numNeighbours);
// if(numNeighbours === 1) {
//     console.log('Only 1 border!')
// } else if(numNeighbours > 1) {
//     console.log('More than 1 border')
// } else {
//     console.log('No border')
// }

// if(language.includes('English') && population <= 50000000 && !isIsland) {
//     console.log(`You should live in ${country}`);
// } else {
//     console.log(`${country} does not meet your criteria :(`);
// }

// let newLanguage = 'mandarin';
// switch(newLanguage) {
//     case ('chinese'):
//     case ('mandarin'): 
//         console.log('MOST number of native speakers!');
//         break;
//     case ('spanish'):
//         console.log("2nd place in number of native speakers");
//         break;
//     case ('english'):
//         console.log("3rd place");
//         break;
//     case ('hindi'):
//         console.log("Number 4");
//         break;
//     case ('arabic'):
//         console.log("5th most spoken language");
//         break;
//     default:
//         console.log("Great language too :D");
// }

// let Dolphins = [96, 108, 98]
// let Koalas = [88, 91, 110]
// let Dolphins = [97, 112, 101]
// let Koalas = [123, 95, 109]

// let avgDolphins = Dolphins.reduce(function(total, score) {
//     return total + score;
// },0)/3

// let avgKoalas = Koalas.reduce(function(total, score) {
//     return total + score;
// },0)/3

// console.log(avgDolphins, avgKoalas);

// // if(avgDolphins > avgKoalas) {
// //     console.log('Dolphins is the winner!');
// // } else if(avgDolphins < avgKoalas) {
// //     console.log('Koalas is the winner!');
// // } else {
// //     console.log('They are draw');
// // }

// let isDolphinsWin = false;
// isDolphinsWin = avgDolphins > avgKoalas && avgDolphins >= 100

let billValue = 430;

let tipValue = (billValue >= 50 && billValue <= 300) ? 0.15 * billValue : 0.2 * billValue;

console.log(`The bill was ${billValue}, the tip was ${tipValue}, and the total value is ${billValue + tipValue}`);