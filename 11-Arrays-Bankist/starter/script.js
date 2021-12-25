'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

/*  */
let isSort = false;
const displayMovements = function (movements, isSort) {
  containerMovements.innerHTML = ''
  
  // const movs = isSort ?  [...movements].sort((a, b) => a - b) : movements
  const movs = isSort ?  movements.slice().sort((a, b) => a - b) : movements

  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>`

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

/*  */
const calcDisplayBalance = (account) => {
  account.balance = account.movements.reduce((total, mov) => total + mov, 0)
  labelBalance.textContent = `${account.balance} €`
}

/*  */
const calcDisplaySummary = function(account) {
  const incomes = account.movements.filter(mov => mov > 0).reduce((total, mov) => total + mov)
  labelSumIn.textContent = `${incomes}€`

  const out = account.movements.filter(mov => mov < 0).reduce((total, mov) => total + mov)
  labelSumOut.textContent = `${Math.abs(out)}€`

  const interest = account.movements.filter(mov => mov > 0).map(deposit => deposit * account.interestRate/100).filter(interest => interest >= 1).reduce((total, interest) => total + interest)
  labelSumInterest.textContent = `${interest}€`
}

/*  */
const createUsername = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(' ').map(partOfName => partOfName[0]).join('')
  })
}
createUsername(accounts)

const updateUI = (acc) => {
  // Display movements
  displayMovements(acc.movements)

  // Display balance
  calcDisplayBalance(acc)

  // Display summary
  calcDisplaySummary(acc)
}

// Event handler
let currentAccount;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.classList.add('show')

    // Clear fields
    inputLoginUsername.value = inputLoginPin.value = null;
    inputLoginPin.blur();

    updateUI(currentAccount)

}
})

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  if(receiverAcc && amount > 0 && amount <= currentAccount.balance && receiverAcc !== currentAccount) {
    // Doing the transfer
    currentAccount.movements.push(-amount)
    receiverAcc.movements.push(amount)
  }
  setTimeout(() => updateUI(currentAccount), 500)
  inputTransferAmount.value = inputTransferTo.value = null;
  inputTransferAmount.blur();
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount)
    setTimeout(() => updateUI(currentAccount), 500)
  }

  inputLoanAmount.value = null
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  const currentUser = currentAccount.username;
  const currentPin = currentAccount.pin;
  console.log(currentUser, currentPin);
  if(inputCloseUsername.value === currentUser && Number(inputClosePin.value) === currentPin) {
    // Delete current account
    accounts.splice(accounts.findIndex(acc => acc.username === currentUser), 1)
    // Clear both inputs
    inputCloseUsername.value = inputClosePin.value = null
    inputClosePin.blur();
    // reset currentAccount variable
    currentAccount = undefined;
    // Hide UI
    containerApp.classList.remove('show')
  }
})

btnSort.addEventListener('click', (e) => {
  displayMovements(currentAccount.movements, !isSort)
  isSort = !isSort
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
])

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

// const deposits = movements.filter(mov => mov > 0)
// const withdrawal = movements.filter(mov => mov < 0)
// console.log(movements.reduce((acc, mov) => mov > acc ? mov : acc));

/////////////////////////////////////////////////
// CC
// ;((dogsJulia, dogsKate) => {
//   const dogsJuliaCorrected = dogsJulia.slice(1, -2)
//   const mergeDogs = [...dogsJuliaCorrected, ...dogsKate]
//   mergeDogs.forEach( (dogAge, index) => {
//     const type = dogAge > 3 ? `an adult is ${dogAge} years old` : 'still a puppy 🐶'
//     console.log(`Dog number ${index} is ${type}`)
//   })
// })([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])

// const calcAverageHumanAge = (ages) => {
//   return ages
//             .map((age) => age <= 2 ? age * 2 : age * 4 + 16)
//             .filter((age) => age > 18)
//             .reduce((total, age, i, arr) => total + age/arr.length, 0)
// }
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// flat and flatMap
// console.log(accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov))
// console.log(accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov))

// const diceRolls = Array.from({ length: 100}, () => Math.ceil(Math.random() * 6))
// console.log(diceRolls);
// console.log(diceRolls.sort((a, b) => a - b));
// Array.from(document.querySelectorAll('.movements__value')).map(el => Number(el.textContent.replace('€', ''))).reduce((acc, mov) => acc + mov)
// Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', ''))).reduce((acc, mov) => acc + mov)

// const {deposits, withdrawals} = accounts.flatMap(acc => acc.movements).reduce((sums, mov) => {
//   // mov > 0 ? sums.deposits += mov : sums.withdrawals += mov
//   sums[mov > 0 ? 'deposits' : 'withdrawals'] += mov
//   return sums
// }, {deposits: 0, withdrawals: 0})
// console.log(deposits, withdrawals);

// const convertTitleCase = function(title) {
//   const capitalize = (str) => str[0].toUpperCase() + str.slice(1)
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const titlecase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ');
//   return capitalize(titlecase)
// }

// console.log(convertTitleCase('anD this is a nice title')); 

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach((dog) => dog.recommendedFood = Math.ceil(dog.weight ** 0.75 * 28))
console.log(dogs);

//2
const dogOfSarah = dogs.filter(dog => dog.owners.includes('Sarah'))
dogOfSarah.forEach((dog) => {
  const dogOfSarahCurrentEat = dog.curFood
  const dogOfSarahRecommendFood = dog.recommendedFood
  console.log(dogOfSarahCurrentEat > dogOfSarahRecommendFood * 1.1 ? 'So much' : dogOfSarahCurrentEat < dogOfSarahRecommendFood * 0.9 ? 'So litte' : "It's balance");
})

//3
const ownersEatTooMuch = dogs.filter((dog) => dog.curFood > dog.recommendedFood * 1.1).flatMap(dog => dog.owners)
const ownersEatTooLittle = dogs.filter((dog) => dog.curFood < dog.recommendedFood * 0.9).flatMap(dog => dog.owners)
console.log(ownersEatTooMuch, ownersEatTooLittle);

//4
const eatLog = (owners, str) => {
  return owners.flatMap(obj => obj.owners).join(' and ').concat(`'s dogs eat too ${str}`)
}
console.log(eatLog(ownersEatTooMuch, 'much'));
console.log(eatLog(ownersEatTooLittle, 'little'));

//5
const isEatOkay = dog => dog.recommendedFood * 0.9 && dog.curFood < dog.recommendedFood * 1.1
dogs.forEach((dog, i) => {
  console.log(dogs[i].owners.join(' and ').concat("'s dog"));
  console.log(dog.curFood > isEatOkay(dog));
})

//6
console.log(dogs.some(isEatOkay));

//7
console.log(dogs.filter(isEatOkay));

//8
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));
































