# ggmousepro.in - Premium Code Sales Website

A modern, responsive website for selling lifetime premium activation codes for GG Mouse Pro and GG Game Space.

## Features

- **Clean & Professional Design**: Modern UI with light/dark mode toggle
- **Mobile Responsive**: Optimized for all device sizes
- **Product Showcase**: Detailed product cards with features and pricing
- **Mock Payment System**: Simulated payment processing with Razorpay
- **Code Delivery**: Instant code delivery after payment with copy functionality
- **Admin Panel**: Manage codes, view sales, and track inventory
- **FAQ Section**: Common questions and answers
- **Free Codes Section**: Check for promotional free codes
- **Contact Form**: Customer support form
- **SEO Optimized**: Proper meta tags and semantic HTML

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Storage**: LocalStorage for data persistence (demo purposes)
- **Icons**: Unicode emojis and SVG placeholders

## Project Structure

```
/
├── index.html          # Main website
├── admin.html          # Admin panel
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── script.js       # Main website functionality
│   └── admin.js        # Admin panel functionality
└── images/
    ├── gg-mouse-pro.png    # Product image placeholder
    ├── gg-game-space.png   # Product image placeholder
    └── favicon.ico         # Website favicon
```

## Setup Instructions

1. **Clone or Download**: Place all files in your web server directory
2. **Open in Browser**: Open `index.html` in a modern web browser
3. **Admin Access**: Open `admin.html` for admin panel (or uncomment admin link in main site)

## Pricing

- **GG Mouse Pro Lifetime Code**: ₹819 + CGST (11.05%) + SGST (11.05%) = ₹1000
- **GG Game Space Lifetime Code**: ₹819 + CGST (11.05%) + SGST (11.05%) = ₹1000

## Features Included

### GG Mouse Pro
- Lifetime access to premium features
- Advanced mouse customization
- Enhanced gaming performance
- Priority support

### GG Game Space
- Lifetime access to premium features
- Expanded game library
- Cloud save functionality
- Exclusive game content

## Payment Integration

The website includes mock payment processing for:
- UPI
- Razorpay
- Paytm

In a production environment, integrate with actual payment gateways.

## Admin Panel Features

- **Dashboard**: Sales stats and inventory overview
- **Code Management**: Add/remove activation codes
- **Sales Tracking**: View all sales history
- **Inventory Control**: Monitor available codes

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Customization

### Adding Real Payment Integration

Replace the mock payment functions in `script.js` with actual payment gateway APIs:

```javascript
function processPayment(method) {
    // Integrate with real payment gateway
    // e.g., Razorpay, Stripe, PayPal
}
```

### Database Integration

For production, replace LocalStorage with a proper database:

```javascript
// Instead of localStorage
// Use Firebase, MongoDB, or your preferred database
const db = firebase.firestore();
```

### Code Generation

Implement dynamic code generation:

```javascript
function generateCode(product) {
    const prefix = product === 'gg-mouse-pro' ? 'GMP' : 'GGS';
    const code = prefix + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    return code;
}
```

## Security Considerations

- Implement proper authentication for admin panel
- Use HTTPS in production
- Validate all user inputs
- Secure payment processing
- Encrypt sensitive data

## Performance Optimizations

- Minify CSS and JavaScript
- Optimize images
- Use CDN for assets
- Implement caching strategies
- Lazy load non-critical resources

## License

This project is for educational and demonstration purposes. Modify and use as needed for your own projects.

## Contact

For questions or support, please use the contact form on the website or reach out to support@ggmousepro.com.