//При изменении значения чекбокса
let checkboxes = document.getElementsByClassName('input-checkbox');
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onclick = (e) => {
        let svg = checkboxes[i].nextElementSibling.querySelector('svg');
        if (checkboxes[i].checked) {
            svg.style.display = 'flex';
        } else {
            svg.style.display = 'none';
        }
    }
}