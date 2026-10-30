// function calculateTax(amount) {
//   var taxRate = 0.2;
//   var tax = amount * taxRate;
//   return tax;
// }

// var totalTax = calculateTax(100);
// console.log(totalTax); // 20
// console.log(taxRate);  // ???

// ------------------------------------------
// var globalVar = "I am global";
// let globalLet = "I am also global";

// function showGlobal() {
//   console.log(globalVar); // "I am global"
//   console.log(globalLet); // "I am also global"
// }

// showGlobal();
// console.log(globalVar);   // "I am global"

// ------------------------------------------

// if (true) {
//   var varVariable = "I escape blocks";
//   let letVariable = "I stay in the block";
//   const constVariable = "I also stay";
// }

// console.log(varVariable);  // "I escape blocks"
// console.log(letVariable);  // ReferenceError!

// ------------------------------------------
// for (var i = 0; i < 3; i++) {
//   // loop body
// }
// console.log(i);   // 3 (leaked out!)

// for (let j = 0; j < 3; j++) {
//   // loop body
// }
// console.log(j);   // ReferenceError (contained in the block)

// ---------------------------------------------
let name = "Global";

function greet() {
  console.log("Hello, " + name);
}

function wrapper() {
  let name = "Wrapper";
  greet();
}

wrapper();