# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- Responsive design
- Dark/light theme toggle
- Smooth navigation
- Contact form with EmailJS integration
- Portfolio showcase
- Skills and timeline sections

## Contact Form Setup (EmailJS)

The contact form uses EmailJS to send emails. Here's how to set it up:

### 1. Create EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account (200 emails/month)

### 2. Get Your IDs
After signing up, you'll need three IDs:
- **User ID**: Found in Account > API Keys
- **Service ID**: Create an email service (Gmail, Outlook, etc.)
- **Template ID**: Create an email template

### 3. Update the Code
Replace these placeholders in `app.js`:
```javascript
emailjs.init("YOUR_USER_ID"); // Your EmailJS User ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### 4. Email Template Variables
The form sends these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message
- `{{to_name}}` - Your name (Leonardo Durante)
- `{{to_email}}` - Your email (leofdurante@gmail.com)

**Important**: When you set up your EmailJS template, make sure to use `{{to_email}}` in the "To" field so that all contact form submissions are sent directly to your email address.

## Usage

1. Open `index.html` in a web browser
2. Navigate through sections using the control panel
3. Fill out the contact form to send messages
4. Toggle between dark/light themes

## Technologies Used

- HTML5
- CSS3 (SCSS)
- JavaScript (ES6+)
- EmailJS for contact form
- Font Awesome icons
- Google Fonts (Poppins)