import { createFromJson, createFromSQL } from '@dineug/erd-editor';

let mode = 'json';  // Начальный режим

function switchMode(newMode) {
    mode = newMode;
    updateEditor();
}

function updateEditor() {
    const editor = document.getElementById('editor');
    
    if (mode === 'json') {
        // Отображение поля для загрузки JSON
        editor.innerHTML = '<input type="file" accept=".json" onchange="loadFile(event)">';
    } else if (mode === 'sql') {
        // Отображение поля для загрузки SQL
        editor.innerHTML = '<input type="file" accept=".sql" onchange="loadFile(event)">';
    } else if (mode === 'erd') {
        // Визуализация ERD (потребуется сервер для генерации ERD, здесь будет iframe)
        editor.innerHTML = '<iframe src="https://your-server-url/generate-erd" width="100%" height="500px"></iframe>';
    }
}

function loadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        generateERD(content);
    };
    reader.readAsText(file);
}

function generateERD(content) {
    const url = 'https://your-server-url/generate-erd';  // Ссылка на сервер для генерации диаграмм
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputData: content, format: mode })
    })
    .then(response => response.json())
    .then(data => {
        // Отображаем диаграмму (предполагается, что сервер вернёт HTML или данные для визуализации)
        console.log(data);
    });
}
