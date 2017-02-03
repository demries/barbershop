var html = document.documentElement;
html.className = html.className.replace('no-js', 'js'); // если подключился js

try {
    var gallery = document.querySelector('.gallery');
    gallery.classList.add('gallery-live');

    // Добавляем управляющие элементы
    // Внимание! Плохая практика.
    // Только для быстрой демонстрации подхода.
    var buttons = '<button class="btn gallery-prev">Назад</button>' +
                  '<button class="btn gallery-next">Вперёд</button>';

    gallery.innerHTML = gallery.innerHTML + buttons;

    // Зададим начальное состояние кнопок
    var prev = document.querySelector('.gallery-prev');
    prev.setAttribute('disabled', 'disabled');

    // Инициализация завершена
    // Далее - типовой код работы галереи:
    // обработка событий, переключение слайдов и т.д.
} catch(e) {
    console.log(e);
}


var overlay = document.querySelector('.modal-overlay');
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

// Для карты
var mapOpen = document.querySelector('#js-open-map');
var mapPopup = document.querySelector('.modal-content-map');

// Отлавливаем событие 'click' у объекта с классом login
link.addEventListener('click', function(e) {
    e.preventDefault(); // Отменяем действие по умолчанию

    // Добавляем к модальному окну класс modal-content-show
    overlay.style.display = 'block';
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
    popup.classList.remove('modal-error');
    overlay.style.display = '';
});

// Отлавливаем событие отправки формы модального окна
form.addEventListener('submit', function(e) {
    if ( !login.value || !password.value ) {
        e.preventDefault();
        popup.classList.remove('modal-error');
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add('modal-error');
        console.log('Нужно ввести логин и пароль');
    } else {
        localStorage.setItem('login', login.value);
    }
});

// для карты
if ( mapPopup !== null ) {
    var mapClose = mapPopup.querySelector('.modal-content-close');

    mapOpen.addEventListener('click', function(e) {
        e.preventDefault();

        overlay.style.display = 'block';
        mapPopup.classList.add('modal-content-show');
    });

    mapClose.addEventListener('click', function(e) {
        e.preventDefault();

        mapPopup.classList.remove('modal-content-show');
        overlay.style.display = '';
    });
}

// Закрытие модального окна по нажатию на Esc
window.addEventListener('keydown', function(e) {
    if ( e.keyCode === 27 && popup.classList.contains('modal-content-show') ) {
        popup.classList.remove('modal-content-show');
        popup.classList.remove('modal-error');
        overlay.style.display = '';
    }

    if ( e.keyCode === 27 && mapPopup.classList.contains('modal-content-show') ) {
        mapPopup.classList.remove('modal-content-show');
        overlay.style.display = '';
    }
});