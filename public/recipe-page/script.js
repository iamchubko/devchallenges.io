// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
// https://stackoverflow.com/questions/14544104/checkbox-check-event-listener

const checkboxes = document.querySelectorAll('input[type=checkbox]');
let checked = [];

checkboxes.forEach(e => {
    e.addEventListener('change', function() {
        checked = 
        Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => i.value); // Use Array.map to extract only the checkbox values from the array of objects.

        localStorage.setItem('checked', checked);
    });
});

checked = localStorage.getItem('checked').split(',');


window.onload = function() {
    for (let i = 0; i < checkboxes.length; i++) {

        for (let j = 0; j < checked.length; j++) {
            if (checkboxes[i].value === checked[j]) {
                checkboxes[i].checked = true;
            }
        }

    }
};

