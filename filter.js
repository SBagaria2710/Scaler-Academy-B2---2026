const arr = [10, 20, 30, 40, 50];

const newArr = arr.filter(function (num) {
    return num > 30;
})

// console.log(newArr);

const products = [
    { name: "Laptop", price: 80000, inStock: true },
    { name: "Phone", price: 25000, inStock: false },
    { name: "Tablet", price: 35000, inStock: true },
    { name: "Monitor", price: 15000, inStock: true }
];

const available = products.filter(function (product) {
    return product.price < 10000;
});

console.log(available);
// [
//   { name: "Laptop", price: 80000, inStock: true },
//   { name: "Tablet", price: 35000, inStock: true },
//   { name: "Monitor", price: 15000, inStock: true }
// ]
