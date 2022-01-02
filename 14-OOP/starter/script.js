'use strict';

// const Person = function(firstName, birthYear) {
//     this.firstName = firstName
//     this.birthYear = birthYear
// }

// const jason = new Person('Jason', 2001);
// const cas = new Person('Cas', 2001);

// // Prototypes
// Person.prototype.calcAge = function() {
//     const currentYear = new Date().getFullYear();
//     console.log(currentYear - this.birthYear);
// }

// // console.log(Person.prototype);
// jason.calcAge()

// console.log(Person.prototype.isPrototypeOf(jason));

// Person.prototype.species = "HS"
// console.log(jason.species);

// console.log(cas.hasOwnProperty('firstName'));
// console.log(cas.hasOwnProperty('species'));

// const arr = [1,2,2,3,4,1,2,3,5,2,3,4,6,3,4,5,7]

// Array.prototype.unique = function() {
//     return [...new Set(this)]
// }

// console.log(arr.unique());

// const Car = function(make ,speed) {
//     this.make = make
//     this.speed = speed
// }

// Car.prototype.accelerate = function () {
//     this.speed+= 10;
//     console.log(`New speed of ${this.make} is ${this.speed}`);
// }

// Car.prototype.brake = function () {
//     this.speed-= 5;
//     console.log(`New speed of ${this.make} is ${this.speed}`);
// }

// const bmw = new Car('BWM', 120)
// const merc = new Car('Mercedes', 95)

// console.log(bmw, merc);

// bmw.accelerate()
// merc.brake()

// class PersonCl {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     calcAge() {
//         const currentYear = new Date().getFullYear();
//         console.log(currentYear - this.birthYear);
//     }

//     get age() {
//         const currentYear = new Date().getFullYear();
//         return(currentYear - this.birthYear);
//     }

//     set fullName(name) {
//         if(name.includes(' ')) this._fullName = name
//         else alert `${name} is not a full name`
//     }

//     get fullName() {
//         return this._fullName;
//     }

//     static hey () {
//         console.log('Hey there 👋');
//         console.log(this);
//     }


// }

// const jessica = new PersonCl('Jessica Davis', 1999)

// jessica.calcAge()

// PersonCl.prototype.greet = function() {
//     console.log(`Hello ${this.fullName}`);
// }
// jessica.greet()

// console.log(jessica.age);

// PersonCl.hey();

// const account = {
//     owner: 'Jonas',
//     movements: [200, 300, 5000, 1100, 1500],

//     get latest() {
//         return this.movements.slice(-1).pop()
//     },
//     set latest(mov) {
//         this.movements.push(mov);
//     }
// }

// console.log(account.latest);

// account.latest = 50

// console.log(account.movements);

// const PersonProto = {
//     calcAge() {
//         const currentYear = new Date().getFullYear();
//         return(currentYear - this.birthYear);
//     },

//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }
// }

// const steven = Object.create(PersonProto)

// steven.name = 'Steven'
// steven.birthYear = 2002;

// console.log(steven.calcAge());

// const sarah = Object.create(PersonProto)
// sarah.init('Sarah', 1989)
// console.log(sarah.calcAge());

// class CarCl {
//     constructor(make, speed) {
//         this.make = make
//         this.speed = speed
//     }

//     accelerate() {
//         this.speed += 10
//         return `${this.make} is going at ${this.speed} km/h`
//     }

//     brake() {
//         this.speed -= 5
//         return `${this.make} is going at ${this.speed} km/h`
//     }

//     get speedUS() {
//         return this.speed / 1.6
//     }

//     set speedUS(speed) {
//         this.speed = speed*1.6
//         console.log(`${this.speed} km/h`);
//     }    
// }

// const ford = new CarCl('Ford', 120)

// console.log(ford.speedUS);
// console.log(ford.accelerate());
// ford.speedUS = 100
// console.log(ford.accelerate());
// console.log(ford.brake());

// console.log(ford.speedUS);

// const Person = function(firstName, birthYear) {
//     this.firstName = firstName
//     this.birthYear = birthYear
// }

// const jason = new Person('Jason', 2001);
// const cas = new Person('Cas', 2001);

// // Prototypes
// Person.prototype.calcAge = function() {
//     const currentYear = new Date().getFullYear();
//     console.log(currentYear - this.birthYear);
// }

// jason.calcAge()

// const Student = function(firstName, birthYear, course) {
//     Person.call(this, firstName, birthYear);
//     this.course = course
// }

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype)

// Student.prototype.introduce = function() {
//     console.log(`My name is ${this.firstName} and I study ${this.course}`);
// }

// const mike = new Student('Mike', 2002, 'Computer Science')

// console.log(mike);

// mike.introduce()

// console.log(Student.prototype);

// mike.calcAge()

// console.log(mike.__proto__);

// console.dir(Student.prototype.constructor);
// Student.prototype.constructor = Student
// console.dir(Student.prototype.constructor);

// class Car {
//     constructor(make, speed) {
//         this.make = make
//         this.speed = speed
//     }

//     accelerate() {
//         this.speed += 20
//         return `${this.make} is going at ${this.speed} km/h`
//     }

//     brake() {
//         this.speed -= 5
//         return `${this.make} is going at ${this.speed} km/h`
//     }    
// }

// const EV = new Car('ElectricCar', 120)

// EV.charge = 23

// EV.chargeBattery = function(chargeTo) {
//     this.charge = chargeTo
// }

// EV.accelerate = function() {
//     this.speed += 20
//     this.charge--
//     return `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
// }

// console.log(EV.accelerate());

// EV.brake()

// EV.chargeBattery(90)

// console.log(EV);

// class PersonCl {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     calcAge() {
//         const currentYear = new Date().getFullYear();
//         console.log(currentYear - this.birthYear);
//     }

//     get age() {
//         const currentYear = new Date().getFullYear();
//         return(currentYear - this.birthYear);
//     }

//     set fullName(name) {
//         if(name.includes(' ')) this._fullName = name
//         else alert `${name} is not a full name`
//     }

//     get fullName() {
//         return this._fullName;
//     }

//     static hey () {
//         console.log('Hey there 👋');
//         console.log(this);
//     }
// }


// class StudentCl extends PersonCl {
//     constructor(fullName, birthYear, course) {
//         // Always need to happen first
//         super(fullName, birthYear);
//         this.course = course
//     }

//     introduce() {
//         console.log(`My name is ${this.fullName} and I study ${this.course}`);
//     }

//     calcAge() {
//         console.log(`I'm ${2037 - this.birthYear}`);
//     }

// }

// const martha = new StudentCl('Martha Jones', 2010, 'Computer Science');
// // const martha = new StudentCl('Martha Jones', 2010);

// console.log(martha);

// martha.introduce()

// martha.calcAge()

// const PersonProto = {
//     calcAge() {
//         const currentYear = new Date().getFullYear();
//         return(currentYear - this.birthYear);
//     },

//     init(firstName, birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }
// }

// const steven = Object.create(PersonProto)

// const StudentProto = Object.create(PersonProto)

// StudentProto.init = function (firstName, birthYear, course) {
//     PersonProto.init.call(this, firstName, birthYear)
//     this.course = course
// }

// StudentProto.introduce = function () {
//     console.log(this.course);
// }


// const jay = Object.create(StudentProto)
// jay.init('Jay', 2000, 'Computer Science')

// jay.introduce()

// console.log(jay.calcAge());

// class Account {
//     // 1) Public fields
//     locale = navigator.language;
    
//     // 2) Private fields
//     #movements = [];
//     #pin;

//     constructor(owner, currency, pin) {
//         this.owner = owner
//         this.currency = currency
//         // Protected property
//         this.#pin = pin
//         // this._movements = []
//         // this.locale = navigator.language
//         console.log(`Thanks for opening an account, ${this.owner}`);
//     }
    
//     // 3) Public methods
//     // Public interface
//     get movements() {
//         return this.#movements.slice()
//     }

//     deposit(val) {
//         this.#movements.push(val)
//         return this
//     }

//     withdraw(val) {
//         this.deposit(-val)
//         return this
//     }
    
//     requestLoan(val) {
//         if(this._approveLoan(val)) {
//             this.deposit(val)
//             console.log(`Loan approved`);
//         } else console.log(`Loan not approved`);
//         return this
//     }
    
//     static helper() {
//         console.log('Helper');
//     }

//     // 4) Private methods
//     // #approveLoan(val) {
//     _approveLoan(val) {
//         return this.#movements.find(m => m*10 >= val)
//     }
// }

// const acc1 = new Account('Jonas', 'EUR', 1111)

// // acc1.deposit(250)
// // acc1.withdraw(140)
// // acc1.requestLoan(1000)

// // console.log(acc1.movements);

// // Account.helper()

// console.log(acc1.movements);

// // // Chaining
// acc1.deposit(300).deposit(500).withdraw(150).requestLoan(100000).withdraw(500).requestLoan(100000)

// console.log(acc1.movements);

class CarCl {
    constructor(make, speed) {
        this.make = make
        this.speed = speed
    }

    accelerate() {
        this.speed += 10
        return `${this.make} is going at ${this.speed} km/h`
    }

    brake() {
        this.speed -= 5
        return `${this.make} is going at ${this.speed} km/h`
    }

    get speedUS() {
        return this.speed / 1.6
    }

    set speedUS(speed) {
        this.speed = speed*1.6
        console.log(`${this.speed} km/h`);
    }    
}

class EVCL extends CarCl {
    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge
    }

    chargeBattery(chargeTo){
        this.#charge = chargeTo > this.#charge ? chargeTo : this.#charge
        console.log(`Charge to ${this.#charge}`);
        return this
    }

    accelerate() {
        this.speed += 10
        this.#charge--
        console.log(`${this.make} is going at ${this.speed} km/h with a charge of ${this.#charge}%`);
        return this
    }

    brake() {
        this.speed -= 5
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this
    }

}

const rivian = new EVCL('Rivian', 120, 23)
console.log(rivian);

rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate().accelerate().brake().chargeBattery(10).accelerate()

// console.log(rivian.#charge);

console.log(rivian.speedUS);
console.log(rivian.speedUS = 50);





























