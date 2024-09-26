// Находим все элементы категорий
document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('click', event => {
        // Получаем элемент категории (если клик был по тексту)
        const categoryElement = event.target.closest('.category');
        
        // Убираем класс "active" у всех категорий
        document.querySelectorAll('.category').forEach(el => el.classList.remove('active'));

        // Добавляем класс "active" к выбранной категории
        categoryElement.classList.add('active');

        // Получаем значение data-category для выбранной категории
        const category = categoryElement.getAttribute('data-category');

        // Вызываем функцию загрузки контента для выбранной категории
        loadCategoryContent(category);
    });
});

// Функция для загрузки контента через fetch
function loadCategoryContent(category) {
    fetch(`${category}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.text();
        })
        .then(data => {
            // Вставляем загруженный HTML в блок с контентом
            document.getElementById('main-page').innerHTML = data;
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('main-page').innerHTML = `<p>Ошибка загрузки категории: ${error.message}</p>`;
        });
}
