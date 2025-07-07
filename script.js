import { createFromJson, createFromSQL } from '@dineug/erd-editor';

let mode = 'json';  // Начальный режим

// Переключение между режимами
function switchMode(newMode) {
    mode = newMode;
    updateEditor();
}

// Обновление интерфейса в зависимости от выбранного режима
function updateEditor() {
    const editor = document.getElementById('editor');
    
    if (mode === 'json') {
        editor.innerHTML = '<input type="file" accept=".json" onchange="loadFile(event)">';
    } else if (mode === 'sql') {
        editor.innerHTML = '<input type="file" accept=".sql" onchange="loadFile(event)">';
    } else if (mode === 'erd') {
        // Вставляем iframe для визуализации ERD с вашего сервера
        editor.innerHTML = '<iframe src="https://your-server-url/generate-erd" width="100%" height="500px"></iframe>';
    }
}

// Загрузка файла и обработка данных
function loadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        generateERD(content);
    };
    reader.readAsText(file);
}

// Генерация ERD диаграммы
function generateERD(content) {
    const url = 'https://your-server-url/generate-erd';  // Убедитесь, что сервер работает по этому адресу
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputData: content, format: mode })
    })
    .then(response => response.json())
    .then(data => {
        // Обработка данных для отображения диаграммы
        // В зависимости от ответа сервера можно обновить интерфейс
        console.log(data);  // Показать данные в консоли, можно вставить графику или элементы
    });
}
