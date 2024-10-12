document.getElementById('recipe-search').addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase(); 
    if (query.length > 0) {
        searchRecipeSuggestions(query); 
    } else {
        hideSuggestions(); 
    }
});

function searchRecipeSuggestions(query) {
    fetch('data/recipes.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            return response.json();
        })
        .then(data => {
            const recipes = data.recipes;
            const suggestions = [];

            
            for (let id in recipes) {
                if (recipes[id].title.toLowerCase().includes(query)) {
                    suggestions.push({ id, title: recipes[id].title });
                }
            }

            showSuggestions(suggestions);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function showSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    suggestionsContainer.innerHTML = ''; 

    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }

    
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = suggestion.title;
        suggestionItem.addEventListener('click', () => {
            loadRecipeContent(suggestion.id); 
            hideSuggestions(); 
            document.getElementById('recipe-search').value = ''; 
        });
        suggestionsContainer.appendChild(suggestionItem);
    });

    suggestionsContainer.style.display = 'block'; 
}

function hideSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    suggestionsContainer.style.display = 'none'; 
    suggestionsContainer.innerHTML = ''; 
}
