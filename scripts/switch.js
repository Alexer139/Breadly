document.querySelectorAll('.category').forEach(item => {
    item.addEventListener('click', event => {
        const categoryElement = event.target.closest('.category');
        
        document.querySelectorAll('.category').forEach(el => el.classList.remove('active'));

        categoryElement.classList.add('active');

        const category = categoryElement.getAttribute('data-category');

        console.log('Категория:', category); 

        loadCategoryContent(category);
    });
});

function loadCategoryContent(category) {
    fetch(`category's/${category}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('main-page').innerHTML = data;
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('main-page').innerHTML = `<p>Ошибка загрузки категории: ${error.message}</p>`;
        });
}
