'use strict';

// let hasDriversLicense = false;
// const passTest = true;

// if(passTest) {
//     hasDriversLicense = true;
// }

// if(hasDriversLicense) {
//     console.log('I can drive :D');
// }

// function describeCountry(country, population, capitalCity) {
//     return `${country} has ${population} million people and its capital city is ${capitalCity}
//     `
// }

// const country1 = describeCountry('Viet Nam', 100000000, 'Ha Noi')
// const country2 = describeCountry('UK', 100000000, 'LonDon')
// const country3 = describeCountry('US', 100000000, 'Washington DC')

// console.log(country1, country2, country3);

// function percentageOfWorld1 (population) {
//     return population / 7900000000 * 100
// }

// const percentageOfWorld2  = function(population) {
//     return population / 7900000000 * 100
// }

// console.log(percentageOfWorld1(1441000000), percentageOfWorld2 (100000000));

// const percentageOfWorld3 = population => population / 7900000000 * 100
// console.log(percentageOfWorld3(450000000));

// const describePopulation = (country, population) => {
//     let percentage = (percentageOfWorld3(population)).toFixed(2)
//     return `${country} has ${population} million people which is about ${percentage}% of the world`
// }
// console.log(describePopulation('Viet Nam', 100000000));

// let scoresDolphins = [44, 23, 71]
// let scoresKoalas = [65, 54, 49]

// let scoresDolphins = [85, 54, 41]
// let scoresKoalas = [23, 34, 27]

// const calcAverage = (scores) => {
//     return scores.reduce((total, score) => {
//         return total + score;
//     }, 0)/scores.length;
// }

// const checkWinner = function(avgDolhins, avgKoalas) {
//     if(avgDolhins >= avgKoalas*2) {
//         return `Dolphins win 🎉 (${avgDolhins} vs. ${avgKoalas})`
//     } else if(avgKoalas >= avgDolhins*2) {
//         return `Koalas win 🎉 (${avgKoalas} vs. ${avgDolhins})`
//     } else if (avgKoalas == avgDolhins){
//         return `They are draw!`
//     } else {
//         return `No one win!`
//     }
// }

// const avgDolphins = calcAverage(scoresDolphins)
// const avgKoalas= calcAverage(scoresKoalas)

// const winner = checkWinner(avgDolphins, avgKoalas)
// console.log(winner, avgDolphins, avgKoalas);

// let populations = [50000000, 4000000, 700000000, 1000000]
// console.log(populations.length == 4)

// let percentages = [];

// let pushvalue = (populations) => {
//     return populations.map(function(population) {
//         return percentageOfWorld3(population)
//     })
// }
// percentages = pushvalue(populations)
// console.log(percentages);

// let neighbours = ['Thailand', 'Chinese', 'Laos']
// neighbours.push('Utopia')
// neighbours.pop()
// neighbours.includes('Germany') ? console.log(true) : console.log('Probably not a central European country :D');

// neighbours[neighbours.indexOf('Thailand')] = 'US'
// console.log(neighbours);

// let bills = [125, 555, 44]

// let calcTip = (bills) => {
//     return bills.map(function(bill) {
//         return (bill >= 50 && bill <= 300) ? bill * 0.15 : bill * 0.2;
//     })
// }

// let tips = calcTip(bills);

// console.log(tips);
// console.log(bills);

// let total = bills.reduce((total, bill, index) => {
//     return total + bill + tips[index]
// }, 0)

// console.log(total);

// const myTeac = {
//     fName : 'Jonas',
//     birthDay: 1991,
//     friends : ['Michael', 'Paul', 'Bob'],
//     isLicensed : true,
//     calcAge: function() {
//         return this.age = 2021 - this.birthDay 
//     },
//     displayInfo: function() {
//         return `${this.fName} is a ${this.calcAge()} old teacher, and he has ${this.isLicensed ? 'a': 'no'} driver's license`
//     }
// }

// // myTeac.calcAge()
// console.log(myTeac.age);
// console.log(myTeac.displayInfo());

// const myCountry = {
//     country: 'Viet Nam',
//     capital: 'Ha Noi',
//     language: 'Vietnamese',
//     population: 100000000,
//     neighbours : ['Thailand', 'Chinese', 'Laos'],
//     describe: function() {
//         return `${this.country} has ${this.population / 1000000} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital call ${this.capital}`
//     },
//     checkIsland : function() {
//         this.isIsland = this.neighbours.length > 0 ? false : true;
//         return this.isIsland;
//     }
// }

// // console.log(`${myCountry.country} has ${myCountry.population / 1000000} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital call ${myCountry.capital}`);

// // myCountry['population'] = 2000000

// // console.log(`${myCountry.country} has ${myCountry.population / 1000000} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital call ${myCountry.capital}`);

// console.log(myCountry.describe());
// console.log(myCountry.checkIsland());

// let humanBMI = function(fname, mass, height) {
//     this.fname = fname;
//     this.mass = mass;
//     this.height = height;

//     this.calcBMI = function() {
//         this.bmi = (this.mass / (this.height ** 2)).toFixed(1);
//         return this.bmi
//     }
// }

// let human1 = new humanBMI('Mark Miller', 78, 1.69)
// let human2 = new humanBMI('John Smith', 92, 1.95)
// human1.calcBMI()
// human2.calcBMI()

// human1.bmi > human2.bmi ? 
// console.log(`${human1.fname}'s BMI (${human1.bmi}) is higher than ${human2.fname}'s (${human2.bmi})!'`) : human1.bmi < human2.bmi ?
// console.log(`${human2.fname}'s BMI (${human2.bmi}) is higher than ${human1.fname}'s (${human1.bmi})!'`) : console.log('They are draw');


// let populations = [50000000, 4000000, 700000000, 1000000]
// let percentages2 = []
// function percentageOfWorld1 (population) {
//     return population / 7900000000 * 100
// }

// for ( let population of populations) {
//     percentages2.push(percentageOfWorld1(population))
// }

// console.log(percentages2);

// let listOfNeighbours  = [
//     ['Canada', 'Mexico'],
//     ['Spain'], 
//     ['Norway', 'Sweden','Russia']
// ];

// for(let i = 0; i < listOfNeighbours.length; i++) {
//     for(let j = 0; j < listOfNeighbours[i].length; j++) {
//         console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
//     }
// }


// let populations = [50000000, 4000000, 700000000, 1000000]
// let percentages2 = []
// let percentageOfWorld1 = function (population) {
//     return population / 7900000000 * 100
// }
// let i = 0;
// while(percentages2.length !== populations.length) {
//     percentages2.push(percentageOfWorld1(populations[i]))
//     ++i
// }

// console.log(percentages2);

let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52],
    tips = [],
    totals = [];

const calcTip = (bills) => {
    return bills.map(function(bill) {
        return (bill >= 50 && bill <= 300) ? bill * 0.15 : bill * 0.2;
    })
}

tips = calcTip(bills)

for(let i = 0; i < bills.length; i++) {
    totals.push(tips[i] + bills[i])
}

console.log(bills,tips, totals);

function calcAverage (arr) {
    return arr.reduce( (total, item) => {
        return total + item
    }, 0)/arr.length;
}

console.log(calcAverage(totals));