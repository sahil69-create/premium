// Admin panel functionality
let ggMouseProCodes = JSON.parse(localStorage.getItem('ggMouseProCodes')) || [
    'GMP-1234-ABCD-5678',
    'GMP-5678-EFGH-9012',
    'GMP-9012-IJKL-3456',
    'GMP-3456-MNOP-7890',
    'GMP-7890-QRST-1234'
];

let ggGameSpaceCodes = JSON.parse(localStorage.getItem('ggGameSpaceCodes')) || [
    'GGS-1234-ABCD-5678',
    'GGS-5678-EFGH-9012',
    'GGS-9012-IJKL-3456',
    'GGS-3456-MNOP-7890',
    'GGS-7890-QRST-1234'
];

let sales = JSON.parse(localStorage.getItem('sales')) || [];

// DOM elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const addCodeForm = document.getElementById('add-code-form');
const mouseCodesList = document.getElementById('mouse-codes-list');
const gameCodesList = document.getElementById('game-codes-list');
const salesHistory = document.getElementById('sales-history');

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('open');
        }
    });
}

// Update dashboard stats
function updateStats() {
    document.getElementById('total-sales').textContent = sales.length;
    document.getElementById('total-revenue').textContent = '₹' + sales.reduce((sum, sale) => sum + sale.price, 0).toFixed(2);
    document.getElementById('mouse-codes-left').textContent = ggMouseProCodes.length;
    document.getElementById('game-codes-left').textContent = ggGameSpaceCodes.length;
}

// Display codes
function displayCodes() {
    mouseCodesList.innerHTML = '';
    ggMouseProCodes.forEach((code, index) => {
        const codeItem = document.createElement('div');
        codeItem.className = 'code-item';
        codeItem.innerHTML = `
            <span>${code}</span>
            <button class="btn btn-danger btn-sm" onclick="removeCode('mouse', ${index})">Remove</button>
        `;
        mouseCodesList.appendChild(codeItem);
    });

    gameCodesList.innerHTML = '';
    ggGameSpaceCodes.forEach((code, index) => {
        const codeItem = document.createElement('div');
        codeItem.className = 'code-item';
        codeItem.innerHTML = `
            <span>${code}</span>
            <button class="btn btn-danger btn-sm" onclick="removeCode('game', ${index})">Remove</button>
        `;
        gameCodesList.appendChild(codeItem);
    });
}

// Display sales history
function displaySalesHistory() {
    salesHistory.innerHTML = '';
    sales.forEach((sale, index) => {
        const saleItem = document.createElement('div');
        saleItem.className = 'code-item';
        const date = new Date(sale.date).toLocaleString();
        saleItem.innerHTML = `
            <div>
                <strong>${sale.product}</strong> - ${sale.code}<br>
                <small>${date} - ₹${sale.price}</small>
            </div>
        `;
        salesHistory.appendChild(saleItem);
    });
}

// Add codes form submission
addCodeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = document.getElementById('product-select').value;
    const codesText = document.getElementById('new-codes').value.trim();
    
    if (codesText) {
        const newCodes = codesText.split('\n').map(code => code.trim()).filter(code => code);
        
        if (product === 'gg-mouse-pro') {
            ggMouseProCodes.push(...newCodes);
            localStorage.setItem('ggMouseProCodes', JSON.stringify(ggMouseProCodes));
        } else {
            ggGameSpaceCodes.push(...newCodes);
            localStorage.setItem('ggGameSpaceCodes', JSON.stringify(ggGameSpaceCodes));
        }
        
        document.getElementById('new-codes').value = '';
        updateStats();
        displayCodes();
        alert(`${newCodes.length} codes added successfully!`);
    }
});

// Remove code function
function removeCode(type, index) {
    if (confirm('Are you sure you want to remove this code?')) {
        if (type === 'mouse') {
            ggMouseProCodes.splice(index, 1);
            localStorage.setItem('ggMouseProCodes', JSON.stringify(ggMouseProCodes));
        } else {
            ggGameSpaceCodes.splice(index, 1);
            localStorage.setItem('ggGameSpaceCodes', JSON.stringify(ggGameSpaceCodes));
        }
        updateStats();
        displayCodes();
    }
}

// Initialize
updateStats();
displayCodes();
displaySalesHistory();
