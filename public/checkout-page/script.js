const customQtyInputs = document.querySelectorAll('.number-input');
const qtyInputs = document.querySelectorAll('.item__quantity');

    // saveQty() and calcTotal() variables
    let qtyInputsValue = [];
    const itemsPrice = document.querySelectorAll('.sale');
    const priceTotal = document.getElementById('price-total');
    let priceShipping = document.getElementById('price-shipping');
    priceShipping = Number(priceShipping.textContent.replace('$', ''));
    let itemsPriceArray = [];
    let priceSum;




function changeQty(e) { // changing qty in input fields
    if (e.target.className === 'plus') {
        e.currentTarget.querySelector('input[type=number').stepUp();
    } else if (e.target.className === 'minus') {
        e.currentTarget.querySelector('input[type=number').stepDown();
    }
   
    if (e.currentTarget.querySelector('input[type=number]').value === '0') {
        e.currentTarget.querySelector('.minus').disabled = true;
        e.currentTarget.querySelector('.minus').style.cssText = 'cursor: initial';
    } else if (e.currentTarget.querySelector('input[type=number]').value > '0') {
        e.currentTarget.querySelector('.minus').disabled = false;
        e.currentTarget.querySelector('.minus').style.cssText = 'cursor: pointer';
    }
    
    saveQty();
    calcTotal();
}

function saveQty() { // saving qty of items in localStorage
    for (let i = 0; i < qtyInputs.length; i++) {
        qtyInputsValue[i] = qtyInputs[i].value;
        localStorage.setItem('qty', qtyInputsValue);
    }
}

function calcTotal() { // calculates total price of items
    priceSum = 0; // resets value on each call

    for (let i = 0; i < qtyInputs.length; i++) {
        if (qtyInputs[i].value >= '0') {
            itemsPriceArray[i] = Number(itemsPrice[i].textContent.replace('$', ''));
            qtyInputsValue[i] = Number(qtyInputs[i].value);
            priceSum += itemsPriceArray[i] * qtyInputsValue[i];
        }
    }
    
    priceSum = (priceSum + priceShipping).toFixed(2);
    priceTotal.textContent = '$' + priceSum;
}


    customQtyInputs.forEach(e => {
        e.addEventListener('click', changeQty);
        e.addEventListener('input', changeQty);
    });   






// -------saving information when checkbox checked----------

const userDataInputs = document.querySelectorAll('fieldset input, fieldset select');
const saveCheck = document.getElementById('save');

let forSaveArray = Array.from(userDataInputs);
let savedData = [];

saveCheck.addEventListener('change', saveInputsFunc);

userDataInputs.forEach(e => {
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
    // restores item qty
    if (localStorage.getItem('qty') !== null) { // when item exists
        qtyInputsValue = localStorage.getItem('qty').split(',');
        for (let i = 0; i < qtyInputs.length; i++) {
            qtyInputs[i].value = qtyInputsValue[i];
        }
    }

    // disables button if qty === 0
    for (let i = 0; i < qtyInputs.length; i++) {
        if (qtyInputs[i].value === '0') {
            customQtyInputs[i].querySelector('.minus').disabled = true;
            customQtyInputs[i].querySelector('.minus').style.cssText = 'cursor: initial';
        }
    }
    
    calcTotal();

    
    // restores text inputs
    saveCheck.checked = localStorage.getItem('saveCheck');
    
    if (saveCheck.checked === true) { // don't run when localStorage is removed
        for (let i = 0; i < userDataInputs.length; i++) {
            savedData = localStorage.getItem('data').split(',');
            
            userDataInputs[i].value = savedData[i];
        }
    }
};