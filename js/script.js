// Mock data for premium codes
let ggMouseProCodes = [
    'GMP-1234-ABCD-5678',
    'GMP-5678-EFGH-9012',
    'GMP-9012-IJKL-3456',
    'GMP-3456-MNOP-7890',
    'GMP-7890-QRST-1234'
];

let ggGameSpaceCodes = [
    'GGS-1234-ABCD-5678',
    'GGS-5678-EFGH-9012',
    'GGS-9012-IJKL-3456',
    'GGS-3456-MNOP-7890',
    'GGS-7890-QRST-1234'
];

// Sales tracking
let sales = JSON.parse(localStorage.getItem('sales')) || [];

// DOM elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const buyButtons = document.querySelectorAll('.buy-button');
const paymentModal = document.getElementById('payment-modal');
const codeModal = document.getElementById('code-modal');
const loading = document.getElementById('loading');
const closeButtons = document.querySelectorAll('.close');
const paymentButtons = document.querySelectorAll('.payment-button');
const copyCodeButton = document.getElementById('copy-code');
const contactForm = document.getElementById('contact-form');
const requestFreeCodeButton = document.getElementById('request-free-code');

// Current product being purchased
let currentProduct = '';

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

// Buy button click handlers
buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        currentProduct = e.target.closest('.product-card').dataset.product;
        showPaymentModal();
    });
});

// Show payment modal
function showPaymentModal() {
    const productName = currentProduct === 'gg-mouse-pro' ? 'GG Mouse Pro' : 'GG Game Space';
    const price = '₹1000';
    
    document.getElementById('payment-details').innerHTML = `
        <p><strong>Product:</strong> ${productName} Lifetime Code</p>
        <p><strong>Price:</strong> ${price}</p>
    `;
    
    paymentModal.style.display = 'block';
}

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        codeModal.style.display = 'none';
    });
});

// Payment button handlers
paymentButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const method = e.target.dataset.method;
        processPayment(method);
    });
});

// Mock payment processing
function processPayment(method) {
    if (method === 'razorpay') {
        initiateRazorpayPayment();
    } else {
        // Fallback for other methods
        loading.style.display = 'flex';
        paymentModal.style.display = 'none';
        
        setTimeout(() => {
            loading.style.display = 'none';
            deliverCode();
        }, 2000);
    }
}

// Razorpay payment integration
function initiateRazorpayPayment() {
    // Redirect to Razorpay payment link
    window.location.href = 'https://rzp.io/rzp/ukb7Tal';
}

// Deliver code
function deliverCode() {
    let code = '';
    let productName = '';
    
    if (currentProduct === 'gg-mouse-pro') {
        if (ggMouseProCodes.length > 0) {
            code = ggMouseProCodes.pop();
            productName = 'GG Mouse Pro';
        } else {
            alert('Sorry, no codes available for GG Mouse Pro at the moment.');
            return;
        }
    } else if (currentProduct === 'gg-game-space') {
        if (ggGameSpaceCodes.length > 0) {
            code = ggGameSpaceCodes.pop();
            productName = 'GG Game Space';
        } else {
            alert('Sorry, no codes available for GG Game Space at the moment.');
            return;
        }
    }
    
    // Record sale
    const sale = {
        product: productName,
        code: code,
        date: new Date().toISOString(),
        price: 1000
    };
    sales.push(sale);
    localStorage.setItem('sales', JSON.stringify(sales));
    
    // Update localStorage for codes
    localStorage.setItem('ggMouseProCodes', JSON.stringify(ggMouseProCodes));
    localStorage.setItem('ggGameSpaceCodes', JSON.stringify(ggGameSpaceCodes));
    
    // Show code modal
    document.getElementById('premium-code').textContent = code;
    codeModal.style.display = 'block';
}

// Copy code functionality
copyCodeButton.addEventListener('click', () => {
    const code = document.getElementById('premium-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        copyCodeButton.textContent = 'Copied!';
        setTimeout(() => {
            copyCodeButton.textContent = 'Copy Code';
        }, 2000);
    });
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Request free temporary code
requestFreeCodeButton.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    alert('Please use the contact form to request your temporary free premium code.');
});

// Load codes from localStorage
function loadCodes() {
    const storedMouseCodes = JSON.parse(localStorage.getItem('ggMouseProCodes'));
    const storedGameCodes = JSON.parse(localStorage.getItem('ggGameSpaceCodes'));
    
    if (storedMouseCodes) ggMouseProCodes = storedMouseCodes;
    if (storedGameCodes) ggGameSpaceCodes = storedGameCodes;
}

// Initialize
loadCodes();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Loading animation on page load
window.addEventListener('load', () => {
    loading.style.display = 'none';
});

// Admin panel functionality (for demonstration)
function showAdminPanel() {
    // This would be a separate page in a real implementation
    const adminWindow = window.open('', '_blank', 'width=800,height=600');
    adminWindow.document.write(`
        <html>
        <head>
            <title>Admin Panel</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .section { margin-bottom: 30px; }
                input, button { margin: 5px; padding: 5px; }
                .code-list { max-height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px; }
            </style>
        </head>
        <body>
            <h1>Admin Panel</h1>
            
            <div class="section">
                <h2>Add Codes</h2>
                <select id="product-select">
                    <option value="mouse">GG Mouse Pro</option>
                    <option value="game">GG Game Space</option>
                </select>
                <input type="text" id="new-code" placeholder="Enter new code">
                <button onclick="addCode()">Add Code</button>
            </div>
            
            <div class="section">
                <h2>Available Codes</h2>
                <h3>GG Mouse Pro</h3>
                <div class="code-list" id="mouse-codes">${ggMouseProCodes.join('<br>')}</div>
                <h3>GG Game Space</h3>
                <div class="code-list" id="game-codes">${ggGameSpaceCodes.join('<br>')}</div>
            </div>
            
            <div class="section">
                <h2>Sales Report</h2>
                <p>Total Sales: ${sales.length}</p>
                <p>Total Revenue: ₹${sales.reduce((sum, sale) => sum + sale.price, 0).toFixed(2)}</p>
                <div class="code-list" id="sales-list">${sales.map(sale => `${sale.date}: ${sale.product} - ${sale.code}`).join('<br>')}</div>
            </div>
            
            <script>
                function addCode() {
                    const product = document.getElementById('product-select').value;
                    const code = document.getElementById('new-code').value.trim();
                    if (code) {
                        if (product === 'mouse') {
                            ggMouseProCodes.push(code);
                            localStorage.setItem('ggMouseProCodes', JSON.stringify(ggMouseProCodes));
                            document.getElementById('mouse-codes').innerHTML = ggMouseProCodes.join('<br>');
                        } else {
                            ggGameSpaceCodes.push(code);
                            localStorage.setItem('ggGameSpaceCodes', JSON.stringify(ggGameSpaceCodes));
                            document.getElementById('game-codes').innerHTML = ggGameSpaceCodes.join('<br>');
                        }
                        document.getElementById('new-code').value = '';
                    }
                }
            </script>
        </body>
        </html>
    `);
}

// Add admin link to nav (hidden, for demo purposes)
// Uncomment the line below to enable admin panel
// document.querySelector('.nav-links').innerHTML += '<a href="#" onclick="showAdminPanel()">Admin</a>';
