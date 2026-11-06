const prices = [200, 450, 130, 870, 55];
// let total = 0;

// for (let i = 0; i < prices.length; i++) {
//     total = total + prices[i];
// }

// console.log(total);

const rtotal = prices.reduce(function (acc, currentValue) {
    return acc + currentValue;
}, 0);

console.log(rtotal);

const products = [
    { name: "Laptop", price: 80000, inStock: true },
    { name: "Phone", price: 25000, inStock: false },
    { name: "Tablet", price: 35000, inStock: true },
    { name: "Monitor", price: 15000, inStock: true }
];


const totalInStock = products.filter(function (product) {
        return product.inStock;
    }).map(function (product) {
        return product.price;
    }).reduce(function (total, price) {
        return total + price;
    }, 0);

console.log(totalInStock); // 130000