// const heading = document.querySelector('h1');
// const items = document.querySelectorAll('.item');
// const main = document.getElementById('main');

// const p = document.createElement('p');
// p.textContext = 'New Paragraph!';
// document.body.appendChild(p);

// element.classList.add('active');
// element.classList.remove('active');
// element.classList.toggle('active');

function doFirst() {
    console.log('First thing!');
}

function doSecond() {
    console.log('Second thing!');
}

const button = document.getElementById("btn");
button.addEventListener('click', function () {
    doFirst();
});

button.addEventListener('click', function() {
    doSecond();
});