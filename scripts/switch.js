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

function attachRecipeHandlers() {
    document.querySelectorAll('.cart-category').forEach(item => {
        item.addEventListener('click', event => {
            const recipeElement = event.currentTarget;
            const recipeId = recipeElement.getAttribute('data-recipe'); // ID рецепта в атрибуте data-recipe

            console.log('Рецепт ID:', recipeId);

            loadRecipeContent(recipeId); // Загружаем рецепт по ID
        });
    });
}


function loadCategoryContent(category) {
    fetch(`categorys/${category}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('main-page').innerHTML = data;

            attachRecipeHandlers();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('main-page').innerHTML = `<p>Ошибка загрузки категории: ${error.message}</p>`;
        });
}
