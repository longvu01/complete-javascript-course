'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-09-26T17:01:17.194Z',
    '2021-12-18T23:36:17.929Z',
    '2021-12-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Jason Le',
  movements: [200000000000, 4550000.23, -300000006.5, 250000000, -642000000.21, -133000000.09, 79000000.97, 13000000],
  interestRate: 1.5,
  pin: 1712,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'VND',
  locale: 'vi-VN',
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

  const daysPassed = calcDaysPassed(new Date(), date)

  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`;

  // else
  // const day = `${date.getDate()}`.padStart(2, 0)
  // const month = `${date.getMonth() + 1 }`.padStart(2, 0)
  // const year = date.getFullYear()
  // return `${day}/${month}/${year}`
  return new Intl.DateTimeFormat(locale).format(date)
}

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value)
}

let isSort = false;
const displayMovements = function (acc, isSort) {
  containerMovements.innerHTML = ''
  
  // const movs = isSort ?  [...acc.movements].sort((a, b) => a - b) : acc.movements
  const movs = isSort ?  acc.movements.slice().sort((a, b) => a - b) : acc.movements

  movs.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal'

    const date = new Date(acc.movementsDates[index])

    const displayDate = formatMovementDate(date, acc.locale)

    const formattedMov = formatCur(movement, acc.locale, acc.currency)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

/*  */
const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((total, mov) => total + mov, 0)
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency)
}

/*  */
const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((total, mov) => total + mov)
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency)

  const out = acc.movements.filter(mov => mov < 0).reduce((total, mov) => total + mov)
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency)

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate/100).filter(interest => interest >= 1).reduce((total, interest) => total + interest)
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency)
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
  displayMovements(acc)

  // Display balance
  calcDisplayBalance(acc)

  // Display summary
  calcDisplaySummary(acc)
}

const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 30;
  
  const tick = () => {
    // console.log(timer);
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(Math.floor(time % 60)).padStart(2, 0);
    // In each call, print to UI
    labelTimer.textContent = `${min}:${sec}`
    // When end, stop timer and log out
    if(time === 0) {
      clearInterval(timer)
      labelTimer.textContent = 'Log in to get started'
      containerApp.classList.remove('show')
    }
    // Decrese 1s
    time--;
  }
  // Call every secs
  tick();
  const timer = setInterval(tick, 1000)
  return timer
}

// Event handler
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount)
// containerApp.classList.add('show')

// Experimenting API
const now = new Date()
const options = {
  hour : 'numeric',
  minute : 'numeric',
  day : 'numeric',
  month : 'long',
  year : 'numeric',
  weekday : 'long',
}
const locale = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now)


btnLogin.addEventListener('click', (e) => {
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.classList.add('show')

    // Create current date and time
    const now = new Date()
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

    // Clear fields
    inputLoginUsername.value = inputLoginPin.value = null;
    inputLoginPin.blur();

    // Timer
    if(timer) clearInterval(timer)
    timer = startLogOutTimer();

    updateUI(currentAccount)

  }
})

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  
  inputTransferAmount.value = inputTransferTo.value = null;
  inputTransferAmount.blur();

  if(receiverAcc && amount > 0 && amount <= currentAccount.balance && receiverAcc !== currentAccount) {
    setTimeout(() => {
      // Doing the transfer
      currentAccount.movements.push(-amount)
      receiverAcc.movements.push(amount)

      // Add transfer date to both
      currentAccount.movementsDates.push(new Date().toISOString())
      receiverAcc.movementsDates.push(new Date().toISOString())

      updateUI(currentAccount)}
    , 500)
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movements
      currentAccount.movements.push(amount)
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString())
  
      updateUI(currentAccount)}
      , 500)
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
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
  displayMovements(currentAccount, !isSort)
  isSort = !isSort
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const future = new Date(2022, 8, 27, 10, 5, 0)
// console.log(+future);

// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)

// const day1 = calcDaysPassed(new Date(2022, 8, 27), new Date(2022, 8, 17))
// console.log(day1);

// const num = 123545634674.568;

// const options2 = {
//   // style: 'unit',
//   // style: 'percent',
//   style: 'currency',
//   // unit: 'mile-per-hour',
//   unit: 'celsius',
//   currency: 'VND',
//   // useGrouping : 'false'
// }

// console.log('VN     ', new Intl.NumberFormat('vi-VN', options2).format(num));

// const ingredients = ['olives', 'spinach']

// const order1 = setTimeout((ing) => {
//   console.log(`Here is your pizza with ${ing}`);
// }, 1000, 'olives')

// const order2 = setTimeout((ing1, ing2) => {
//   console.log(`Here is your pizza with ${ing1} and ${ing2}`);
// }, 1000, ...ingredients)

// console.log('Waiting...');

// if(ingredients.includes('spinach')) clearTimeout(order2)

// setInterval(() => {
//   const now = new Date()

//   console.log(Intl.DateTimeFormat('vi-VN', {
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//   }).format(now));
// }, 1000)






























