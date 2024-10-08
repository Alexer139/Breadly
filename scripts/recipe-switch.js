function loadRecipeContent(recipeId) {
    fetch('data/recipes.json') // Загружаем JSON файл с данными рецептов
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.json();
        })
        .then(data => {
            const recipe = data.recipes[recipeId]; // Получаем данные конкретного рецепта

            console.log(recipe.ingredients);

            const ingrendientsList = recipe.ingredients
                .filter(item => item.trim() !== '')
                .map(item => `<li>${item.trim()}</li>`)
                .join('');
            
            if (recipe) {
                const recipeHTML = `
                    <div class="mainRecipePage">
        
                        <div class="picAndNamed">

                            <div class="pictureRecipe">
                                <img src="${recipe.image}" alt="${recipe.title}">
                            </div>

                            <div class="nameAndIngrend">

                                <div class="name">
                                    ${recipe.title}
                                </div>
                                <div class="ingrendients">
                                    Ингредиенты:
                                </div>
                                <div class="components" ingredients-list>
                                    <ul>
                                        ${ingrendientsList}
                                    </ul>
                                </div>

                            </div>

                        </div>

                        <div class="description">
                        
                            <div class="preparation">
                                Приготовление:
                            <div>

                            <div class="onePart">
                                <span>1</span> ${recipe.instructOne}
                            <div>
                            <div class="twoPart">
                                <span>2</span> ${recipe.instructTwo}
                            <div>
                            <div class="threePart">
                                <span>3</span> ${recipe.instructThree}
                            <div>
                            <div class="fourPart">
                                <span>4</span> ${recipe.instructFour}
                            <div> 
                        </div>
                    </div>
                `;

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
