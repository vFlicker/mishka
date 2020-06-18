// -- Меню бургер --

let burgerButton = document.querySelector('.main-nav__toggle');
let elements = document.querySelectorAll('.main-nav--active');
let elementsArray = Array.from(elements);

burgerButton.onclick = function () {
    for (var i = 0; i < elementsArray.length; i++) {
        elementsArray[i].classList.toggle('main-nav--active');
    };
}

// console.log(elements);
// console.log(elements2);
// --! Меню бургер --


