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


//Запрет на ввод цифр в ИМЕНИ
let inputName = $('#user_name').eq(0);
for (let i = 0; i < inputName.length; i++) {
    inputName.eq(i).on('keydown', function (e) {
        let number = parseInt(e.key);
        if (!isNaN(number)) {
            return false; // Отменяем ввод цифр
        }
    });
}

//скрипт для отправки сообщений, связан с google sheets
let scriptURL = 'https://script.google.com/macros/s/AKfycbzvAvOmWEl2bX2I0vQTUwtgwGGvlb8y_jGigX6RXpUNCtmKgBKaBTPxjzI4rY8WA3yK/exec'
let form = document.forms['submit-to-google-sheet']
let loader = $('.loader-main').eq(0);
let inputEmail = $('#user_email');
let inputComment = $('#user_comment');
let buttonApplication = $('#buttonApplication');
let checkboxInput = $('#checkboxInput');


buttonApplication.on('click', function (e) {
    e.preventDefault();

    loader.css('display', 'flex');
    $('.error-input').hide();

    let hasError = errorValidation(inputName, inputEmail, inputComment, checkboxInput);

    if (!hasError) {
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                loader.hide();
                alert("Спасибо за заявку, я свяжусь с Вами в ближайшее время!");
                inputName.val('');
                inputEmail.val('');
                inputComment.val('');
                checkboxInput.prop('checked', false); // сбросить чекбокс
                $('#checkbox svg').css('display', 'none'); // Скрываем SVG галочек
            })
            .catch(error => {
                loader.hide();
                console.error('Error!', error.message);
            });
    } else {
        loader.hide();
    }
});

$('#burger').click(function () {
    $('#menu').addClass('open');
});

$('#menu *').each(function () {
    $(this).on('click', function () {
        $('#menu').removeClass('open');
    });
});

function errorValidation(nameInput, emailInput, commentInput, checkbox) {
    let hasError = false;
    if (!nameInput.val()) {
        nameInput.next().show();
        nameInput.css('border-color', 'red');
        hasError = true;
    } else {
        nameInput.css('border-color', 'white');
    }

    if (!emailInput.val()) {
        emailInput.next().show();
        emailInput.css('border-color', 'red');
        hasError = true;
    } else {
        emailInput.css('border-color', 'white');
    }

    if (!checkbox.is(':checked')) {
        checkbox.next().css('border-color', 'red');
        checkbox.next().next().css('color', 'red');
        hasError = true;
    } else {
        checkbox.next().css('border-color', 'white');
        checkbox.next().next().css('color', 'white');
    }

    return hasError;
}