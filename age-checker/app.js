function checkAge() {
    const age = parseInt(document.getElementById('age').value);
    const result = document.getElementById('result');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    result.classList.remove('minor', 'adult', 'senior');
    
    if (isNaN(age) || age <= 0) {
        result.classList.add('minor');
        resultTitle.textContent = 'Invalid Age';
        resultMessage.textContent = 'Please enter a valid age.';
    } else if (age < 18) {
        result.classList.add('minor');
        resultTitle.textContent = 'Minor';
        resultMessage.textContent = `You are ${age} years old. Access restricted to 18+ content.`;
    } else if (age >= 18 && age < 65) {
        result.classList.add('adult');
        resultTitle.textContent = 'Adult';
        resultMessage.textContent = `You are ${age} years old. You have full access.`;
    } else {
        result.classList.add('senior');
        resultTitle.textContent = 'Senior';
        resultMessage.textContent = `You are ${age} years old. You qualify for senior benefits.`;
    }
    
    // Show result with animation
    result.classList.add('show');
}