const echoServer = "wss://echo-ws-service.herokuapp.com";
const btnSend = document.querySelector('.btn_send');
const chat = document.querySelector('.chat');
const inputField = document.getElementById('myInput');
const messageElement = document.getElementById('message');
const btnGeo = document.querySelector('.btn_geolocation');

// Функция для добавления сообщения в чат
const addMessage = (content, className) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(className);
    messageDiv.textContent = content;
    chat.appendChild(messageDiv);
};

// Создаем WebSocket-соединение
const websocket = new WebSocket(echoServer);

// Обработчик события при открытии соединения
websocket.onopen = function() {
    console.log("Соединение установлено");
};

websocket.onmessage = function(event) {
    addMessage(event.data, 'messageServer'); // Используем функцию для добавления сообщения
};

// Обработчик ошибок
websocket.onerror = function(error) {
    console.error("Ошибка WebSocket:", error);
};

// Обработчик события отправки сообщения
btnSend.addEventListener('click', (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const input = inputField.value.trim();

    if (input === '') {
        messageElement.textContent = 'Пожалуйста, введите что-то в поле!';
    } else {
        addMessage(input, 'messageUser'); // Используем функцию для добавления сообщения
        websocket.send(input); // Отправляем сообщение на сервер
        inputField.value = ''; // Очищаем поле ввода
    }
});

const error = () => {
    addMessage('Невозможно получить ваше местоположение', 'messageUser');
};


const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    
    const link = document.createElement('a');
    link.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    link.textContent = 'Гео-локация';
    link.target = '_blank'; // Открыть ссылку в новой вкладке

    addMessage('', 'messageUser'); // Добавляем текст
    const messageUser = chat.lastChild; // Получаем последнее добавленное сообщение
    messageUser.appendChild(link); // Добавляем ссылку в последнее сообщение
};


btnGeo.addEventListener('click', (event) => {
    event.preventDefault();
    if (!navigator.geolocation) {
        addMessage('Геолокация не поддерживается вашим браузером', 'messageUser');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
