document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('click', event => {
        const category = event.target.getAttribute('data-category');
        loadCategoryContent(category);
    });
});

function loadCategoryContent(category) {
    fetch(`${category}.html`)  // Заменяет часть кода на подгрузку HTML-файлов
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.text();  // Преобразуем ответ в текст (HTML)
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;  // Вставляем HTML контент в нужный блок
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('content').innerHTML = `<p>Ошибка загрузки категории: ${error.message}</p>`;
        });
}
