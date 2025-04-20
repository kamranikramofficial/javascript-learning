document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const successMessage = document.getElementById('success-message');
    
    // Add event listeners for real-time validation
    nameInput.addEventListener('blur', () => validateField(nameInput, validateName));
    emailInput.addEventListener('blur', () => validateField(emailInput, validateEmail));
    passwordInput.addEventListener('blur', () => validateField(passwordInput, validatePassword));
    
    // Add input event listeners for clearing errors when user types
    nameInput.addEventListener('input', () => clearError(nameInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
    passwordInput.addEventListener('input', () => clearError(passwordInput));
    
    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate all fields
      const isNameValid = validateField(nameInput, validateName);
      const isEmailValid = validateField(emailInput, validateEmail);
      const isPasswordValid = validateField(passwordInput, validatePassword);
      
      // If all fields are valid, show success message
      if (isNameValid && isEmailValid && isPasswordValid) {
        form.style.display = 'none';
        successMessage.classList.remove('hidden');
        setTimeout(() => {
          successMessage.classList.add('show');
        }, 100);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          successMessage.classList.remove('show');
          setTimeout(() => {
            successMessage.classList.add('hidden');
          }, 500);
          
          // Clear success states
          clearSuccess(nameInput);
          clearSuccess(emailInput);
          clearSuccess(passwordInput);
        }, 3000);
      }
    });
    
    // Validation functions
    function validateName(name) {
      if (!name.trim()) {
        return 'Name is required';
      }
      return '';
    }
    
    function validateEmail(email) {
      if (!email.trim()) {
        return 'Email is required';
      } else if (!email.includes('@gmail.com')) {
        return 'Email must contain @gmail.com';
      }
      return '';
    }
    
    function validatePassword(password) {
      if (!password) {
        return 'Password is required';
      } else if (password.length < 6) {
        return 'Password must be at least 6 characters';
      }
      return '';
    }
    
    // Helper functions
    function validateField(input, validationFn) {
      const value = input.value;
      const errorMessage = validationFn(value);
      
      if (errorMessage) {
        showError(input, errorMessage);
        return false;
      } else {
        showSuccess(input);
        return true;
      }
    }
    
    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message');
      
      input.classList.remove('success');
      input.classList.add('error');
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
    
    function showSuccess(input) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message');
      
      input.classList.remove('error');
      input.classList.add('success');
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
    
    function clearError(input) {
      const formGroup = input.parentElement;
      const errorElement = formGroup.querySelector('.error-message');
      
      input.classList.remove('error');
      errorElement.classList.remove('visible');
    }
    
    function clearSuccess(input) {
      input.classList.remove('success');
    }
  });