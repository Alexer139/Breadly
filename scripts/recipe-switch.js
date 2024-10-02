function loadRecipeContent(recipeId) {
    fetch('data/recipes.json')  // Загружаем JSON файл
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
                document.getElementById('main-page').innerHTML = recipeHTML;
            } else {
                document.getElementById('main-page').innerHTML = `<p>Рецепт не найден.</p>`;
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('main-page').innerHTML = `<p>Ошибка загрузки рецепта: ${error.message}</p>`;
        });
}
