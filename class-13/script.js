// // const prices = [200, 450, 870, 130, 55];

// // const discounted = [];

// // for(let i = 0; i < prices.length; i++) {
// //     discounted.push(prices[i] * 0.9);
// // }

// // console.log(discounted);

// // const expensive = [];

// // for(let i = 0; i < prices.length; i++) {
// //     if (prices[i] > 200) {
// //         expensive.push(prices[i]);
// //     }
// // }

// // console.log(expensive);

// // let total = 0;

// // for(let i = 0; i < prices.length; i++) {
// //     total = total + prices[i];
// // }

// // console.log(total);

// function add(a, b) {
//     return a + b;
// }

// function multiply(a, b) {
//     return a * b;
// }

// function compute(cb, x, y) {
//     return cb(x, y);
// }

// // console.log(compute(add, 5, 3));
// // console.log(compute(multiply, 5, 3));

// function processEach(array, fn) {
//     for (let i = 0; i < array.length; i++) {
//         fn(array[i]); // 
//     }
// }

// const fruits = ["apple", "banana", "cherry"];

// processEach(fruits, function (item) {
//     console.log("I like " + item);
// })

// function upper(item) {
//     console.log(item.toUpperCase());
// }

// processEach(fruits, upper);

// // ---------------------------------
// const radii = [2, 4, 6, 8];

// // // Diameters
// // const diameters = [];
// // for (let i = 0; i < radii.length; i++) {
// //  diameters.push(radii[i] * 2);
// // }

// // // Circumferences
// // const circumferences = [];
// // for (let i = 0; i < radii.length; i++) {
// //  circumferences.push(2 * Math.PI * radii[i]);
// // }

// // // Areas
// // const areas = [];
// // for (let i = 0; i < radii.length; i++) {
// //  areas.push(Math.PI * radii[i] * radii[i]);
// // }

// // console.log({ diameters, circumferences, areas });

// function calculate(radii, logic) {
//     const result = [];
//     for(let i = 0; i < radii.length; i++) {
//         result.push(logic(radii[i]));
//     }
//     return result;
// }

// function getDiameter(radius) {
//     return radius * 2;
// }

// function getCircumference(radius) {
//     return 2 * Math.PI * radius;
// }

// function getArea(radius) {
//     return Math.PI * radius * radius;
// }

// // console.log(calculate(radii, getDiameter));
// // console.log(calculate(radii, getCircumference));
// // console.log(calculate(radii, getArea));
// const areas = radii.map(getArea);
// console.log(areas);

// function getSquarePerimeter(radius) {
//     return 4 * radius;
// }

// // console.log(calculate(radii, getSquarePerimeter));

// // ----------- PURE FUNCTION -------------------

// let taxRate = 0.18;

// function  calculateTax(price) {
//     return price * taxRate;
// }

// // ------------ MAP ------------
// const prices = [200, 450, 130, 870, 55];

// const discounted = prices.map(function(price) {
//     return price * 0.9;
// });

// console.log(discounted);
// console.log(prices);

const products = [
    { name: "Laptop", price: 80000, inStock: true },
    { name: "Phone", price: 25000, inStock: false },
    { name: "Tablet", price: 35000, inStock: true },
    { name: "Monitor", price: 15000, inStock: true }
];

const productNames = products.map(function(product) {
    return product.name;
})

console.log(productNames);

const doubled = [1, 2, 3].map(function(num) {
    num * 2;
})
console.log(doubled);