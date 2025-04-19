function addItem() {
    const input = document.getElementById('new-item');
    const value = input.value.trim();
    
    if (value) {
        const list = document.getElementById('grocery-list');
        
        const li = document.createElement('li');
        li.className = 'grocery-item';
        li.innerHTML = `
            <label>
                <input type="checkbox">
                <span class="checkbox-custom">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </span>
                <span class="item-text">${value}</span>
            </label>
            <button class="delete-btn" onclick="removeItem(this)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        `;
        
        list.appendChild(li);
        input.value = '';
        updateItemCount();
    }
}

function removeItem(button) {
    const listItem = button.parentElement;
    listItem.style.opacity = '0';
    listItem.style.transform = 'translateY(10px)';
    listItem.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        listItem.remove();
        updateItemCount();
    }, 300);
}

function clearCompleted() {
    const checkedItems = document.querySelectorAll('.grocery-item input[type="checkbox"]:checked');
    
    checkedItems.forEach(item => {
        const listItem = item.closest('.grocery-item');
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateY(10px)';
        listItem.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            listItem.remove();
            updateItemCount();
        }, 300);
    });
}

function updateItemCount() {
    const totalItems = document.querySelectorAll('.grocery-item').length;
    const checkedItems = document.querySelectorAll('.grocery-item input[type="checkbox"]:checked').length;
    const remainingItems = totalItems - checkedItems;
    
    document.getElementById('items-count').textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    document.getElementById('items-left').textContent = `${remainingItems} item${remainingItems !== 1 ? 's' : ''} left`;
}

// Add event listener for Enter key
document.getElementById('new-item').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

updateItemCount();

document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
        updateItemCount();
    }
});