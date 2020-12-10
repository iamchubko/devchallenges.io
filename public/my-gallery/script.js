// https://davidwalsh.name/event-delegate


const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');

const galleryItems = document.querySelectorAll('.container');

galleryItems.forEach(e => {
    e.style = 'cursor: pointer';
});




gallery.addEventListener('click', interactiveImages);
gallery.addEventListener('keydown', interactiveImages);
    
function interactiveImages(e) {
    // console.log('some element has been clicked');
    if (e.target.matches('img.photo') && e.target.parentNode.classList.value === 'container') {
        // e.target is .photo

        console.log(e.target.id, 'has been clicked');
            
        e.target.parentNode.classList.add('open');
        body.style = 'overflow: hidden;';

        e.target.parentNode.style = 'transition: unset; cursor: pointer';
        e.target.style = 'transition: unset; cursor: initial';
    } else if (e.key === 'Enter' && e.target.classList.value === 'container') {
        console.log('Enter has been pressed on', e.target.id);
        
        e.target.classList.add('open');
        body.style = 'overflow: hidden;';
        e.target.style = 'transition: unset; cursor: pointer';
        e.target.firstElementChild.style = 'transition: unset; cursor: initial';

    } else if (e.target.classList[1] === 'open' || e.key === 'Enter') {
        // e.target is .container

        console.log('image has been closed');
        
        e.target.classList.remove('open');
        body.style = 'overflow: unset;';

        let returnTransition = setTimeout(function() {
            e.target.style = 'transition: transform .2s; cursor:initial';
            e.target.firstElementChild.style = 'transition: transform .2s; cursor: pointer';
        }, 10);
    }
}