// Remember, we're gonna use strict mode in all scripts now!
"use strict";

let data1 =  [17, 21, 23]
let data2 =  [12, 5, -5, 0 , 4]

let printForecast = function(arr) {
    return arr.map(function(item, index) {
        return `... ${item}*C in ${index + 1} days `;
    }).join('') + '...';
}

console.log(printForecast(data1));
console.log(printForecast(data2));
console.log(printForecast(data1.concat(data2)));

