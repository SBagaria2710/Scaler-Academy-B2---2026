// var a = 1;
// let b = 2;

// function first() {
//     console.log("A:", a); // undefined
//     console.log("B:", b); // 2
//     var a = 10;
//     let c = 30;

//     function second() {
//         console.log("C:", c); // 30
//         console.log("B inside second:", b); // 2
//     }

//     second();
//     console.log("A after:", a); // 10
// }

// first();
// console.log("Global A:", a); // 1


// -----------------------------------------------

// let x = "global";

// function test() {
//   console.log(x);
//   let x = "local";
//   console.log(x);
// }

// test();

// -----------------------------------------------

// function createCounter() {
//     let count = 0;

//     function increment() {
//         count = count + 1;
//         console.log("Count is: " + count);
//     }

//     return increment;
// }

// const myCounter = createCounter();

// myCounter();
// myCounter();
// myCounter();

// ---------------------------------------------

// let name = "Global";

// function greet() {
//   console.log("Hello, " + name);
// }

// function wrapper() {
//   let name = "Wrapper";
//   greet();
// }

// wrapper();

// -----------------------------------------------


// function outer() {
//   let x = 10;

//   function inner() {
//     console.log(x);
//   }

//   x = 20;

//   return inner;
// }

// const fn = outer();
// fn();

// ---------------------

// function addOne(num) {
//   let result = num + 1;
//   return result;
// }

// console.log(addOne(5));
// console.log(addOne(5));
// console.log(addOne(5));

// ----------------------

// function createCounter() {
//   let count = 0;

//   return function() {
//     count = count + 1;
//     console.log("Called " + count + " times");
//   };
// }

// const counter = createCounter();
// counter();
// counter();
// counter();

// ---------------------

// function createBankAccount(initialBalance) {
//     let balance = initialBalance;

//     function deposit(amount) {
//         balance = balance + amount;
//         console.log("Deposited: " + amount + ". New balance: " + balance);
//     }

//     function withdraw(amount) {
//         if (amount > balance) {
//             console.log("Insufficient funds. Balance: " + balance);
//             return;
//         }
//         balance = balance - amount;
//         console.log("Withdrew: " + amount + ". New balance: " + balance);
//     }

//     function getBalance() {
//         return balance;
//     }

//     return {
//         deposit: deposit,
//         withdraw: withdraw,
//         getBalance: getBalance
//     };
// }

// const myAccount = createBankAccount(1000);

// myAccount.deposit(500);
// myAccount.withdraw(200);
// console.log("Current balance: " + myAccount.getBalance());
// myAccount.withdraw(2000);

// -----------------------------
// sayHello("Bob");

// const sayHello = function(name) {
//   console.log("Hello, " + name);
// };

// ---------------------------------

function createScoreTracker(playerName) {
    let score = 0;
    let history = [];

    const addPoints = function (points) {
        score = score + points;
        history.push("+" + points);
        console.log(playerName + " score: " + score);
    };

    const deductPoints = function (points) {
        if (points > score) {
            console.log("Cannot deduct. " + playerName + " only has " + score + " points.");
            return;
        }
        score = score - points;
        history.push("-" + points);
        console.log(playerName + " score: " + score);
    };

    const getHistory = function () {
        return `${playerName} : ${history.join(", ")}`;
    }

    return {
        addPoints: addPoints,
        deductPoints: deductPoints,
        getHistory: getHistory
    };
}

const player1 = createScoreTracker("Alice");
const player2 = createScoreTracker("Bob");

player1.addPoints(10);
player1.addPoints(5);
player2.addPoints(20);
player1.deductPoints(3);

console.log(player1.getHistory());
console.log(player2.getHistory());