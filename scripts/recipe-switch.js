// Обрабатываем клики на каждом блоке рецепта
document.querySelectorAll('.recipe-block').forEach(block => {
    block.addEventListener('click', event => {
        const recipeElement = event.currentTarget;
        const recipeId = recipeElement.getAttribute('data-recipe');

        console.log('Рецепт:', recipeId);

        // Загружаем данные рецепта
        loadRecipeContent(recipeId);
    });
});

// Функция загрузки содержимого для выбранного рецепта из JSON
function loadRecipeContent(recipeId) {
    fetch('recipes.json')  // Загружаем JSON файл
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.json();
        })
        .then(data => {
            const recipe = data.recipes[recipeId];
            
            if (recipe) {
                // Генерируем HTML на основе данных рецепта
                const recipeHTML = `
                    <h2>${recipe.title}</h2>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <p><strong>Описание:</strong> ${recipe.description}</p>
                    <h3>Ингредиенты:</h3>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                    <h3>Инструкции:</h3>
                    <p>${recipe.instructions}</p>
                `;

                // Вставляем сгенерированный HTML в элемент с id 'recipe-content'
                document.getElementById('recipe-content').innerHTML = recipeHTML;
            } else {
                document.getElementById('recipe-content').innerHTML = `<p>Рецепт не найден.</p>`;
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('recipe-content').innerHTML = `<p>Ошибка загрузки рецепта: ${error.message}</p>`;
        });
}
