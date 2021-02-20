const checkbox = document.getElementById('burger');
const body = document.querySelector('body');
const button = document.querySelector('label');

console.log('script is running');

// veriables for the main layer
const readMore = document.querySelector('.read-more');
const image = document.querySelector('.photo-interior');

const tabMain = [readMore, image];
const tabFooter = document.querySelectorAll('.footer a');


// variable for the menu layer
const menuLinks = document.querySelectorAll('.menu li a');




// FUNCTIONS
function noTabMain() {
    for (let i=0; i < 2; i++) {
        tabMain[i].setAttribute('tabindex', '-1');
        tabFooter[i].setAttribute('tabindex', '-1');
    }
}

function yesTabMain() {
    for (let i=0; i < 2; i++) {
        tabMain[i].setAttribute('tabindex', '0');
        tabFooter[i].setAttribute('tabindex', '0');
    }
}

function noTabMenu() {
    for (let i=0; i < 4; i++) {
        menuLinks[i].setAttribute('tabindex', '-1');
    }
}

function yesTabMenu() {
    for (let i=0; i < 4; i++) {
        menuLinks[i].setAttribute('tabindex', '0');
    }
}



// eventListeners 

window.onload = function() {
    if(checkbox.checked && window.innerWidth < 1024) {
        noTabMain();
        body.classList.add('overflow');
        
        console.log('on page load width is <1024 and menu is open');
    } else if (!checkbox.cheked && window.innerWidth < 1024) {
        noTabMenu();

        console.log('on page load width is <1024 and menu is closed');
    }
}


button.addEventListener('click', function() {
    if (checkbox.checked) {
        yesTabMain();
        body.classList.remove('overflow');
        noTabMenu();
        
        console.log('menu is closed');
    } else {
        noTabMain();
        body.classList.add('overflow');
        yesTabMenu();
        
        console.log('menu is open');
    }
});


window.addEventListener('resize', function() {
    if (window.innerWidth < 1024 && checkbox.checked) {
        noTabMain();
        body.classList.add('overflow');
        yesTabMenu();        
        
        console.log('menu is open and viewport is <1024px wide');
    } else if (window.innerWidth >= 1024) {
        yesTabMain();
        body.classList.remove('overflow');
        yesTabMenu();
        
        console.log('viewport is >=1024px wide');
    } else {
        yesTabMain();
        body.classList.remove('overflow');
        noTabMenu();
        
        console.log('viewport is <1024px wide');
    }
});