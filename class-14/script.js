// let title = document.getElementById('main-title');
// const title1 = document.querySelector('#main-title');
// console.log(title, title1);

// const para = document.querySelector('.intro');
// console.log(para);

// const paraAll = document.querySelectorAll(".intro");
// console.log(paraAll);

// // ----------------------------------------
// // SYNTAX: element.addEventListener('eventType', callbackFunction);

// const btn = document.querySelector("#btn-1");
// btn.addEventListener('click', function() {
//     console.log("Button was clicked!");
// });

// btn.addEventListener('dblclick', function() {
//     console.log("Double Clicked!");
// });

// // Create
// let newDiv = document.createElement('div');

// // Configure
// newDiv.innerText = 'Hello from JavaScript';

// // Attach
// let body = document.querySelector('body');
// body.appendChild(newDiv);


// // Select the parent
// let ourList = document.querySelector('ul');

// // Select all <li> elements
// let allElements = document.querySelectorAll('li');

// let sevenElement = document.createElement('li');
// sevenElement.innerText = '7';

// let referenceNode = allElements[6]; // the <li> that contains "8"
// ourList.insertBefore(sevenElement, referenceNode);


let para = document.querySelector(".intro");
let style = document.createElement("style");

style.innerText = `.highlight {background-color: yellow;font-weight: bold;}.hidden {display: none;}.active {border: 2px solid blue;padding: 8px;}`;

document.head.append(style);

// 1. classList.add('className')
para.classList.add("highlight")

// 2. classList.remove('className')
para.classList.remove("highlight")

// 3. classList.toggle('className')
para.classList.toggle("highlight") // true
para.classList.toggle("highlight") // false
para.classList.toggle("highlight") // true

// 4.classList.contains('className')
console.log(para.classList.contains("highlight")) // true/false
console.log(para.classList.contains("intro")) // ??