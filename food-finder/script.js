document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results-container');
    const loaderContainer = document.querySelector('.loader-container');
    const noResults = document.querySelector('.no-results');
    
    // Focus on search input when page loads
    searchInput.focus();
    
    // Function to fetch recipes from the API
    async function fetchRecipes(query) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return { meals: null };
        }
    }
    
    // Function to display recipes
    function displayRecipes(recipes) {
        resultsContainer.innerHTML = '';
        
        if (!recipes || recipes.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        recipes.forEach(recipe => {
            // Get all ingredients and measures
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];
                
                if (ingredient && ingredient.trim() !== '') {
                    ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`);
                }
            }
            
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            
            recipeCard.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image">
                <div class="recipe-details">
                    <div class="recipe-header">
                        <h2 class="recipe-title">${recipe.strMeal}</h2>
                        <span class="recipe-category">${recipe.strCategory}</span>
                    </div>
                    
                    <div class="recipe-instructions">
                        <h3>Instructions</h3>
                        <p>${recipe.strInstructions}</p>
                    </div>
                    
                    <div class="recipe-ingredients">
                        <h3>Ingredients</h3>
                        <ul class="ingredients-list">
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            resultsContainer.appendChild(recipeCard);
        });
    }
    
    // Function to handle search
    async function handleSearch() {
        const query = searchInput.value.trim();
        
        if (query === '') {
            alert('Please enter a food name to search');
            return;
        }
        
        // Show loader
        loaderContainer.style.display = 'flex';
        resultsContainer.innerHTML = '';
        noResults.style.display = 'none';
        
        // Fetch recipes
        const data = await fetchRecipes(query);
        
        // Hide loader
        loaderContainer.style.display = 'none';
        
        // Display recipes
        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            displayRecipes([]);
        }
    }
    
    // Event listeners
    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Add animation to search button
    searchBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    searchBtn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    searchBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});