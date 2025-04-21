document.addEventListener('DOMContentLoaded', () => {
    const getJokeBtn = document.getElementById('get-joke');
    const nextJokeBtn = document.getElementById('next-joke');
    const jokeSetup = document.querySelector('.joke-setup');
    const jokePunchline = document.querySelector('.joke-punchline');
    const jokeContent = document.querySelector('.joke-content');
    const loaderContainer = document.querySelector('.loader-container');
    
    // Function to fetch a joke from the API
    async function fetchJoke() {
        showLoader();
        
        try {
            const response = await fetch('https://v2.jokeapi.dev/joke/Any');
            
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }
            
            const data = await response.json();
            displayJoke(data);
        } catch (error) {
            console.error('Error fetching joke:', error);
            jokeSetup.textContent = 'Oops! Something went wrong.';
            jokePunchline.textContent = 'Please try again later.';
            showJoke();
        }
    }
    
    // Function to display the joke
    function displayJoke(joke) {
        // First hide the joke content
        jokeContent.classList.remove('show');
        
        // Set a timeout to allow the fade-out animation to complete
        setTimeout(() => {
            jokeSetup.textContent = joke.setup;
            
            // Add a slight delay before showing the punchline
            setTimeout(() => {
                jokePunchline.textContent = joke.punchline;
                hideLoader();
                showJoke();
                
                // Show the "Next Joke" button after the first joke is loaded
                getJokeBtn.classList.add('hidden');
                nextJokeBtn.classList.remove('hidden');
            }, 500);
        }, 300);
    }
    
    // Function to show the loader
    function showLoader() {
        jokeContent.classList.remove('show');
        loaderContainer.classList.add('show');
    }
    
    // Function to hide the loader
    function hideLoader() {
        loaderContainer.classList.remove('show');
    }
    
    // Function to show the joke
    function showJoke() {
        jokeContent.classList.add('show');
    }
    
    // Event listeners for buttons
    getJokeBtn.addEventListener('click', fetchJoke);
    nextJokeBtn.addEventListener('click', fetchJoke);
    
    // Add button animation on click
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 150);
        });
    });
});