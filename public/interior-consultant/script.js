const checkbox = document.getElementById('burger');
const navBar = document.querySelector('nav');
const body = document.querySelector('body');
const button = document.querySelector('label');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

console.log('script is running');


function hideMainPage() {
    main.classList.add('hidden');
    footer.classList.add('hidden');
}

function unhideMainPage() {
    main.classList.remove('hidden');
    footer.classList.remove('hidden');
}

function menuOpen() {
    navBar.classList.remove('hidden');
    body.classList.add('overflow');
}

function menuClosed() {
    navBar.classList.add('hidden');
    body.classList.remove('overflow');
}


window.onload = function() {
    if(checkbox.checked && window.innerWidth <= 1024) {
        menuOpen();
        hideMainPage();

        console.log('page is refreshed and menu is still open');
    } else if (window.innerWidth <= 1024) {
        navBar.classList.add('hidden');

        console.log('on page load width is <1024 and menu is closed');
    }
}

button.addEventListener('click', function() {
    if (checkbox.checked) {
        unhideMainPage();
        let work = setTimeout(menuClosed, 600);
        
        console.log('menu is closed');
    } else {
        menuOpen();
        let hideMain = setTimeout(hideMainPage, 600);

        console.log('menu is open');
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth <= 1024 && checkbox.checked) {
        menuOpen();
        hideMainPage();        

        console.log('window size is <1024px and menu is still open')
    } else {
        menuClosed();
        unhideMainPage();
        
        console.log('window size is >1024px and menu is still open')
    }
});