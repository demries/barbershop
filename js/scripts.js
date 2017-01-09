// Находим объект с классом login
var link = document.querySelector('.login');
// Находим модальное окно с классом modal-content
var popup = document.querySelector('.modal-content');
// Находим кнопку закрытия модального окна с классом modal-content-close
var close = popup.querySelector('.modal-content-close');
// Находим внутри модального окна поле логина по атрибуту
var login = popup.querySelector('[name="login"]');
// Находим внутри модального окна поле пароля по атрибуту
var password = popup.querySelector('[name="password"]');
// Форма модального окна
var form = popup.querySelector('form');
// Получаем значение login из локального хранилища
var storage = localStorage.getItem('login');

// Отлавливаем событие 'click' у объекта с классом login
link.addEventListener('click', function(e) {
    e.preventDefault(); // Отменяем действие по умолчанию

    // Добавляем к модальному окну класс modal-content-show
    popup.classList.add('modal-content-show');

    if ( storage ) {
        login.value = storage;
        password.focus();
    } else login.focus(); // Добавляем focus к поле логину на форме входа
});

// Отлавливаем событие 'click' у объекта с классом close
close.addEventListener('click', function(e) {
    e.preventDefault(); // Отменяем действие по умолчанию

    // Удаляем у модального окна класс modal-content-show
    popup.classList.remove('modal-content-show');
});

// Отлавливаем событие отправки формы модального окна
form.addEventListener('submit', function(e) {
    if ( !login.value || !password.value ) {
        e.preventDefault();
        console.log('Нужно ввести логин и пароль');
    } else {
        localStorage.setItem('login', login.value);
    }
});

// Закрытие модального окна по нажатию на Esc
window.addEventListener('keydown', function(e) {
    if ( e.keyCode === 27 && popup.classList.contains('modal-content-show') )
        popup.classList.remove('modal-content-show');
});