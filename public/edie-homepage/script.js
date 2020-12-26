// ---> enabling animations and validation on the Input

const sendEmailBtns = document.querySelectorAll('.email-form__button');

let errorMessage;
let showPlaceholder;
let removeError;
let removeValues;

const forms = document.querySelectorAll('.email-form__container');


// prevent form from sending itself and reloading the page
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
forms.forEach(e => {
    e.addEventListener('submit', e => {
        e.preventDefault();
    });
});

sendEmailBtns.forEach(e => {
    e.addEventListener('click', e => {
        // correct elements will be triggered no matter what inputs you choose
        let currentForm = e.target.parentNode;
        let currentInput = e.target.parentNode.querySelector('input');
        let currentBtn = e.target.parentNode.querySelector('a');


        // animation of shaking button when error
        function shakingBtn() {
            currentBtn.classList.add('email-form__button--error');
                    
            let removeAnim = setTimeout(() => {
                currentBtn.classList.remove('email-form__button--error');
            }, 200);
        }


        if (!(currentInput.value === '') && currentInput.validity.valid && currentBtn.className === 'email-form__button') {
            // removes error if it previously has been fired
            clearTimeout(removeError);

            // clear currentInput so placeholder is visible
            
            currentBtn.classList.add('email-form__button--sent');
            currentBtn.disabled = true;
            
            currentInput.classList.add('email-form__input--sent');
            currentInput.disabled = true;
            currentInput.placeholder = 'Your email has been sent!';
            
            removeValues = setTimeout(() => {
                currentInput.value = '';
                currentBtn.textContent = '';

                showPlaceholder = setTimeout(() => {
                    currentInput.classList.add('show-placeholder');
                }, 300);
            }, 250);


        } else if (!currentInput.checkValidity()) {
            shakingBtn();
            // triggers default pop up validation on click of the button
            currentForm.reportValidity();

        } else if (currentInput.value === '' && currentBtn.className === 'email-form__button') {
            clearTimeout(removeError);

            currentInput.placeholder = 'There\'s nothing to sent!';
            currentInput.classList.add('email-form__input--error');
            shakingBtn();

            removeError = setTimeout(() => {
                currentInput.placeholder = 'Email';
                currentInput.classList.remove('email-form__input--error');
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





// ---> making invisible to user item don't tabbable
// ---> therfore improving UX

const checkbox = document.getElementById('burger__checkbox');
const body = document.querySelector('body');

const evrtngElseArray = document.querySelectorAll('main currentInput, main a, footer currentInput, footer a');
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
        
        // console.log('on page load width is <1024 and menu is open');
    } else if (!checkbox.cheked && window.innerWidth < 1024) {
        noTabMenu();

        // console.log('on page load width is <1024 and menu is closed');
    }
}


burgerBtn.addEventListener('click', function() {
    if (checkbox.checked) {
        yesTabMain();
        body.classList.remove('overflow');
        noTabMenu();
        
        // console.log('menu is closed');
    } else {
        noTabMain();
        body.classList.add('overflow');
        yesTabMenu();
        
        // console.log('menu is open');
    }
});


window.addEventListener('resize', function() {
    if (window.innerWidth < 1024 && checkbox.checked) {
        noTabMain();
        body.classList.add('overflow');
        yesTabMenu();        
        
        // console.log('menu is open and viewport is <1024px wide');
    } else if (window.innerWidth >= 1024) {
        yesTabMain();
        body.classList.remove('overflow');
        yesTabMenu();
        
        // console.log('viewport is >=1024px wide');
    } else {
        yesTabMain();
        body.classList.remove('overflow');
        noTabMenu();
        
        // console.log('viewport is <1024px wide');
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



// clicking links in mobile menu makes menu close 
// https://www.sitepoint.com/javascript-media-queries/
const mq = window.matchMedia( "(min-width: 1024px" );

menuArray.forEach(e => {
    e.addEventListener('click', e => {
        if (!mq.matches) {
            console.log('dammit');
            burgerBtn.click();
        }
    });
});