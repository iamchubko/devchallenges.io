const plusButtons = document.querySelectorAll('.plus');
const minusButtons = document.querySelectorAll('.minus');

const inputsQuantity = document.querySelectorAll('.item__quantity');
const itemsPrice = document.querySelectorAll('.sale');

let priceArray = [];
let quantityArray = [];

let priceSum;

let priceShipping = document.getElementById('price-shipping');
priceShipping = Number(priceShipping.textContent.replace('$', ''));

let priceTotal = document.getElementById('price-total');




function increment() {
    this.parentNode.querySelector('input[type=number]').stepUp();
    calcTotal();
    saveQty();
}

function decrement() {
    this.parentNode.querySelector('input[type=number]').stepDown();
    calcTotal();
    saveQty();
}


function calcTotal() { // calculates total price of items
    priceSum = 0;

    for (let i = 0; i < inputsQuantity.length; i++) {
        priceArray[i] = Number(itemsPrice[i].textContent.replace('$', ''));
        quantityArray[i] = Number(inputsQuantity[i].value);
        priceSum += priceArray[i] * quantityArray[i];
    }
    
    priceSum = (priceSum + priceShipping).toFixed(2);
    priceTotal.textContent = '$' + priceSum;
}



plusButtons.forEach(e => {
    e.addEventListener('click', increment);
});    

minusButtons.forEach(e => {
    e.addEventListener('click', decrement);
});    



// for keyboard arrows
inputsQuantity.forEach(e => {
    e.addEventListener('input', calcTotal);
});







// ---------saving quantity of items---------

let numberQuantity = [];

inputsQuantity.forEach(e => {
    e.addEventListener('input', saveQty);
});
    

function saveQty() {
    for (let i = 0; i < inputsQuantity.length; i++) {
        numberQuantity[i] = inputsQuantity[i].value;
        localStorage.setItem('qty', numberQuantity);
    }
}






// -------saving information when checkbox checked----------

const inputsForSave = document.querySelectorAll('fieldset input, fieldset select');
const saveCheck = document.getElementById('save');

let forSaveArray = Array.from(inputsForSave);
let savedData = [];

saveCheck.addEventListener('change', saveInputsFunc);

inputsForSave.forEach(e => {
    e.addEventListener('input', saveInputsFunc);
});


function saveInputsFunc() {
    if (saveCheck.checked === true) {
        for (let i = 0; i < forSaveArray.length; i++) {
            savedData[i] = forSaveArray[i].value;

            localStorage.setItem('data', savedData);
            localStorage.setItem('saveCheck', saveCheck.checked);
        }
    } else if (saveCheck.checked === false) {
        savedData = [];
        
        localStorage.removeItem('data');
        localStorage.removeItem('saveCheck');
    }
};



window.onload = function() {
    // item qty
    if (localStorage.getItem('qty') !== null) {
        numberQuantity = localStorage.getItem('qty').split(',');
        for (let i = 0; i < inputsQuantity.length; i++) {
            inputsQuantity[i].value = numberQuantity[i];
        }
    }

    calcTotal();

    
    // text inputs
    saveCheck.checked = localStorage.getItem('saveCheck');
    
    if (saveCheck.checked === true) {
        for (let i = 0; i < inputsForSave.length; i++) {
            savedData = localStorage.getItem('data').split(',');
            
            inputsForSave[i].value = savedData[i];
        }
    }
};