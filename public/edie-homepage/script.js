// ---> enabling animations and validation on the input

const sendEmailBtns = document.querySelectorAll('.email-form__button');

let showPlaceholder;
let removeError;

sendEmailBtns.forEach(e => {
    e.addEventListener('click', e => {
        let input = e.target.parentNode.querySelector('input');

        if (!(input.value === '') && e.target.className === 'email-form__button') {
            // removes error if it previously has been fired
            clearTimeout(removeError);
            input.classList.remove('email-form__input--error');

            // clear input so placeholder is visible
            input.value = '';

            e.target.classList.add('email-form__button--sent');
            e.target.disabled = true;

            input.classList.add('email-form__input--sent');
            input.placeholder = 'Your email has been sent!';
            input.disabled = true;
            
            showPlaceholder = setTimeout(() => {
                e.target.textContent = '';
                input.classList.add('show-placeholder');
            }, 500);
        } else if (input.value === '' && e.target.className === 'email-form__button') {
            clearTimeout(removeError);

            input.placeholder = 'There\'s nothing to sent!';
            input.classList.add('email-form__input--error');
            e.target.classList.add('email-form__button--error');
            
            let removeAnim = setTimeout(() => {
                e.target.classList.remove('email-form__button--error');
            }, 200);

            removeError = setTimeout(() => {
                input.placeholder = 'Email';
                input.classList.remove('email-form__input--error');
            }, 3000);
        }
    });
});





// ---> changing aria-label of the burger button according to the state of the menu (open/closed)
const burgerBtn = document.getElementById('burger');

burgerBtn.addEventListener('click', () => {
    if (burgerBtn.getAttribute('aria-label') === 'open menu') {
        burgerBtn.setAttribute('aria-label', 'close menu');
    } else if (burgerBtn.getAttribute('aria-label') === 'close menu') {
        burgerBtn.setAttribute('aria-label', 'open menu');
    }
});





// ---> making invisible to user item don't tabbale
// ---> therfore improving UX

const checkbox = document.getElementById('burger__checkbox');
const body = document.querySelector('body');

const evrtngElseArray = document.querySelectorAll('main input, main a, footer input, footer a');
const menuArray = document.querySelectorAll('header a');




// functions
function noTabMain() {
    for (let i=0; i < evrtngElseArray.length; i++) {
        evrtngElseArray[i].setAttribute('tabindex', '-1');
    }
}

function yesTabMain() {
    for (let i=0; i < evrtngElseArray.length; i++) {
        evrtngElseArray[i].setAttribute('tabindex', '0');
    }
}

function noTabMenu() {
    for (let i=0; i < menuArray.length; i++) {
        menuArray[i].setAttribute('tabindex', '-1');
    }
}

function yesTabMenu() {
    for (let i=0; i < menuArray.length; i++) {
        menuArray[i].setAttribute('tabindex', '0');
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


burgerBtn.addEventListener('click', function() {
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


// full navigation through keyboard

const itemsToNavigate = document.querySelectorAll('#burger, .email-form__button, .email-form__input');

itemsToNavigate.forEach(e => {
    e.addEventListener('keydown', e => {
        if (e.code === 'Enter') {
            if (e.target.classList.contains('email-form__input')) {
                e.target.parentNode.querySelector('.email-form__button').click();
            } else {
                e.target.click();
            } 
        }
    });
});

